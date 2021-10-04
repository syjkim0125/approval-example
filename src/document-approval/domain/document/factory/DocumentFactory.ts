import { Injectable, Inject } from "@nestjs/common";
import { EventPublisher } from '@nestjs/cqrs';

import { DocumentStatus } from "src/constant";

import { Document } from "src/document-approval/domain/document/model/Document";

@Injectable()
export class DocumentFactory {
    constructor(
        @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
    ) { }

    public create(
        id: string,
        title: string,
        category: string,
        content: string,
    ): Document {
        const status = DocumentStatus.ONGOING;
        const currentApprovalOrder = 1;
        const createdAt = new Date();
        const updatedAt = createdAt;

        return this.eventPublisher.mergeObjectContext(
            new Document(id, title, category, content, status, currentApprovalOrder, createdAt, updatedAt),
        );
    }

    public reconstitute(
        id: string,
        title: string,
        category: string,
        content: string,
        status: DocumentStatus,
        currentApprovalOrder: number,
        createdAt: Date,
        updatedAt: Date,
    ): Document {
        return new Document(id, title, category, content, status, currentApprovalOrder, createdAt, updatedAt);
    }
}
