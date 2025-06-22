// data-source.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ['src/**/*.entity.ts'],
    migrations: ['migrations/*.ts'],
    synchronize: false,
});
