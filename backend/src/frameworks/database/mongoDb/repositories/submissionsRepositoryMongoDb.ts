import { SubmissionInterface } from "../../../../types/submissionInterface";
import Submissions from "../models/submissionModel";

export const submissionsRepositoryMongoDb = () => {
  const createSubmissions = async (submissions: any) =>
    await Submissions.insertMany(submissions);

  const postSubmission = async (
    userId: string,
    attachments: { key: string; name: string }[],
    classWork: string
  ) =>
    await Submissions.updateOne(
      { userId, classWork },
      {
        $set: {
          attachments,
          status: "submitted",
        },
      }
    );

  const getSubmissions = async (classWork: string) =>
    await Submissions.find({ classWork }).populate(["userId", "classWork"]);

  const getSubmission = async (userId: string, classWork: string) =>
    await Submissions.findOne({ classWork, userId }).populate([
      "userId",
      "classWork",
    ]);

  const getAllSubmittedWorks = async (courseIds: string[], userId: string) =>
    await Submissions.find({
      userId,
      $or: [{ status: "submitted" }, { status: "returned" }],
      course: { $in: courseIds },
    });

  const getAllAssignedWorks = async (courseIds: string[], userId: string) =>
    await Submissions.find({
      userId,
      status: "assigned",
      course: { $in: courseIds },
    }).populate("classWork");

  const returnSubmissions = async (submissionIds: string[]) =>
    await Submissions.updateMany(
      { _id: { $in: submissionIds } },
      {
        $set: {
          status: "returned",
        },
      }
    );

  const setMark = async (submissionId: string, mark: number) =>
    await Submissions.updateOne(
      { _id: submissionId },
      {
        $set: {
          mark,
        },
      }
    );

  return {
    createSubmissions,
    postSubmission,
    getSubmissions,
    returnSubmissions,
    getSubmission,
    setMark,
    getAllAssignedWorks,
    getAllSubmittedWorks,
  };
};

export type SubmissionsRepositoryMongoDb = typeof submissionsRepositoryMongoDb;
