import { AggregateRoot } from "@nestjs/cqrs";

export class Approver extends AggregateRoot {
    private readonly id: string;

    private readonly userId: string;

    private readonly documentId: string;

    private readonly approvalOrder: number;

    private readonly createdAt: Date;

    private updatedAt: Date;

    private version: number;

    constructor(
        id: string,
        userId: string,
        documentId: string,
        approvalOrder: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        super();
        this.id = id;
        this.userId = userId;
        this.documentId = documentId;
        this.approvalOrder = approvalOrder;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public getApprovalOrder(): number {
        return this.approvalOrder;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public getVersion(): number {
        return this.version ? this.version : 0;
    }

    public setVersion(version): number {
        return this.version = version;
    }
}
