import { Button } from "primereact/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import TeacherAssignmentSideBar from "../../components/Course/TeacherAssignment/TeacherAssignmentSideBar";
import NavBar from "../../components/User/UserNavBar/NavBar";
import { useGetSubmissionsQuery} from "../../redux/Features/api/apiSlice";
import { selectuserAuth } from "../../redux/Features/reducers/userAuthSlice";
import { IGetSubmissionsResponse } from "../../Types/ResponseInterface";
import { Splitter, SplitterPanel } from "primereact/splitter";
import SubmissionDetails from "../../components/Course/TeacherAssignment/SubmissionDetails";

function TeacherAssignment() {
  const { token } = useSelector(selectuserAuth);
  const { courseId, id: classWorkId } = useParams<string>();
  const [submission, setSubmission] = useState<IGetSubmissionsResponse>();
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useGetSubmissionsQuery({ courseId, classWorkId });

  if (token) {
    return (
      <>
        <NavBar course={false} />
        <div className="p-2 pl-4" style={{ border: "0.0625rem solid #dadce0" }}>
          <Button className="primaryButt" disabled>
            Return
          </Button>
        </div>
        <Splitter style={{ minHeight: "84.5vh" }}>
          <SplitterPanel
            size={25}
            minSize={10}
            >
            {data && (
              <TeacherAssignmentSideBar
                data={data}
                setSubmission={setSubmission}
              />
            )}
          </SplitterPanel>
          <SplitterPanel size={75} minSize={60}>
          <SubmissionDetails submission={submission}/>
          </SplitterPanel>
        </Splitter>
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default TeacherAssignment;
