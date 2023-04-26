import { ClassWorkInterface } from "../../../../types/classWorkInterface";
import ClassWork from "../models/classWorkModel";

export const classWorkRepositoryMongoDb = () => {
  const createWork = async (classWork: ClassWorkInterface) =>
    await ClassWork.create(classWork);

  const getAll = async (courseId: string) =>
    await ClassWork.find({ course: courseId }).sort({ postedOn: -1 });

  const getOne = async (id: string) =>
    await ClassWork.findById(id).populate("assignedBy");

  const decrementAssignedCount = async (id: string) =>
    await ClassWork.updateOne(
      { _id: id },
      {
        $inc: {
          assigned: -1,
          submitted: 1,
        },
      }
    );

  const decrementSubmissionCount = async (id: string, count: number) =>
    await ClassWork.updateOne(
      { _id: id },
      {
        $inc: {
          submitted: -count,
          returned: count,
        },
      }
    );

  const getAllNotReviewed = async (courseIds: string[]) =>
    await ClassWork.find({
      course: { $in: courseIds },
      $or: [
        {
          submitted: { $ne: 0 },
        },
        { assigned: { $ne: 0 } },
      ],
    });

  const getAllReviewed =async (courseIds:string[]) => 
  await ClassWork.find({
        course: {$in:courseIds},
        submitted:0,
        assigned:0
    })
  


  return {
    createWork,
    getAll,
    getOne,
    decrementAssignedCount,
    decrementSubmissionCount,
    getAllNotReviewed,
    getAllReviewed
  };
};

export type ClassWorkRepositoryMongoDb = typeof classWorkRepositoryMongoDb;
