import { Expose, Type } from 'class-transformer';
import { userDto } from 'src/users/dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 2500000 })
    @Expose()
    price: number;

    @ApiProperty({ example: 'Toyota' })
    @Expose()
    make: string;

    @ApiProperty({ example: 'Corolla' })
    @Expose()
    model: string;

    @ApiProperty({ example: 2023 })
    @Expose()
    year: number;

    @ApiProperty({ example: 73.0479 })
    @Expose()
    lng: number;

    @ApiProperty({ example: 33.6844 })
    @Expose()
    lat: number;

    @ApiProperty({ example: 50000 })
    @Expose()
    mileage: number;

    @ApiProperty({ type: userDto }) // reference to nested dto
    @Expose()
    @Type(() => userDto)
    user: userDto;
}
