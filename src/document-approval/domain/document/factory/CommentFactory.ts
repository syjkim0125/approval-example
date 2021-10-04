import { Injectable, Inject } from "@nestjs/common";
import { EventPublisher } from '@nestjs/cqrs';

import { Comment } from "src/document-approval/domain/document/model/Comment";

@Injectable()
export class CommentFactory {
    constructor(
        @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
    ) { }

    public create(
        id: string,
        approverId: string,
        documentId: string,
        content: string,
    ): Comment {
        const createdAt = new Date();

        return this.eventPublisher.mergeObjectContext(
            new Comment(id, approverId, documentId, content, createdAt)
        );
    }

    public reconstitute(
        id: string,
        approverId: string,
        documentId: string,
        content: string,
        createdAt: Date
    ): Comment {
        return new Comment(id, approverId, documentId, content, createdAt);
    }
}
