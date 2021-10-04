import { Transform } from 'class-transformer';
import { IsEnum, Min, Max, IsInt } from 'class-validator';

import { DocumentStatusDto } from 'src/constant';

export class GetDocumentListDto {
    @Transform(value => {
        return value ? parseInt(value, 10) : 0;
    })
    @IsInt()
    @Min(0)
    public readonly offset: number;

    @Transform(value => {
        return value ? parseInt(value, 10) : 0;
    })
    @Max(100)
    @Min(0)
    public readonly limit: number;

    @IsEnum(DocumentStatusDto)
    public readonly status: DocumentStatusDto;
}
