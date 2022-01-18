import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Teachers } from '../graphql';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private readonly repo: Repository<Teacher>,
  ) {}
  allTeachers() {
    return this.repo.find({
      where: {
        deleted: false,
      },
    });
  }
  saveTeacher(input: any) {
    return this.repo.save(input);
  }

  getTeacherByStudentId(StudentId: string) {
    return getConnection().query(
      `SELECT * FROM public.student_teachers_teacher st, public.teacher t WHERE st."teacherId" = t.id AND st."studentRollNumber" = '${StudentId}'`,
    );
  }

  getTeacherById(id: string) {
    return this.repo.findOne(id);
  }
  public async updateTeacherById(id: string, teacher: Teacher) {
    const { ...rest } = teacher;
    await this.repo.update(id, { ...rest });
    return await this.saveTeacher(id);
  }

  deleteTeacher(id: string) {
    return this.repo.delete(id);
  }

  public async existingTeacher(email: string): Promise<Teacher | undefined> {
    return this.repo.findOne({
      where: {
        email: `${email}`,
        deleted: false,
      },
    });
  }
}
