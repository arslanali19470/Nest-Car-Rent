import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { approvedReportDto } from './dto/approvedReport.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dto/GetEstimate.dto';

@Controller('reports')
@Serialize(ReportDto)
@ApiTags('Reports')
export class ReportsController {
    constructor(private reportServices: ReportsService) { }

    @Post()
    @UseGuards(AuthGuard)
    @ApiBody({ type: CreateReportDto })
    @ApiResponse({ status: 201, description: 'Report created' })
    @ApiResponse({ status: 401, description: 'Unauthorized - Cookie missing' })
    CreateReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        this.reportServices.create(body, user)
        return "Report Created Successfully"

    }

    @Get()
    @UseGuards(AuthGuard)
    @ApiResponse({ status: 200, description: 'List of all reports', type: ReportDto, isArray: true })
    @ApiResponse({ status: 401, description: 'Unauthorized - Login required' })
    ShowAllReports() {
        return this.reportServices.findAll();
    }

    @Get('estimate')
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportServices.createEstimateResult(query)
    }

    @Post('/:id')
    @UseGuards(AdminGuard)
    approvedReport(@Param('id') id: string, @Body() body: approvedReportDto) {
        return this.reportServices.changeApproval(id, body.approved)
    }

}
