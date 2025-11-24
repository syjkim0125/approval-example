import { DocumentStatus, DocumentStatusDto } from "src/constant";

interface Document {
    id: string;
    title: string;
    category: string;
    status: DocumentStatus;
    createdAt: Date;
    updatedAt: Date;
}

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

export interface DocumentView {
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

export interface DocumentListView {
    count: number;
    documents: Document[];
}

export interface IDocumentQuery {
    findById: (id: string) => Promise<DocumentView | null>;
    findAll: (userId: string, offset: number, limit: number, status: DocumentStatusDto) => Promise<DocumentListView>;
}
