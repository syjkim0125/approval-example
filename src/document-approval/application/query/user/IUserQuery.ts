interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserListView {
    count: number;
    users: User[];
}

export interface IUserQuery {
    findAll: (offset: number, limit: number) => Promise<UserListView>;
}
