import { IsString, IsEnum, IsOptional } from 'class-validator';

import { DocumentStatus } from 'src/constant';

export class DocumentApprovalBodyDto {
    @IsEnum(DocumentStatus)
    public readonly status: DocumentStatus;

    @IsOptional()
    @IsString()
    public readonly comment: string | null = null;
}
