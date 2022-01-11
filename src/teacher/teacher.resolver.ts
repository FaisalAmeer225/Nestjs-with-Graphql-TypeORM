import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Teachers } from '../graphql';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import { StudentService } from '../student/student.service';
import { forwardRef } from '@nestjs/common';
import { Student } from '../student/student.entity';

@Resolver('Teacher')
export class TeacherResolver {
  constructor(
    private readonly TeacherService: TeacherService,
    private readonly StudentService: StudentService,
  ) {}

  @Query()
  async allTeachers(@Args('deleted') deleted: boolean) {
    const teacher = !deleted
      ? await this.TeacherService.allTeachers()
      : await this.TeacherService.allTeachers();
    console.log(teacher);

    if (teacher[0].students) {
      const std = await this.StudentService.getStudentById(
        teacher[0].students[0].rollNumber,
      );
      console.log(std);
      return teacher;
    } else {
      return new Error('no students found');
    }

    // const teachers = !deleted
    //   ? await this.TeacherService.allTeachers()
    //   : await this.TeacherService.allTeachers();

    // await this.StudentService.getStudentById(teachers[0].studentRollNumber)

    // const {studentRollNumber} = teachers[0];
    // await this.StudentService.getStudentById(studentRollNumber);

    // console.log(studentRollNumber);

    // const student = await Promise.all(
    //   teachers
    //     .filter((teacher) => teacher.students)
    //     .map(async (teacher) => {
    //       if (!teacher) throw Error('Teacher does not exist');

    //       const { students } = teacher;

    //       teacher[0].studentRollNumber = (
    //         await Promise.all(
    //           students.map(async (student) => {
    //             const studentss = await this.StudentService.getStudentById(
    //               teacher.studentRollNumber,
    //             );
    //             console.log('studentss', studentss);
    //             if (studentss) return student;

    //             return null;
    //           }),
    //         )
    //       ).filter((student) => student && !student.deleted);
    //       console.log('teacher', teachers);
    //       return teachers;
    //     }),
    // );
    // console.log('student', student);
    // return student;
  }

  @Query()
  teachers(@Args('id') id: string) {
    return this.TeacherService.getTeacherById(id);
  }

  @Query()
  teacherByStudent(@Args('id') id: string) {
    return this.TeacherService.getTeacherByStudentId(id);
  }

  @Mutation()
  async createTeacher(@Args('input') input: any) {
    const existsTeacher = !!(await this.TeacherService.existingTeacher(
      input.email.toLowerCase(),
    ));
    if (existsTeacher) {
      throw new Error(
        `teacher already registered on this email ${input.email}`,
      );
    } else {
      const createTeacher = await this.TeacherService.saveTeacher(input);
      return createTeacher;
    }
  }

  @Mutation()
  deleteTeacher(@Args('id') id: string) {
    return this.TeacherService.deleteTeacher(id);
  }

  @Mutation()
  updateTeacherRole(@Args('id') id: string, teacher: Teacher) {
    return this.TeacherService.updateTeacherById(id, teacher);
  }

  @ResolveField('student', returns =>[Student])
  public async student(@Parent() parent: Teacher) {
    const {rollNumber} = parent[0]
    return this.StudentService.getStudentById(rollNumber);
  }
}
