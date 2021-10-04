import { ICommand } from '@nestjs/cqrs';

interface Approver {
    userId: string;
    approvalOrder: number;
}
export class ApprovalRequestCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly title: string,
        public readonly category: string,
        public readonly content: string,
        public readonly approvers: Approver[]
    ) { }
}
