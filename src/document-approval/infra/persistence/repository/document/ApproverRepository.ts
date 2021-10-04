import uuid = require('uuid');
import { Injectable, Inject } from "@nestjs/common";
import { getRepository } from 'typeorm';

import { ApproverMapper } from 'src/document-approval/infra/persistence/repository/document/ApproverMapper';
import { ApproverEntity } from 'src/document-approval/infra/persistence/entity/document/ApproverEntity';

import { IApproverRepository } from 'src/document-approval/domain/document/repository/IApproverRepository';
import { Approver } from 'src/document-approval/domain/document/model/Approver';

@Injectable()
export class ApproverRepository implements IApproverRepository {
    constructor(@Inject(ApproverMapper) private readonly approverMapper: ApproverMapper) { }

    public nextId(): string {
        return uuid.v1();
    }

    public async save(data: Approver | Approver[]): Promise<void> {
        const models = Array.isArray(data) ? data : [data];
        const entities = models.map((model) => {
            const version = model.getVersion();
            model.setVersion(version + 1);
            return this.approverMapper.toEntity(model)
        });
        await getRepository(ApproverEntity).save(entities);
    }

    public async findById(id: string): Promise<Approver | null> {
        const entity = await getRepository(ApproverEntity).findOne({ id });
        return entity ? this.approverMapper.entityToModel(entity) : null;
    }

    public async findAllByDocumentId(documentId: string): Promise<Approver[]> {
        const entities = await getRepository(ApproverEntity).find({ documentId });
        return entities.map(entity => this.approverMapper.entityToModel(entity));
    }
}
