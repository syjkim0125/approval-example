interface Comment {
    id: string;
    approverId: string;
    documentId: string;
    content: string;
    createdAt: Date;
}

export class GetDocumentResponseDto {
    id: string;
    title: string;
    category: string;
    content: string;
    status: string;
    currentApprovalOrder: number;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
