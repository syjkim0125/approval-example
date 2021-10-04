import { Transform } from 'class-transformer';
import { Min, Max, IsInt } from 'class-validator';

export class GetUserListDto {
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
}
