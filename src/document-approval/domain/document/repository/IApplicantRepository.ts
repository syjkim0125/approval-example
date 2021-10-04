import { Applicant } from 'src/document-approval/domain/document/model/Applicant';

export interface IApplicantRepository {
  nextId: () => string;
  save: (applicant: Applicant | Applicant[]) => Promise<void>;
}
