class Document {
    id: string;
    title: string;
    category: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export class GetDocumentListResponseDto {
    count: number;
    documents: Document[];
  }
  