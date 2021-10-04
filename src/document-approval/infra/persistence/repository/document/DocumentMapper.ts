import { Injectable, Inject } from "@nestjs/common";

import { DocumentEntity } from "src/document-approval/infra/persistence/entity/document/DocumentEntity";

import { DocumentFactory } from "src/document-approval/domain/document/factory/DocumentFactory";
import { Document } from "src/document-approval/domain/document/model/Document";

@Injectable()
export class DocumentMapper {
    constructor(@Inject(DocumentFactory) private readonly documentFactory: DocumentFactory) { }

    public toEntity(domain: Document): DocumentEntity {
        const entity = new DocumentEntity();
        entity.id = domain.getId();
        entity.title = domain.getTitle();
        entity.category = domain.getCategory();
        entity.content = domain.getContent();
        entity.status = domain.getStatus();
        entity.currentApprovalOrder = domain.getCurrentApprovalOrder();
        entity.createdAt = domain.getCreatedAt();
        entity.updatedAt = domain.getUpdatedAt();
        entity.version = domain.getVersion();
        return entity
    }

    public entityToModel(entity: DocumentEntity): Document {
        const {
            id,
            title,
            category,
            content,
            status,
            currentApprovalOrder,
            createdAt,
            updatedAt,
            version
        } = entity;
        const domain = this.documentFactory.reconstitute(id,
            title,
            category,
            content,
            status,
            currentApprovalOrder,
            createdAt,
            updatedAt
        );
        domain.setVersion(version);

        return domain;
    }
}
