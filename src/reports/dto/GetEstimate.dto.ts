import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetEstimateDto {
    @ApiProperty({ example: 'Toyota' })
    @IsString()
    make: string;

    @ApiProperty({ example: 'Corolla' })
    @IsString()
    model: string;

    @ApiProperty({ example: 2023, minimum: 1950, maximum: 2060 })
    @Type(() => Number)
    @IsNumber()
    @Min(1950)
    @Max(2060)
    year: number;

    @ApiProperty({ example: 50000, minimum: 0, maximum: 1000000 })
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @ApiProperty({ example: 73.0479 })
    @Type(() => Number)
    @IsLongitude()
    lng: number;

    @ApiProperty({ example: 33.6844 })
    @Type(() => Number)
    @IsLatitude()
    lat: number;
}
