import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dto/GetEstimate.dto';

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


    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: parseInt(id, 10) } });

        if (!report) {
            throw new NotFoundException("Report Not Found")
        }
        report.approved = approved;
        return this.repo.save(report)
    }

    createEstimateResult(estimateDto: GetEstimateDto) {
        return this.repo.createQueryBuilder()
            // .select('*')
            .select('AVG(price)', 'price')
            .where('make=:make', { make: estimateDto.make })
            // If use and other where so it overwrite on first 
            .andWhere('model=:model', { model: estimateDto.model })
            .andWhere('lng -:lng BETWEEN -5 AND 5', { lan: estimateDto.lng })
            .andWhere('lat -:lng BETWEEN -5 AND 5', { lat: estimateDto.lat })
            .andWhere('year -:year BETWEEN -3 AND 3', { year: estimateDto.year })
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage -:mileage)', 'DESC')
            .setParameters({ mileage: estimateDto.mileage })
            .limit(3)
            // .getRawMany()
            .getRawOne()
    }



}
