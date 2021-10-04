import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IDocumentQuery } from 'src/document-approval/application/query/document/IDocumentQuery';
import { GetDocumentListQuery } from 'src/document-approval/application/query/document/GetDocumentListQuery';
import { GetDocumentListQueryResult } from 'src/document-approval/application/query/document/GetDocumentListQueryResult';

@QueryHandler(GetDocumentListQuery)
export class GetDocumentListQueryHandler implements IQueryHandler<GetDocumentListQuery, GetDocumentListQueryResult> {
    constructor(@Inject('DocumentQuery') private readonly documentQuery: IDocumentQuery) { }

    public async execute(query: GetDocumentListQuery): Promise<GetDocumentListQueryResult> {
        const { userId, offset, limit, status} = query;

        const queryResult = await this.documentQuery.findAll(userId, offset, limit, status);

        return queryResult;
    }
}
