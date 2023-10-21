import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  host: 'localhost',
  port: 5432,
  user: 'ybkut',
  password: 'admin',
  dbName: 'ybkut-db',
  entities: ['./dist/**/*.entity.js', './dist/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts', './src/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    snapshot: false,
    path: 'dist/src/migrations',
    pathTs: 'src/migrations',
    disableForeignKeys: false,
  },
};

export default config;
