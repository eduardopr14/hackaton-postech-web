import { defineStore } from 'pinia';
import { UserType, UserInfo } from '@/types/types';
import { users, students, professors, schools } from '@/data/mockData';
import { generateRandomString } from '@/functions/functions.ts';

const generateId = () => Date.now().toString() + generateRandomString(10);

export const useCrudStore = defineStore('crud', () => {
  const localUsers = users;
  const localStudents = students;
  const localProfessors = professors;
  const localSchools = schools;

  const getUserLogged = () => {
    return localStorage.getItem('currentUserId');
  }

  const getUserInfo = (userId: string | null) => {
    return localStudents.find(user => user.userId == userId);
  }

  const getLocalStudentById = (userId: string | null): UserInfo | null => {
    const student = localStudents.find(student => student.userId === userId);
    if (!student) return null;

    return { userId: student.userId, schoolId: student.schoolId, classId: student.classId };
  }

  const createProfessor = (username: string, password: string, schoolIds: string[], name: string) => {
    const newUser = {
      id: generateId(),
      username,
      password,
      role: 'P' as UserType,
      isDeleted: false,
    };
    const newProfessor = {
      userId: newUser.id,
      name,
      schoolIds,
      isDeleted: false,
    };
    localUsers.push(newUser);
    localProfessors.push(newProfessor);
    return { user: newUser, professor: newProfessor };
  };

  const createStudent = (username: string, password: string, schoolId: string, classId: string, name: string) => {
    const newUser = {
      id: generateId(),
      username,
      password,
      role: 'S' as UserType,
      isDeleted: false,
    };
    const newStudent = {
      userId: newUser.id,
      schoolId,
      classId,
      name,
      isDeleted: false,
    };
    localUsers.push(newUser);
    localStudents.push(newStudent);
    return { user: newUser, student: newStudent };
  };

  const deleteUser = (userId: string) => {
    const user = localUsers.find(u => u.id === userId);
    if (user && !user.isDeleted) {
      user.isDeleted = true;

      if (user.role === 'S') {
        const student = localStudents.find(s => s.userId === userId);
        if (student) {
          student.isDeleted = true;
        }
      }

      if (user.role === 'P') {
        const professor = localProfessors.find(p => p.userId === userId);
        if (professor) {
          professor.isDeleted = true;
        }
      }

      return user;
    }
    return null;
  };

  const addSchoolsToProfessor = (userId: string, newSchoolIds: string[]) => {
    const professor = localProfessors.find(p => p.userId === userId);
    if (professor && !professor.isDeleted) {
      professor.schoolIds = [...new Set([...(professor.schoolIds || []), ...newSchoolIds])];
      return professor;
    }
    return null;
  };

  const addSchool = (name: string, classIds: string[]) => {
    const newSchool = {
      schoolId: generateId(),
      name,
      classIds,
      isDeleted: false,
    };
    localSchools.push(newSchool);
    return newSchool;
  };

  const deleteSchool = (schoolId: string) => {
    const school = localSchools.find(s => s.schoolId === schoolId);
    if (school && !school.isDeleted) {
      school.isDeleted = true;
      localStudents.forEach(student => {
        if (student.schoolId === schoolId) {
          student.isDeleted = true;
        }
      });
      localProfessors.forEach(professor => {
        if (professor.schoolIds.includes(schoolId)) {
          professor.isDeleted = true;
        }
      });
      return school;
    }
    return null;
  };

  const getSchools = () => {
    return localSchools.filter(school => !school.isDeleted);
  };

  return {
    getUserLogged,
    getUserInfo,
    getLocalStudentById,
    createProfessor,
    createStudent,
    deleteUser,
    addSchoolsToProfessor,
    addSchool,
    deleteSchool,
    getSchools
  };
});
