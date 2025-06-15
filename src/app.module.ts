import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/reports.entity';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Sqlite EXtension install
// shift + ctrl+p and enter sqlite than data dase 
// it will show the db in side 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "sqlite",
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true,
        }
      }
    }),
    UsersModule, ReportsModule

    // TypeOrmModule.forRoot({
    //   type: "sqlite",
    //   database: "db.sqlite",
    //   entities: [User, Report],
    //   synchronize: true,

    // }), UsersModule, ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
