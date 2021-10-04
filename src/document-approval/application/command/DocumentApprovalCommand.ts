import { ICommand } from '@nestjs/cqrs';

import { DocumentStatus } from 'src/constant';

export class DocumentApprovalCommand implements ICommand {
    constructor(
        public readonly documentId: string,
        public readonly approverId: string,
        public readonly status: DocumentStatus,
        public readonly comment: string | null,
    ) { }
}
