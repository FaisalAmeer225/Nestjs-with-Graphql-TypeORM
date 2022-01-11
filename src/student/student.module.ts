import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), 
  
  forwardRef(()=>TeacherModule) ],
  providers: [StudentService, StudentResolver],
  exports:[StudentService],
})
export class StudentModule {}
