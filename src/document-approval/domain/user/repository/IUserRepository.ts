import { User } from 'src/document-approval/domain/user/model/User';

export interface IUserRepository {
    nextId: () => string;
    save: (user: User | User[]) => Promise<void>;
    findById: (id: string) => Promise<User | null>;
    findByEmail: (email: string) => Promise<User | null>;
}
