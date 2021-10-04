import { IsString, IsArray, ValidateNested, IsInt, Min } from 'class-validator';

class Approver {
    @IsString()
    public readonly userId: string;

    @IsInt()
    @Min(1)
    public readonly approvalOrder: number;
}

export class ApprovalRequestDto {
    @IsString()
    public readonly title: string;

    @IsString()
    public readonly category: string;

    @IsString()
    public readonly content: string;

    @IsArray()
    @ValidateNested({ each: true })
    public readonly approvers: Approver[];
}
