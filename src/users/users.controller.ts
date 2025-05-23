import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userservices: UsersService) { }



    @Post('signup')
    createUser(@Body() body: CreateUserDto) {
        return this.userservices.create(body.email, body.password)
    }
}
