import { IQueryResult } from "@nestjs/cqrs";

import { DocumentStatus } from "src/constant";

interface Comment {
    id: string;
    approverId: string;
    documentId: string;
    content: string;
    createdAt: Date;
}

interface Approver {
    id: string;
    userId: string;
    documentId: string;
    approvalOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

export class GetDocumentQueryResult implements IQueryResult {
    id: string;
    title: string;
    category: string;
    content: string;
    status: DocumentStatus;
    currentApprovalOrder: number;
    comments: Comment[];
    approvers: Approver[];
    createdAt: Date;
    updatedAt: Date;
}
