import { Injectable, Inject, UnprocessableEntityException, NotFoundException } from "@nestjs/common";

import { ExceptionMessage } from "src/constant/exception";
import { DocumentStatus } from "src/constant";

import { IDocumentRepository } from "src/document-approval/domain/document/repository/IDocumentRepository";
import { IApplicantRepository } from "src/document-approval/domain/document/repository/IApplicantRepository";
import { IApproverRepository } from "src/document-approval/domain/document/repository/IApproverRepository";
import { IUserRepository } from "src/document-approval/domain/user/repository/IUserRepository";
import { ICommentRepository } from "src/document-approval/domain/document/repository/ICommentRepository";
import { DocumentFactory } from "src/document-approval/domain/document/factory/DocumentFactory";
import { ApplicantFactory } from "src/document-approval/domain/document/factory/ApplicantFactory";
import { ApproverFactory } from "src/document-approval/domain/document/factory/ApproverFactory";
import { CommentFactory } from "src/document-approval/domain/document/factory/CommentFactory";

interface Approver {
    userId: string;
    approvalOrder: number;
}

@Injectable()
export class DocumentDomainService {
    constructor(
        @Inject('DocumentRepository') private readonly documentRepository: IDocumentRepository,
        @Inject('ApplicantRepository') private readonly applicantRepository: IApplicantRepository,
        @Inject('ApproverRepository') private readonly approverRepository: IApproverRepository,
        @Inject('UserRepository') private readonly userRepository: IUserRepository,
        @Inject('CommentRepository') private readonly commentRepository: ICommentRepository,
        @Inject(DocumentFactory) private readonly documentFactory: DocumentFactory,
        @Inject(ApplicantFactory) private readonly applicantFactory: ApplicantFactory,
        @Inject(ApproverFactory) private readonly approverFactory: ApproverFactory,
        @Inject(CommentFactory) private readonly commentFactory: CommentFactory,
    ) { }

    public async approvalRequest(userId: string, title: string, category: string, content: string, approvers: Approver[]): Promise<void> {
        const documentId = this.documentRepository.nextId();
        const document = this.documentFactory.create(documentId, title, category, content);

        const applicantId = this.applicantRepository.nextId();
        await this.checkUser(userId);
        const applicant = this.applicantFactory.create(applicantId, userId, documentId);

        const approverList = await Promise.all(approvers.map(async approver => {
            await this.checkUser(approver.userId);
            const approverId = this.approverRepository.nextId();
            return this.approverFactory.create(approverId, approver.userId, documentId, approver.approvalOrder);
        }));

        await Promise.all([
            this.documentRepository.save(document),
            this.applicantRepository.save(applicant),
            this.approverRepository.save(approverList)
        ]);
    }

    public async documentApproval(documentId: string, approverId: string, status: DocumentStatus, commentContent: string | null): Promise<void> {
        const document = await this.documentRepository.findById(documentId);
        if (!document) throw new NotFoundException(ExceptionMessage.DOCUMENT_NOT_FOUND);

        const approver = await this.approverRepository.findById(approverId);
        if (!approver) throw new NotFoundException(ExceptionMessage.APPROVER_NOT_FOUND);

        this.checkApprovalOrder(document.getCurrentApprovalOrder(), approver.getApprovalOrder());
        if (status === DocumentStatus.REJECT) document.approval(status);

        const lastApprover = await this.checkLastApprover(documentId, approver.getApprovalOrder());
        if (lastApprover && status === DocumentStatus.APPROVE) document.approval(status);

        if (!lastApprover && status !== DocumentStatus.REJECT) document.updateCurrentApprovalOrder();

        if (commentContent) {
            const commentId = this.commentRepository.nextId();
            const comment = this.commentFactory.create(commentId, approverId, documentId, commentContent);
            await this.commentRepository.save(comment);
        }

        await this.documentRepository.save(document);
    }

    private async checkUser(userId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new UnprocessableEntityException(ExceptionMessage.INVALID_USER);
    }

    private checkApprovalOrder(currentApprovalOrder: number, approversOrder: number): void {
        if (currentApprovalOrder !== approversOrder) throw new UnprocessableEntityException(ExceptionMessage.APPROVER_IS_NOT_CURRENT_APPROVAL_ORDER);
    }

    private async checkLastApprover(documentId: string, approversOrder: number): Promise<boolean> {
        const approvers = await this.approverRepository.findAllByDocumentId(documentId);
        if (approvers.length === approversOrder) return true;
        return false;
    }
}