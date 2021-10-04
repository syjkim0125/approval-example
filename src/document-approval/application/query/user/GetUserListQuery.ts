import { IQuery } from '@nestjs/cqrs';

export class GetUserListQuery implements IQuery {
    constructor(
        public readonly offset: number,
        public readonly limit: number,
    ) { }
}
