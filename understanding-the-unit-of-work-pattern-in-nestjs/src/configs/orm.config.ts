import { DataSourceOptions } from 'typeorm';

// Could have used PostgresConnectionOptions but used DataSourceOptions allows running app with preferred DB
const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'learning_book',
  entities: [__dirname + './**/*.entity.{ts,js}'],
  synchronize: true,
};

export default connectionOptions;
