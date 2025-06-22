import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: "test5@gmail.com" })
    @IsEmail()
    email: string;


    @ApiProperty({ example: "test123" })
    @IsString()
    password: string
}