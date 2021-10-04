import { Document } from 'src/document-approval/domain/document/model/Document';

export interface IDocumentRepository {
  nextId: () => string;
  save: (document: Document | Document[]) => Promise<void>;
  findById: (id: string) => Promise<Document | null>;
}
