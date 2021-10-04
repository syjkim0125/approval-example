import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ApprovalRequestCommand } from 'src/document-approval/application/command/ApprovalRequestCommand';

import { DocumentDomainService } from 'src/document-approval/domain/document/service/DocumentDomainService';

@CommandHandler(ApprovalRequestCommand)
export class ApprovalRequestCommandHandler implements ICommandHandler<ApprovalRequestCommand, void> {
    constructor(@Inject(DocumentDomainService) private readonly documentDomainService: DocumentDomainService) { }

    public async execute(command: ApprovalRequestCommand): Promise<void> {
        const { userId, title, category, content, approvers } = command;

        await this.documentDomainService.approvalRequest(userId, title, category, content, approvers);
    }
}
