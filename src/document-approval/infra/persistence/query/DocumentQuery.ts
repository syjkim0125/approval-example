import { getManager, getRepository, SelectQueryBuilder, Brackets } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { DocumentStatusDto, DocumentStatus } from 'src/constant';

import { DocumentEntity } from 'src/document-approval/infra/persistence/entity/document/DocumentEntity';
import { CommentEntity } from 'src/document-approval/infra/persistence/entity/document/CommentEntity';
import { ApplicantEntity } from 'src/document-approval/infra/persistence/entity/document/ApplicantEntity';
import { ApproverEntity } from 'src/document-approval/infra/persistence/entity/document/ApproverEntity';

import { IDocumentQuery, DocumentListView, DocumentView } from 'src/document-approval/application/query/document/IDocumentQuery';

@Injectable()
export class DocumentQuery implements IDocumentQuery {
    public async findById(id: string): Promise<DocumentView | null> {
        const document = await getRepository(DocumentEntity).findOne({ where: { id } });
        if (!document) return null;

        const [comments, approvers] = await Promise.all([
            getRepository(CommentEntity).find({ where: { documentId: id } }),
            getRepository(ApproverEntity).find({
                where: { documentId: id },
                order: { approvalOrder: 'ASC' },
            })
        ]);

        return {
            id: document.id,
            title: document.title,
            category: document.category,
            content: document.content,
            status: document.status,
            currentApprovalOrder: document.currentApprovalOrder,
            comments,
            approvers,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt
        }
    }

    public async findAll(userId: string, offset: number, limit: number, status: DocumentStatusDto): Promise<DocumentListView> {
        const queryBuilder: SelectQueryBuilder<DocumentEntity> = getManager()
            .getRepository(DocumentEntity)
            .createQueryBuilder('document');

        if (status === DocumentStatusDto.OUTBOX) {
            const documentStatus = DocumentStatus.ONGOING;
            queryBuilder
                .leftJoinAndMapOne('document.applicant', ApplicantEntity, 'applicant', 'document.id = applicant.documentId')
                .where('applicant.userId = :userId', { userId })
                .andWhere('document.status = :status', { status: documentStatus });
        }

        if (status === DocumentStatusDto.INBOX) {
            const documentStatus = DocumentStatus.ONGOING;
            queryBuilder
                .leftJoinAndMapOne('document.approver', ApproverEntity, 'approver', 'document.id = approver.documentId')
                .where('approver.userId = :userId', { userId })
                .andWhere('document.status = :status', { status: documentStatus });
        }

        if (status === DocumentStatusDto.ARCHIVE) {
            const documentStatus = [DocumentStatus.APPROVE, DocumentStatus.REJECT];
            queryBuilder
                .leftJoinAndMapOne('document.applicant', ApplicantEntity, 'applicant', 'document.id = applicant.documentId')
                .leftJoinAndMapOne('document.approver', ApproverEntity, 'approver', 'document.id = approver.documentId')
                .where('document.status IN (:...status)', { status: documentStatus })
                .andWhere(new Brackets(qb => {
                    qb.where('applicant.userId = :userId', { userId })
                        .orWhere('approver.userId = :userId', { userId });
                }));
        }

        queryBuilder.skip(offset).take(limit);

        const [entities, count]: [DocumentEntity[], number] = await queryBuilder.getManyAndCount() as any;

        return {
            count,
            documents: entities.map(entity => {
                return {
                    id: entity.id,
                    title: entity.title,
                    category: entity.category,
                    status: entity.status,
                    createdAt: entity.createdAt,
                    updatedAt: entity.updatedAt
                }
            })
        }
    }
}
