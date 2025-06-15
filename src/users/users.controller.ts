import { UsersService } from './users.service';
import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { userDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('auth')
@Serialize(userDto) // here will apply on full controller 
// @UseInterceptors(CurrentUserInterceptor)  // it is for user cotroller only 
export class UsersController {
    constructor(
        private userServices: UsersService,
        private authService: AuthService,
    ) { }




    @Post('signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        // return this.userServices.create(body.email, body.password)
        // with authentication
        // return this.authService.signup(body.email, body.password)
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('signin')
    async LoginUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoami(@CurrentUser() user: User) {
        // if (!user) throw new UnauthorizedException();
        return user;
    }
    // @Get('/whoami')
    // async whoami(@Session() session: any) {
    //     if (!session.userId || isNaN(session.userId)) {
    //         throw new BadRequestException('User not signed in');
    //     }

    //     const user = await this.userServices.findOne(session.userId);
    //     if (!user) {
    //         throw new NotFoundException('User not found');
    //     }

    //     return user;
    // }

    @Post('/signout')
    signout(@Session() session: any) {
        session.userId = null
    }

    // hide password on reponse
    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(SerializeInterceptor)
    // @UseInterceptors(new SerializeInterceptor(userDto))
    @Serialize(userDto)   // here  will apply on one path 
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        // return this.userServices.findOne(parseInt(id))
        const user = await this.userServices.findOne(parseInt(id))
        if (!user) {
            throw new NotFoundException('user not found')
        }
        return user
    }

    @Get()
    findAlluser(@Query('email') email: string) {
        return this.userServices.find(email)
    }

    @Delete('/:id')
    RemoveUser(@Param('id') id: string) {
        return this.userServices.remove(parseInt(id))
    }

    @Patch('/:id')
    UpdateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userServices.update(parseInt(id), body)
    }




}
