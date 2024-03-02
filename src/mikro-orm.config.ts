import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  host: 'lama2dingin.id',
  port: 5432,
  user: 'ykbutdb',
  password: 'admin',
  dbName: 'ykbutdb',
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
