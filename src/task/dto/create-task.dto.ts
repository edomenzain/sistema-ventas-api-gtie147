import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTask {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(500)
    description: string;
    
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}
// npx prisma init --datasource-provider mysql