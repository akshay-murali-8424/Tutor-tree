import { ClassWorkDbRepository } from "../../repositories/classWorkDbRepository";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const getReviewedWorks = async (
  dbRepositoryClassWork: ReturnType<ClassWorkDbRepository>,
  course: string,
  userId: string,
  dbRepositoryUser: ReturnType<UserDbInterface>
) => {
  let courseIds: any = [];
  if (course === "all") {
    const res = await dbRepositoryUser.getUser(userId);
    courseIds = res?.coursesAsTeacher;
  } else {
    courseIds = [course];
  }
  return await dbRepositoryClassWork.getAllReviewed(courseIds);
};

export const getNotReviewedWorks = async (
  dbRepositoryClassWork: ReturnType<ClassWorkDbRepository>,
  course: string,
  userId: string,
  dbRepositoryUser: ReturnType<UserDbInterface>
) => {
  let courseIds: any = [];
  if (course === "all") {
    const res = await dbRepositoryUser.getUser(userId);
    courseIds = res?.coursesAsTeacher;
  } else {
    courseIds = [course];
  }

  return await dbRepositoryClassWork.getAllNotReviewed(courseIds);
};
