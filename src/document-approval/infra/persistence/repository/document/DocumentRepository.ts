import uuid = require('uuid');
import { Injectable, Inject } from "@nestjs/common";
import { getRepository } from 'typeorm';

import { DocumentMapper } from "src/document-approval/infra/persistence/repository/document/DocumentMapper";
import { DocumentEntity } from 'src/document-approval/infra/persistence/entity/document/DocumentEntity';

import { IDocumentRepository } from 'src/document-approval/domain/document/repository/IDocumentRepository';
import { Document } from 'src/document-approval/domain/document/model/Document';

@Injectable()
export class DocumentRepository implements IDocumentRepository {
    constructor(@Inject(DocumentMapper) private readonly documentMapper: DocumentMapper) { }

    public nextId(): string {
        return uuid.v1();
    }

    public async save(data: Document | Document[]): Promise<void> {
        const models = Array.isArray(data) ? data : [data];
        const entities = models.map((model) => {
            const version = model.getVersion();
            model.setVersion(version + 1);
            return this.documentMapper.toEntity(model)
        });
        await getRepository(DocumentEntity).save(entities);
    }

    public async findById(id: string): Promise<Document | null> {
        const entity = await getRepository(DocumentEntity).findOne({ id });
        return entity ? this.documentMapper.entityToModel(entity) : null;
    }
}
