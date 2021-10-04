import { Injectable, Inject } from "@nestjs/common";

import { ApproverEntity } from "src/document-approval/infra/persistence/entity/document/ApproverEntity";

import { ApproverFactory } from "src/document-approval/domain/document/factory/ApproverFactory";
import { Approver } from "src/document-approval/domain/document/model/Approver";

@Injectable()
export class ApproverMapper {
    constructor(@Inject(ApproverFactory) private readonly approverFactory: ApproverFactory) { }

    public toEntity(domain: Approver): ApproverEntity {
        const entity = new ApproverEntity();
        entity.id = domain.getId();
        entity.userId = domain.getUserId();
        entity.documentId = domain.getDocumentId();
        entity.approvalOrder = domain.getApprovalOrder();
        entity.createdAt = domain.getCreatedAt();
        entity.updatedAt = domain.getUpdatedAt();
        entity.version = domain.getVersion();

        return entity
    }

    public entityToModel(entity: ApproverEntity): Approver {
        const {
            id,
            userId,
            documentId,
            approvalOrder,
            createdAt,
            updatedAt,
            version
        } = entity;
        const domain = this.approverFactory.reconstitute(
            id,
            userId,
            documentId,
            approvalOrder,
            createdAt,
            updatedAt
        );
        domain.setVersion(version);

        return domain;
    }
}
