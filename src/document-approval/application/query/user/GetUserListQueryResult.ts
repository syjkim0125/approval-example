import { IQueryResult } from "@nestjs/cqrs";

interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export class GetUserListQueryResult implements IQueryResult {
    count: number;
    users: User[];
}
