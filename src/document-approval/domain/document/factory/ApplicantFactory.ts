import { Injectable, Inject } from "@nestjs/common";
import { EventPublisher } from '@nestjs/cqrs';

import { Applicant } from "src/document-approval/domain/document/model/Applicant";

@Injectable()
export class ApplicantFactory {
    constructor(
        @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
    ) { }

    public create(
        id: string,
        userId: string,
        documentId: string
    ): Applicant {
        const createdAt = new Date();

        return this.eventPublisher.mergeObjectContext(
            new Applicant(id, userId, documentId, createdAt)
        );
    }

    public reconstitute(
        id: string,
        userId: string,
        documentId: string,
        createdAt: Date
    ): Applicant {
        return new Applicant(id, userId, documentId, createdAt);
    }
}
