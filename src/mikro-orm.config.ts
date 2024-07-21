import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  // host: 'lama2dingin.id',
  host: '137.116.147.25',
  port: 5432,
  // user: 'ykbutdb',
  // password: 'admin',
  // dbName: 'ykbutdb',
  user: 'odoo',
  password: 'odoo',
  dbName: 'YKBUT_NEW_PROD_1',
  entities: ['./dist/**/*.entity.js', './dist/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts', './src/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    snapshot: false,
    path: 'dist/src/migrations',
    pathTs: 'src/migrations',
    disableForeignKeys: false,
  },
});
