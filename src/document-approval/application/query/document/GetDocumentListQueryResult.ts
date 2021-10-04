import { IQueryResult } from "@nestjs/cqrs";

import { DocumentStatus } from "src/constant";

interface Document {
    id: string;
    title: string;
    category: string;
    status: DocumentStatus;
    createdAt: Date;
    updatedAt: Date;
}

export class GetDocumentListQueryResult implements IQueryResult {
    count: number;
    documents: Document[];
}
