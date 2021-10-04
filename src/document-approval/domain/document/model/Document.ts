import { AggregateRoot } from '@nestjs/cqrs';
import { UnprocessableEntityException } from '@nestjs/common';

import { DocumentStatus } from 'src/constant';
import { ExceptionMessage } from 'src/constant/exception';

export class Document extends AggregateRoot {
    private readonly id: string;

    private title: string;

    private category: string;

    private content: string;

    private status: DocumentStatus;

    private currentApprovalOrder: number;

    private readonly createdAt: Date;

    private updatedAt: Date;

    private version: number;

    constructor(
        id: string,
        title: string,
        category: string,
        content: string,
        status: DocumentStatus,
        currentApprovalOrder: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        super();
        this.id = id;
        this.title = title;
        this.category = category;
        this.content = content;
        this.status = status;
        this.currentApprovalOrder = currentApprovalOrder;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getCategory(): string {
        return this.category;
    }

    public getContent(): string {
        return this.content;
    }

    public getStatus(): DocumentStatus {
        return this.status;
    }

    public getCurrentApprovalOrder(): number {
        return this.currentApprovalOrder;
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

    public setVersion(version: number): number {
        return this.version = version;
    }

    public approval(status: DocumentStatus): DocumentStatus {
        if(this.status !== DocumentStatus.ONGOING) throw new UnprocessableEntityException(ExceptionMessage.DOCUMENT_STATUS_IS_NOT_ON_GOING);
        if(status === DocumentStatus.ONGOING) throw new UnprocessableEntityException(ExceptionMessage.APPROVAL_STATUS_CANNOT_BE_ON_GOING);
        return this.status = status;
    }

    public updateCurrentApprovalOrder(): void {
        this.currentApprovalOrder += 1;
    }
}
