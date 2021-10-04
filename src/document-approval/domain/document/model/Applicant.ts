import { AggregateRoot } from "@nestjs/cqrs";

export class Applicant extends AggregateRoot {
    private readonly id: string;

    private readonly userId: string;

    private readonly documentId: string;

    private readonly createdAt: Date;

    private version: number;

    constructor(
        id: string,
        userId: string,
        documentId: string,
        createdAt: Date,
    ) {
        super();
        this.id = id;
        this.userId = userId;
        this.documentId = documentId;
        this.createdAt = createdAt;
    }

    public getId(): string {
        return this.id;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getDocumentId(): string {
        return this.documentId;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getVersion(): number {
        return this.version ? this.version : 0;
    }

    public setVersion(version): number {
        return this.version = version;
    }
}
