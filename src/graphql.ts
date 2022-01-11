
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Program {
    BBA = "BBA",
    BSC = "BSC",
    MBA = "MBA",
    MSC = "MSC",
    MBDS = "MBDS"
}

export enum Section {
    A = "A",
    B = "B",
    C = "C",
    D = "D"
}

export enum Role {
    admin = "admin",
    professor = "professor",
    serior_Professor = "serior_Professor",
    associate_Professor = "associate_Professor",
    junior_Professor = "junior_Professor",
    accounts_Officer = "accounts_Officer"
}

export interface Teachers {
    id?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<Nullable<Role>[]>;
}

export interface StudentInput {
    rollNumber?: Nullable<string>;
    firstName: string;
    lastName: string;
    email: string;
    section: Nullable<Section>[];
    education: Nullable<Program>[];
    teachers: Nullable<Teachers>[];
}

export interface UpdateStudent {
    rollNumber?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    section?: Nullable<Nullable<Section>[]>;
    education?: Nullable<Nullable<Program>[]>;
    teacher?: Nullable<Nullable<Teachers>[]>;
}

export interface TeacherInput {
    id?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<Nullable<Role>[]>;
    education: string;
}

export interface Student {
    rollNumber?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    section?: Nullable<Nullable<Section>[]>;
    education?: Nullable<Program>;
    teachers?: Nullable<Nullable<Teacher>[]>;
    deleted?: Nullable<boolean>;
}

export interface IQuery {
    students(rollNumber: string): Nullable<Student> | Promise<Nullable<Student>>;
    studentsByTeacherId(teacherId: string): Nullable<Student> | Promise<Nullable<Student>>;
    allTeachers(deleted?: Nullable<boolean>): Nullable<Nullable<Teacher>[]> | Promise<Nullable<Nullable<Teacher>[]>>;
    teachers(id: string): Nullable<Teacher> | Promise<Nullable<Teacher>>;
    teacherByStudent(studentId: string): Nullable<Teacher> | Promise<Nullable<Teacher>>;
}

export interface IMutation {
    createStudent(input?: Nullable<StudentInput>): Nullable<Student> | Promise<Nullable<Student>>;
    deleteStudent(rollNumber: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateStudentClass(input?: Nullable<UpdateStudent>): Nullable<Student> | Promise<Nullable<Student>>;
    createTeacher(input?: Nullable<TeacherInput>): Nullable<Teacher> | Promise<Nullable<Teacher>>;
    deleteTeacher(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    updateTeacherRole(id?: Nullable<string>, role?: Nullable<Nullable<Role>[]>): Nullable<Teacher> | Promise<Nullable<Teacher>>;
}

export interface Teacher {
    id?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<Nullable<Role>[]>;
    education: string;
    student?: Nullable<Nullable<Student>[]>;
    deleted?: Nullable<boolean>;
}

type Nullable<T> = T | null;
