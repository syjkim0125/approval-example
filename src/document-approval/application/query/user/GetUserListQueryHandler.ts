import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IUserQuery } from 'src/document-approval/application/query/user/IUserQuery';
import { GetUserListQuery } from 'src/document-approval/application/query/user/GetUserListQuery';
import { GetUserListQueryResult } from 'src/document-approval/application/query/user/GetUserListQueryResult';

@QueryHandler(GetUserListQuery)
export class GetUserListQueryHandler implements IQueryHandler<GetUserListQuery, GetUserListQueryResult> {
    constructor(@Inject('UserQuery') private readonly userQuery: IUserQuery) { }

    public async execute(query: GetUserListQuery): Promise<GetUserListQueryResult> {
        const { offset, limit } = query;

        const queryResult = await this.userQuery.findAll(offset, limit);

        return queryResult;
    }
}
