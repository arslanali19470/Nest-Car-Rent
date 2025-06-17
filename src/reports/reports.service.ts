import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

    create(reportBody: CreateReportDto, user: User) {
        const report = this.repo.create(reportBody)
        report.user = user
        return this.repo.save(report)
    }

    findAll() {
        return this.repo.find({
            relations: ['user'],
        });
    }



}
