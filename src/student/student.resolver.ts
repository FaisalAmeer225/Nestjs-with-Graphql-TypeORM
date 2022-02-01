import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { StudentInput } from '../graphql';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { TeacherService } from '../teacher/teacher.service';
import { RedisService } from 'src/RedisModule/Redis/redis.service';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject } from '@nestjs/common';

enum SUBSCRIPTION_EVENTS {
  newStudent = 'newStudent',
}

@Resolver('Student')
export class StudentResolver {
  allSubscribers: Student[] = [];

  constructor(
    private readonly StudentService: StudentService,
    private readonly teacherService: TeacherService,
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
  ) {}

  @Query()
  async students(@Args('rollNumber') rollNumber: string) {
    const existingStudent = await this.StudentService.getStudentById(
      rollNumber,
    );
    if (!existingStudent) {
      throw new Error('Please provide the correct rollNumber');
    } else {
      return existingStudent;
    }
  }

  @Query()
  studentsByTeacherId(@Args('id') id: string) {
    return this.StudentService.getStudentById(id);
  }

  @Mutation()
  async createStudent(@Args('input') input: StudentInput) {
    const students = new Student();
    students.teachers = await Promise.all(
      input.teachers.map((teacherInput) => {
        const { id } = teacherInput;
        return this.teacherService.getTeacherById(id);
      }),
    );
    this.allSubscribers.push(students);
    this.pubSub.publish(SUBSCRIPTION_EVENTS.newStudent, {
      newStudent: students,
    });
    students.email = input.email;
    students.firstName = input.firstName;
    students.lastName = input.lastName;

    students.education = input.education[0];
    // console.debug(students.education);
    students.section = input.section;
    students.deleted = false;

    const newStudent = !!(await this.StudentService.existingStudent(
      students.email.toLowerCase(),
    ));
    if (newStudent) {
      throw new Error('Student already registered');
    } else {
      const student = this.StudentService.saveStudent(students);
      return student;
    }
  }
  @Subscription()
  newStudent() {
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newStudent);
  }
  @Mutation()
  updateStudentClass(@Args('input') input) {
    return this.StudentService.saveStudent(input);
  }

  @Mutation()
  deleteStudent(@Args('id') id: string) {
    return this.StudentService.deleteStudent(id);
  }
  @ResolveField()
  public async teachers(@Parent() parent: Student) {
    return this.teacherService.getTeacherByStudentId(parent.rollNumber);
  }
}
