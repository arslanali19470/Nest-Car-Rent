// main db.config.js or ormconfig.js
const dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations'
    }
}

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['dist/**/*.entity.js'], // correct for compiled JS
            migrations: true,
        })
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
            migrations: true,
        })
        break;
    case 'production':
        Object.assign(dbConfig, {
            type: 'postgress',
            url: process.env.DATABASE_URL,
            entities: ['**/*.entity.js'],
            migrations: true,
            ssl: {
                rejectUnauthorized: false,
            }
        })
    default:
        throw new Error('Unknown Environment')
}

module.exports = dbConfig;
