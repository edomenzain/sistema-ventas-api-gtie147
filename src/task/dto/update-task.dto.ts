import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTask {
    
    @MaxLength(500)
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsBoolean()
    @IsOptional()
    status?: boolean;
}