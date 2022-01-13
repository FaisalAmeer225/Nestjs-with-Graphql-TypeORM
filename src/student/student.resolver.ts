import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { StudentInput } from '../graphql';
import { Teacher } from '../teacher/teacher.entity';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { TeacherService } from '../teacher/teacher.service';

@Resolver('Student')
export class StudentResolver {
  constructor(
    private readonly StudentService: StudentService,
    private readonly teacherService: TeacherService,
  ) {}

  @Query()
  async students(@Args('rollNumber') rollNumber: string) {
    const existingStudent = await this.StudentService.getStudentById(
      rollNumber,
    );
    if (!rollNumber) {
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
    console.log(parent)
    return parent.teachers?.map(({ id }) =>
      this.teacherService.getTeacherById(id),
    );
  }
}
