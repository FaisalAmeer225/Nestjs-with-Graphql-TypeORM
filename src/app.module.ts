import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: 'localhost',
      port: 5432,
      username: 'comberry',
      password: 'comberry',
      database: 'postgres',

      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      // entities: ['dist/**/*.entity.js'],

      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      synchronize: false,
    }),

    GraphQLModule.forRoot({
      playground: true,
      introspection: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    StudentModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
