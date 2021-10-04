import { Injectable, Inject } from "@nestjs/common";
import { EventPublisher } from '@nestjs/cqrs';

import { User } from "src/document-approval/domain/user/model/User";

@Injectable()
export class UserFactory {
    constructor(
        @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
    ) { }

    public create(
        id: string,
        name: string,
        email: string,
        password: string
    ): User {
        const createdAt = new Date();
        const updatedAt = createdAt;

        return this.eventPublisher.mergeObjectContext(
            new User(id, name, email, password, createdAt, updatedAt)
        );
    }

    public reconstitute(
        id: string,
        name: string,
        email: string,
        password: string,
        createdAt: Date,
        updatedAt: Date
    ): User {
        return new User(id, name, email, password, createdAt, updatedAt);
    }
}
