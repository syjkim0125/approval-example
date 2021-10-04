import { IQuery } from '@nestjs/cqrs';

import { DocumentStatusDto } from 'src/constant';

export class GetDocumentListQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly offset: number,
    public readonly limit: number,
    public readonly status: DocumentStatusDto,
  ) { }
}
