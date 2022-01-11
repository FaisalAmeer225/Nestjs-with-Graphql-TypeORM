import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import{ Student } from './student.entity';
import { TeacherService } from '../teacher/teacher.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly repo: Repository<Student>,
    private readonly TeacherService: TeacherService
  ) {}

  saveStudent(input: any) {
    return this.repo.save(input);
  }

  getStudentById(rollNumber: string) {
    return this.repo.findOne(rollNumber);
  }

  createStudent() {
    return this.repo.create();
  }

  public async updateStudentClass(rollnumber: string, student: Student) {
    const { ...rest } = student;
    await this.repo.update(rollnumber, { ...rest });
    return await this.saveStudent(rollnumber);
  }

  deleteStudent(rollnumber: string){
      return this.repo.delete(rollnumber);
  }
  public async studentsByTeacherId(id : string){
    const Students = await this.TeacherService.getTeacherByStudentId(id)
   const {rollNumber} =  Students.students[0]
    return this.repo.findOne(rollNumber);
  }

  public async existingStudent (email: string): Promise <Student| undefined>{
    return this.repo.findOne({
      where:{
        email:`${email}`,
        deleted: false
      }
    })

  }
}
