import { SubmissionDbInterface } from "../../repositories/submissionDbRepository";
import { CloudServiceInterface } from "../../services/cloudServiceInterface";

export const createNewSubmission = async (
  student: string,
  classWork: string,
  files: Express.Multer.File[],
  cloudService: ReturnType<CloudServiceInterface>,
  dbRepositorySubmission: ReturnType<SubmissionDbInterface>
) => {

  const attachments = await Promise.all(
    files.map(async (file) => {
      const { Key } = await cloudService.upload(file);
      return Key;
    })
  );
  
   await dbRepositorySubmission.createSubmission({student,classWork,attachments})
};
