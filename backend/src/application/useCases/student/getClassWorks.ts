import { SubmissionDbInterface } from "../../repositories/submissionDbRepository";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const getAssignedWorks = async (
  dbRepositorySubmission: ReturnType<SubmissionDbInterface>,
  course: string,
  userId: string,
  dbRepositoryUser: ReturnType<UserDbInterface>
) => {
  let courseIds: any = [];
  if (course === "all") {
    const res = await dbRepositoryUser.getUser(userId);
    courseIds = res?.coursesAsStudent;
  } else {
    courseIds = [course];
  }
  return await dbRepositorySubmission.getAllAssignedWorks(courseIds,userId)
};


export const getSubmittedWorks = async (
  dbRepositorySubmission: ReturnType<SubmissionDbInterface>,
  course: string,
  userId: string,
  dbRepositoryUser: ReturnType<UserDbInterface>
) => {
  let courseIds: any = [];
  if (course === "all") {
    const res = await dbRepositoryUser.getUser(userId);
    courseIds = res?.coursesAsStudent;
  } else {
    courseIds = [course];
  }
  return await dbRepositorySubmission.getAllSubmittedWorks(courseIds,userId)
};
