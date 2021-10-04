import uuid = require('uuid');
import { Injectable, Inject } from "@nestjs/common";
import { getRepository } from 'typeorm';

import { CommentMapper } from 'src/document-approval/infra/persistence/repository/document/CommentMapper';
import { CommentEntity } from 'src/document-approval/infra/persistence/entity/document/CommentEntity';

import { Comment } from 'src/document-approval/domain/document/model/Comment';

@Injectable()
export class CommentRepository {
    constructor(@Inject(CommentMapper) private readonly commentMapper: CommentMapper) { }

    public nextId(): string {
        return uuid.v1();
    }

    public async save(data: Comment | Comment[]): Promise<void> {
        const models = Array.isArray(data) ? data : [data];
        const entities = models.map((model) => {
            const version = model.getVersion();
            model.setVersion(version + 1);
            return this.commentMapper.toEntity(model)
        });
        await getRepository(CommentEntity).save(entities);
    }
}
