export const dataSourceConfig = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'citizix_user',
    password: 'S3cret',
    database: 'citizix_db',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: false,
}