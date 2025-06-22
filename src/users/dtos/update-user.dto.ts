import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: "test5@gmail.com" })
    @IsEmail()
    @IsOptional()
    email: string

    @ApiProperty({ example: 'user@example.com' })
    @IsString()
    @IsOptional()
    password: string

}