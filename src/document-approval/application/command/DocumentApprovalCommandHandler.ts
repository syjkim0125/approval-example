import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DocumentApprovalCommand } from 'src/document-approval/application/command/DocumentApprovalCommand';

import { DocumentDomainService } from 'src/document-approval/domain/document/service/DocumentDomainService';

@CommandHandler(DocumentApprovalCommand)
export class DocumentApprovalCommandHandler implements ICommandHandler<DocumentApprovalCommand, void> {
    constructor(@Inject(DocumentDomainService) private readonly documentDomainService: DocumentDomainService) { }

    public async execute(command: DocumentApprovalCommand): Promise<void> {
        const { documentId, approverId, status, comment } = command;

        await this.documentDomainService.documentApproval(documentId, approverId, status, comment);
    }
}
