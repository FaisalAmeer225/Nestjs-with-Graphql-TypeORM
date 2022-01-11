import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '../student/student.module';
import { Teacher } from './teacher.entity';
import { TeacherResolver } from './teacher.resolver';
import { TeacherService } from './teacher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    forwardRef(() => StudentModule),
  ],
  providers: [TeacherResolver, TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
