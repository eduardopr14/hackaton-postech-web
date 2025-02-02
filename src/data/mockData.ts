import { UserType } from '@/types/types';

export const users = [
  { id: '1', username: 'professor', password: '1234', role: 'P' as UserType, isDeleted: false },
  { id: '2', username: 'aluno', password: '1234', role: 'S' as UserType, isDeleted: false },
  { id: '3', username: 'aluno2', password: '1234', role: 'S' as UserType, isDeleted: false },
  { id: '4', username: 'aluno3', password: '1234', role: 'S' as UserType, isDeleted: false },
];

export const students = [
  {
    userId: '2',
    schoolId: '1',
    classId: '1',
    name: 'João',
    isDeleted: false,
  },
  {
    userId: '3',
    schoolId: '1',
    classId: '1',
    name: 'Maria',
    isDeleted: false,
  },
  {
    userId: '4',
    schoolId: '1',
    classId: '2',
    name: 'José',
    isDeleted: false,
  },
];

export const professors = [
  {
    userId: '1',
    name: 'Professor 1',
    schoolIds: ['1', '2'],
    isDeleted: false,
  },
];

export const schools = [
  {
    schoolId: '1',
    name: 'Escola A',
    classIds: ['1', '2'],
    isDeleted: false,
  },
  {
    schoolId: '2',
    name: 'Escola B',
    classIds: ['3', '4'],
    isDeleted: false,
  },
];
