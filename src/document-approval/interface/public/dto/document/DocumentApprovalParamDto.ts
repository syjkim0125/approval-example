import { IsUUID } from 'class-validator';

export class DocumentApprovalParamDto {
    @IsUUID()
    public readonly documentId: string;

    @IsUUID()
    public readonly approverId: string;
}
