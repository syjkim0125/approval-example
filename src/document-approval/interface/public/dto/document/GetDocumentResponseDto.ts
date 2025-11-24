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

export class GetDocumentResponseDto {
    id: string;
    title: string;
    category: string;
    content: string;
    status: string;
    currentApprovalOrder: number;
    comments: Comment[];
    approvers: Approver[];
    createdAt: Date;
    updatedAt: Date;
}
