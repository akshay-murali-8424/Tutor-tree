import { TeachersRepositoryMongoDb } from "../../frameworks/database/mongoDb/repositories/teachersRepositoryMongoDB";

export const teachersDbRepository = (
  repository: ReturnType<TeachersRepositoryMongoDb>
) => {
  const addTeacher = async (courseId: string, teacherId: string) =>
    await repository.addTeacher(courseId, teacherId);

  const getTeachers = async (courseId: string) =>
    await repository.getTeachers(courseId);

  return {
    addTeacher,
    getTeachers
  };
};

export type TeachersDbInterface = typeof teachersDbRepository;
