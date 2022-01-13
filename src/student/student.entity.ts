import {
  Column,
  Entity,
  Index,
  OneToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
  Generated,
} from 'typeorm';
import { Teacher } from '../teacher/teacher.entity';

@Entity('student')
@Index('student_rollNumber_UNIUQE', ['rollNumber'], {
  unique: true,
  where: 'deleted=false',
})
export class Student {
  @PrimaryGeneratedColumn('uuid')
  rollNumber: string;

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

  @Column({ type: 'text', nullable: true })
  education: string;

  @Column({ type: 'text', array: true, nullable: false })
  section: string[];

  @ManyToMany(() => Teacher, (teacher) => teacher.students)
  @JoinTable()
  teachers: Teacher[];

  // @OneToMany(() => Teacher, (eta) => eta.students)
  // @JoinTable()
  // Teacher: Promise<Student>;
}
