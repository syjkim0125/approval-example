import { Approver } from 'src/document-approval/domain/document/model/Approver';

export interface IApproverRepository {
  nextId: () => string;
  save: (approver: Approver | Approver[]) => Promise<void>;
  findById: (id: string) => Promise<Approver | null>;
  findAllByDocumentId: (documentId: string) => Promise<Approver[]>;
}
