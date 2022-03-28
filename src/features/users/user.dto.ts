import { Transform } from "class-transformer";
import { IsOptional, Max, Min } from "class-validator";

export class GetUsersQueryDTO {

    @Transform(({value}) => Number(value))
    @Min(1, { message: "page cannot be lower than 1"})
    page: number;

    @IsOptional()
    @Transform(({value}) => Number(value))
    @Min(10, { message: "limit cannot be lower than 10"})
    @Max(20, { message: "limit cannot be higher than 20"})
    limit?: number;
}
