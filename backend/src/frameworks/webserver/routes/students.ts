import express from "express";
import studentController from "../../../adapters/controllers/studentController";
import { submissionDbRepository } from "../../../application/repositories/submissionDbRepository";
import { submissionsRepositoryMongoDb } from "../../database/mongoDb/repositories/submissionsRepositoryMongoDb";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepositoryMongoDB";

const studentsRouter = () => {
  const router = express.Router();

  const controller = studentController(
    submissionDbRepository,
    submissionsRepositoryMongoDb,
    userDbRepository,
    userRepositoryMongoDB
  );

  router.get('/to-do',controller.getAllAssignedWorks)

  router.get('/done',controller.getAllSubmittedWorks)

  return router;
};

export default studentsRouter;
