import { Injectable, Inject } from "@nestjs/common";
import { EventPublisher } from '@nestjs/cqrs';

import { Approver } from "src/document-approval/domain/document/model/Approver";

@Injectable()
export class ApproverFactory {
    constructor(
        @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
    ) { }

    public create(
        id: string,
        userId: string,
        documentId: string,
        approvalOrder: number
    ): Approver {
        const createdAt = new Date();
        const updatedAt = createdAt;

        return this.eventPublisher.mergeObjectContext(
            new Approver(id, userId, documentId, approvalOrder, createdAt, updatedAt)
        );
    }

    public reconstitute(
        id: string,
        userId: string,
        documentId: string,
        approvalOrder: number,
        createdAt: Date,
        updatedAt: Date
    ): Approver {
        return new Approver(id, userId, documentId, approvalOrder, createdAt, updatedAt);
    }
}
