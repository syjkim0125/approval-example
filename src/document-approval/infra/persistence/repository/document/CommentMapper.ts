import { Injectable, Inject } from "@nestjs/common";

import { CommentEntity } from "src/document-approval/infra/persistence/entity/document/CommentEntity";

import { CommentFactory } from "src/document-approval/domain/document/factory/CommentFactory";
import { Comment } from "src/document-approval/domain/document/model/Comment";

@Injectable()
export class CommentMapper {
    constructor(@Inject(CommentFactory) private readonly commentFactory: CommentFactory) { }

    public toEntity(domain: Comment): CommentEntity {
        const entity = new CommentEntity();
        entity.id = domain.getId();
        entity.approverId = domain.getApproverId();
        entity.documentId = domain.getDocumentId();
        entity.content = domain.getContent();
        entity.createdAt = domain.getCreatedAt();
        entity.version = domain.getVersion();

        return entity
    }

    public entityToModel(entity: CommentEntity): Comment {
        const {
            id,
            approverId,
            documentId,
            content,
            createdAt,
            version
        } = entity;
        const domain = this.commentFactory.reconstitute(
            id,
            approverId,
            documentId,
            content,
            createdAt,
        );
        domain.setVersion(version);

        return domain;
    }
}