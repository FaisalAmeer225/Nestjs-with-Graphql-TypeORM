import { Student } from '../student/student.entity';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  Generated,
  OneToMany,
} from 'typeorm';

@Entity('teacher')
@Index('teacher_id_UNIUQE', ['id'], {
  unique: true,
  where: 'deleted=true',
})
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  firstName: string;

  @Column({ type: 'text', nullable: true })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'text', array: true, nullable: true })
  role: string[];

  @Column({ type: 'boolean', nullable: false, default: false })
  deleted: Boolean;

  @Column({ type: 'text', nullable: false })
  education: string;

  
  // @OneToMany(()=>Student, (student)=> student.rollNumber)
  // studentRollNumber:string

  @ManyToMany(() => Student, (student) => student.teachers)
  students: Student[];
}
