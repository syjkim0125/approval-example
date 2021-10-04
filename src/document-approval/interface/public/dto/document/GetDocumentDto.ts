import { IsUUID } from 'class-validator';

export class GetDocumentDto {
    @IsUUID()
    public readonly id: string;
}
