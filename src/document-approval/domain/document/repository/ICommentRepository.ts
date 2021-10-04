import { Comment } from 'src/document-approval/domain/document/model/Comment';

export interface ICommentRepository {
  nextId: () => string;
  save: (comment: Comment | Comment[]) => Promise<void>;
}
