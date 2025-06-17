import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class userDto {
    @ApiProperty({ example: 10 })
    @Expose()
    id: number;

    @ApiProperty({ example: 'user@example.com' })
    @Expose()
    email: string;
}
