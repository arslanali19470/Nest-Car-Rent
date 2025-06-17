import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
    @ApiProperty({ example: 'Toyota' })
    @IsString()
    make: string;

    @ApiProperty({ example: 'Corolla' })
    @IsString()
    model: string;

    @ApiProperty({ example: 2023, minimum: 1950, maximum: 2060 })
    @IsNumber()
    @Min(1950)
    @Max(2060)
    year: number;

    @ApiProperty({ example: 50000, minimum: 0, maximum: 1000000 })
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @ApiProperty({ example: 73.0479 })
    @IsLongitude()
    lng: number;

    @ApiProperty({ example: 33.6844 })
    @IsLatitude()
    lat: number;

    @ApiProperty({ example: 2500000, minimum: 0, maximum: 1000000 })
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;
}
