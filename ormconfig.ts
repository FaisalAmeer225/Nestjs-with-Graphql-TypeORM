module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'comberry',
  password: 'comberry',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  ssl: false,
  synchronize: false,
  migrations: ['src/migrations/*{.ts,.js}'],
};
