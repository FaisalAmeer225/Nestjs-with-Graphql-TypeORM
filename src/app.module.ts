import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { RedisMainModule } from './RedisModule/redisMain.module';
//import { PubsubModule } from './pubsub/pubsub.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2@allinall',
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
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // subscriptions: {
      //   'graphql-ws': true,
      // },
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },

      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    StudentModule,
    TeacherModule,
    RedisMainModule,
    //PubsubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

