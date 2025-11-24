import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    name: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(500)
    lastname: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    role: string;
}