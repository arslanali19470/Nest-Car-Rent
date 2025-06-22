import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/reports.entity';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cookieSession from 'cookie-session';
import dbConfig = require('../ormconfig');

// Sqlite EXtension install
// shift + ctrl+p and enter sqlite than data dase 
// it will show the db in side 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(dbConfig),

    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: "sqlite",
    //       database: config.get<string>('DB_NAME'),
    //       entities: [User, Report],
    //       // this property match the entity and Table of the Database
    //       // in Testing mode True in real Time always False
    //       synchronize: true,
    //     }
    //   }
    // }),
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
export class AppModule {
  constructor(private configureServer: ConfigService) { }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: [this.configureServer.get("COOKIE_KEY") as string]
    })).forRoutes('*')
  }
}
