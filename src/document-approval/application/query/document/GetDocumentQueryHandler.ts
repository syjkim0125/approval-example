import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ExceptionMessage } from 'src/constant/exception';

import { IDocumentQuery } from 'src/document-approval/application/query/document/IDocumentQuery';
import { GetDocumentQuery } from 'src/document-approval/application/query/document/GetDocumentQuery';
import { GetDocumentQueryResult } from 'src/document-approval/application/query/document/GetDocumentQueryResult';

@QueryHandler(GetDocumentQuery)
export class GetDocumentQueryHandler implements IQueryHandler<GetDocumentQuery, GetDocumentQueryResult> {
    constructor(@Inject('DocumentQuery') private readonly documentQuery: IDocumentQuery) { }

    public async execute(query: GetDocumentQuery): Promise<GetDocumentQueryResult> {
        const { id } = query;

        const queryResult = await this.documentQuery.findById(id);
        if (!queryResult) throw new NotFoundException(ExceptionMessage.DOCUMENT_NOT_FOUND);

        return queryResult;
    }
}
