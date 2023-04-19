import { UserInterface } from "../../../../types/userInterface";
import User from "../models/userModel";

export const userRepositoryMongoDB = () => {
  const getUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email });
    return user;
  };

  const addUser = async (user: {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    color?:string
  }) => {
    user.color = Math.floor(Math.random()*16777215).toString(16)
    return await User.create(user)
  }


  const getUserById = async (id: string) =>
    await User.findById(id).populate(["coursesAsStudent", "coursesAsTeacher"]);

  const addCourseAsTeacher = async (_id: string, courseId: string) =>
    await User.updateOne(
      { _id },
      {
        $addToSet: { coursesAsTeacher: courseId },
      }
    );

  const isUserTeacher = async (_id: string, courseId: string) => {
    const res = await User.findOne({ _id, coursesAsTeacher: courseId });
    if (res) {
      return true;
    } else {
      return false;
    }
  };

  const isUserStudent = async (_id: string, courseId: string) => {
    const res = await User.findOne({ _id, coursesAsStudent: courseId });
    if (res) {
      return true;
    } else {
      return false;
    }
  };

  const addCourseAsStudent = async (_id: string, courseId: string) =>
    await User.updateOne(
      { _id },
      {
        $addToSet: { coursesAsStudent: courseId },
      }
    );

  return {
    getUserByEmail,
    addUser,
    getUserById,
    addCourseAsTeacher,
    isUserTeacher,
    addCourseAsStudent,
    isUserStudent
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
