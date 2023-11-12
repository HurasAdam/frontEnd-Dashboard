import "./ticketDetails.css";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect, useState,useLayoutEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CommentBox } from "../../components/commentBox/CommentBox";
import { ThemeContext } from '../../contexts/ThemeContext'
import { useQuery } from "react-query";
import {ObjectDateToString} from '../../utils/ObjectDateToString'
import { getTicket } from "../../features/ticketApi/ticketApi";
import { useSocketListen } from "../../hooks/useSocketListen";
import { getTicketPosts } from "../../features/ticketApi/ticketApi";
import { createTicketPost } from "../../features/ticketApi/ticketApi";
import {mutationHandler} from "../../shared/mutationHandler"
import { useQueryClient } from "react-query";
import { handleCreatePost } from "../../shared/handleCreatePost";
import { editTicketPost } from "../../features/ticketApi/ticketApi";
import { handleEditPost } from "../../shared/handleEditPost";
import { deleteTicketPost } from "../../features/ticketApi/ticketApi";
import { handleDeletePost } from "../../shared/handleDeletePost";
import { MsgPopup } from "../../components/msgPopup/MsgPopup";
import { handlePopup } from "../../shared/handlePopup";
export const TicketDetails = () => {

  useSocketListen({
    event:"postCollectionUpdate",
    queryKey:"posts"
  })

  const { ticketId } = useParams();
  const domReference = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [iseScrollable,setIsScrollale]=useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [editedPost, setEditedPost] = useState(null);
  const [showMsgPopup,setShowMsgPopup]=useState({
    visible:false,
    message:'',
    success:null
  })
  const [showSection,setShowSection]=useState(false)

  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [status,setStatus]=useState('')
  const [priority,setPriority]=useState('');
  const [type,setType]=useState('')
const [postList,setPostList]=useState([])
  const queryClient=useQueryClient()

  
  const { isLoading, isError, error, data } = useQuery(["ticket"], () =>
  getTicket(ticketId),{
    refetchOnWindowFocus:false,
    onSuccess:(data)=>{
setTitle(data?.title);
setDescription(data?.description);
setStatus(data?.status);
setPriority(data?.priority);
setType(data?.type);

    }
  })
  const { data:posts } = useQuery(["posts"], () =>
  getTicketPosts(ticketId),{
    onSuccess:(posts)=>{
      setPostList(posts)
    }
  })



  
const createPostMutation = mutationHandler(createTicketPost,(data)=>{
  setShowSection(false)

  if(data.code){
    console.log(data.response.data.message)
    handlePopup(setShowMsgPopup,data.response.data)
  }
else{
  handlePopup(setShowMsgPopup,data)
}
}
)
const editPostMutation= mutationHandler(editTicketPost,()=>{
  setEditedPost(null);})
const deletePostMutation = mutationHandler(deleteTicketPost,()=>{console.log("USUNIETO")})
  
 

  const [ticketData, setTicketData] = useState({});
  const { user } = useContext(AuthContext);
  const {theme}=useContext(ThemeContext)
  const navigate = useNavigate();


  const priorityOptions = ["Low", "Medium", "High"];
  const statusOptions = ["Open", "Closed"];



  return (
    <div className="ticketDetails" id={theme.mode} ref={domReference}>
      <div className="ticketHeaderContainer">
        <span className="ticketHeaderIcon">
          <BugReportOutlinedIcon className="headerIcon" />
        </span>

        <span className="ticketHeaderTitle">Edit Ticket</span>
      </div>
      <div className="ticketDataContainer">
        <div className="ticketDataContainerLeft">
          <div className="ticketDataContainerWrapper">
            {data && data.project && (
              <div className="ticketDataContainerTop">
                <div className="ticektDataBottom">
                  <form action="">
                    <div className="ticketDataTopItemWrapper">
                      <div className="ticketInfoTopItem title">
                        <label htmlFor="">Ticket</label>

                        {data && (
                          <input
                          className="ticketDetails-ticketTitle"
                            disabled={isDisabled}
                            type="text"
                            required
                            defaultValue={data.title}
                            onChange={(e) =>
                              setTicketData({
                                ...ticketData,
                                title: e.target.value,
                              })
                            }
                          />
                        )}
                      </div>
                      <div className="ticketInfoTopItem">
                        <ScheduleOutlinedIcon />
                        <span>Created:</span>
                        {data && (
                          <span>{ObjectDateToString(data.createdAt)}</span>
                        )}
                      </div>
                    </div>
                    <div className="ticketDataBottomItem"></div>
                    <div className="ticketDataTopItemWrapper">
                      <div className="ticketDataTopItem">
                        <label htmlFor="">CreatedBy</label>
                        {ticketData.ticketAuthor && (
                          <div className="ticketAuthorInfo">
                            {" "}
                            {`${ticketData.ticketAuthor.name} ${ticketData.ticketAuthor.surname}`}
                          </div>
                        )}
                      </div>
                      <div className="ticketDataTopItem">
                        <label htmlFor="">Project</label>
                        {ticketData.project && (
                          <div className="projectInfo">
                            {ticketData.project.projectTitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ticketDataBottomItem">
                      <div className="ticketDataBottomItemWrapper">
                        <div className="ticketDataBottomItemWrapper-select">
                          <label htmlFor="">Priority</label>

                          {data && (
                            <select
                              disabled={isDisabled}
                              className="selectTicketPriority"
                              onChange={(e) =>
                                setTicketData({
                                  ...ticketData,
                                  priority: e.target.value,
                                })
                              }
                              value={ticketData.priority}
                            >
                              <option disabled selected>
                                {ticketData.priority}
                              </option>

                              {data &&
                                priorityOptions
                                  .filter((o) => o !== ticketData.priority)
                                  .map((option) => {
                                    return (
                                      <option key={option}>{option}</option>
                                    );
                                  })}
                            </select>
                          )}
                        </div>
                        <div className="ticketDataBottomItemWrapper-select">
                          <label htmlFor="">Status</label>
                          {data && (
                            <select
                              onChange={(e) =>
                                setTicketData({
                                  ...ticketData,
                                  status: e.target.value,
                                })
                              }
                              value={ticketData.status}
                              className="selectTicketPriority"
                              disabled={isDisabled}
                            >
                              <option disabled selected>
                                {ticketData.status}
                              </option>
                              {statusOptions
                                .filter((o) => o !== ticketData.status)
                                .map((option) => {
                                  return <option>{option}</option>;
                                })}
                            </select>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ticketDataBottomItem-textArea">
                      <label htmlFor="">Description</label>
                      {data && (
                        <textarea
                          onChange={(e) =>
                            setTicketData({
                              ...ticketData,
                              description: e.target.value,
                            })
                          }
                          defaultValue={data.description}
                          disabled={isDisabled}
                        ></textarea>
                      )}
                    </div>
                  </form>
                  {ticketData.fullAccess ? (
                    <div className="ticketInfoButtonWrapper">
                      <button onClick={handleDelete}>Delete</button>
                      {isDisabled ? (
                        <button onClick={() => setIsDisabled(false)}>
                          Edit
                        </button>
                      ) : (
                        <button
                          disabled={isDisabled}
                          onClick={() => {
                            setIsDisabled(true);
                            handleDataUpdate();
                          }}
                        >
                          Update
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            <div className="ticektDataContainerTop-right"></div>
          </div>
       
        
          <CommentBox
          id={ticketId}
          postList={postList}
            showSection={showSection}
            setShowSection={setShowSection}
            handleCreatePost={handleCreatePost}
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
            createPostMutation={createPostMutation}
            editPostMutation={editPostMutation}
            deletePostMutation={deletePostMutation}

            postContent={postContent}
         setPostContent={setPostContent}
         editedPost={editedPost}
         setEditedPost={setEditedPost}
            fullAccess={ticketData.fullAccess}
            contributorAccess={ticketData.contributorAccess}
            // onEditComment={handleEditComment}
            // onUpdateComment={handleUpdateCommnet}
            // onEditTextContent={setEditedCommentTextContent}
            
          />

{showMsgPopup.visible?(<MsgPopup
showMsgPopup={showMsgPopup}
/>):null}
        </div>
      </div>
    </div>
  );
};
