import { IsString } from "class-validator";

export class approvedReportDto {
    @IsString()
    approved: boolean
}