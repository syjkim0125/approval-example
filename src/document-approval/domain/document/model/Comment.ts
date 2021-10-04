import { AggregateRoot } from "@nestjs/cqrs";

export class Comment extends AggregateRoot {
    private readonly id: string;

    private readonly approverId: string;

    private readonly documentId: string;

    private content: string;

    private readonly createdAt: Date;

    private version: number;

    constructor(
        id: string,
        approverId: string,
        documentId: string,
        content: string,
        createdAt: Date,
    ) {
        super();
        this.id = id;
        this.approverId = approverId;
        this.documentId = documentId;
        this.content = content;
        this.createdAt = createdAt;
    }

    public getId(): string {
        return this.id;
    }

    public getApproverId(): string {
        return this.approverId;
    }

    public getDocumentId(): string {
        return this.documentId;
    }

    public getContent(): string {
        return this.content;
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
