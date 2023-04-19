import { Button } from "primereact/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import TeacherAssignmentSideBar from "../../components/Course/TeacherAssignment/TeacherAssignmentSideBar";
import NavBar from "../../components/User/UserNavBar/NavBar";
import { useGetSubmissionsQuery, useReturnSubmissionsMutation} from "../../redux/Features/api/apiSlice";
import { selectuserAuth } from "../../redux/Features/reducers/userAuthSlice";
import { IGetSubmissionsResponse } from "../../Types/ResponseInterface";
import { Splitter, SplitterPanel } from "primereact/splitter";
import SubmissionDetails from "../../components/Course/TeacherAssignment/SubmissionDetails";
import { toast } from "react-hot-toast";

function TeacherAssignment() {
  const { token } = useSelector(selectuserAuth);
  const { courseId, id: classWorkId } = useParams<string>();
  const [submission, setSubmission] = useState<IGetSubmissionsResponse>();
  const [selectedSubmissions,setSelectedSubmissions] = useState<string[]>([])
  const { data } =
    useGetSubmissionsQuery({ courseId, classWorkId });

  const [returnSubmission,{isLoading}] = useReturnSubmissionsMutation()

  const returnHandler = async() =>{
    console.log(selectedSubmissions)
    if(!isLoading){
      try{
        const res = await returnSubmission({courseId,classWorkId,submissions:selectedSubmissions}).unwrap()
        if(res.status==="success")
        toast.success("submissions returned")
      }catch(err){
        console.log(err)
      }
    }
  }

  if (token) {
    return (
      <>
        <NavBar course={false} />
        <div className="p-2 pl-4" style={{ border: "0.0625rem solid #dadce0" }}>
          {selectedSubmissions.length?<Button className="primaryButt" onClick={returnHandler}>
            Return
          </Button>:
          <Button className="primaryButt" disabled>
          Return
        </Button>}
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
                ingredients={selectedSubmissions}
                setIngredients={setSelectedSubmissions}
              />
            )}
          </SplitterPanel>
          <SplitterPanel size={75} minSize={60}>
          
          <SubmissionDetails submission={submission} />  
          </SplitterPanel>
        </Splitter>
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default TeacherAssignment;
