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
  const [editedCommentTextContent, setEditedCommentTextContent] = useState("");
  
  const [showSection,setShowSection]=useState(false)

  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [status,setStatus]=useState('')
  const [priority,setPriority]=useState('');
  const [type,setType]=useState('')

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
  getTicketPosts(ticketId))

const createPostMutation = mutationHandler(createTicketPost,()=>queryClient.invalidateQueries(["posts"]))


  
 

  // const [data, isLoading, error] = useFetch(
  //   `http://localhost:3000/api/notes/${ticketId}`
  // );



  const [ticketData, setTicketData] = useState({});
  const { user } = useContext(AuthContext);
  const {theme}=useContext(ThemeContext)
  const navigate = useNavigate();

//   useLayoutEffect(()=>{
// const contentHeight= domReference.current.offsetHeight;
// const windowHeight = window.innerHeight;
// setIsScrollale(contentHeight>windowHeight)
//   },[domReference.current])
  
 



  // const handleDelete = async () => {
  //   const respone = await fetch(`http://127.0.0.1:3000/api/notes/${ticketId}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  //   if (respone.ok) {
  //     navigate("/tickets");
  //   }
  // };

  // useEffect(() => {
  //   if (data) {
  //     setTicketData({
  //       ...ticketData,
  //       ticketAuthor: data.author,
  //       title: data.title,
  //       status: data.status,
  //       _id: data.ticketId,
  //       priority: data.priority,
  //       type: data.type,
  //       description: data.description,
  //       project: data.project,
  //       fullAccess: data.fullAccess,
  //       contributorAccess: data.contributorAccess,
  //     });
  //   }
  // }, [data]);

  const priorityOptions = ["Low", "Medium", "High"];
  const statusOptions = ["Open", "Closed"];






  // useEffect(() => {
  //   renderPosts();
  // }, []);
  // const renderPosts = async () => {
  //   const response = await fetch(
  //     `http://127.0.0.1:3000/api/posts/?ticketId=${ticketId}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     }
  //   );
  //   const json = await response.json();
  //   const initialPostState = json.map((post) => {
  //     return { ...post, contentEditable: false, buttonDisabled: false };
  //   });
  //   if (initialPostState.length > 0) {
  //     setTicketData({
  //       ...ticketData,
  //       comments: initialPostState,
  //     });
  //   }
  // };

  // const handleEditComment = (id, commentList) => {
  //   const index = commentList.findIndex((comment) => comment.id === id);
  //   const rest = commentList.filter((comment) => comment.id !== id);
  //   if (index === -1) {
  //     console.log("comment not found");
  //     return;
  //   }

  //   const uneditableCommentList = commentList.map((com) => {
  //     return { ...com, buttonDisabled: !com.buttonDisabled };
  //   });
  //   const updatedComment = {
  //     ...commentList[index],
  //     contentEditable: !commentList[index].contentEditable,
  //     buttonDisabled: !commentList[index].buttonDisabled,
  //   };
  //   const updatedComments = [...uneditableCommentList];
  //   updatedComments[index] = updatedComment;

  //   setTicketData({ ...ticketData, comments: updatedComments });
  // };

  // const handleUpdateCommnet = async (id, commentList) => {
  //   if (setEditedCommentTextContent.length > 0) {
  //     const response = await fetch(`http://127.0.0.1:3000/api/posts/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer' ${user.token}`,
  //       },
  //       body: JSON.stringify({ editedComment: editedCommentTextContent }),
  //     });
  //     if (response.ok) {
  //       handleEditComment(id, commentList);
  //       setEditedCommentTextContent("");
  //       renderPosts();
  //     }
  //   }
  // };

  // const addComment = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:3000/api/posts/?ticketId=${ticketId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //         body: JSON.stringify({ newComment }),
  //       }
  //     );
  //     const json = await response.json();
  //     if (response.ok) {
  //       setNewComment("");
  //       renderPosts();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleEditTextContent = (el) => {
  //   setEditedComment(el);
  // };

  // const handleDataUpdate = async () => {
  //   const response = await fetch(
  //     `http://127.0.0.1:3000/api/notes/${ticketId}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({
  //         title: ticketData.title,
  //         priority: ticketData.priority,
  //         status: ticketData.status,
  //         description: ticketData.description,
  //       }),
  //     }
  //   );

  //   if (response.ok) {
  //     navigate("/tickets");
  //   }
  // };

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
            posts={posts}
            showSection={showSection}
            setShowSection={setShowSection}
            handleCreatePost={handleCreatePost}
            createPostMutation={createPostMutation}
            postContent={postContent}
         setPostContent={setPostContent}
            fullAccess={ticketData.fullAccess}
            contributorAccess={ticketData.contributorAccess}
            // onEditComment={handleEditComment}
            // onUpdateComment={handleUpdateCommnet}
            // onEditTextContent={setEditedCommentTextContent}
            
          />

        </div>
      </div>
    </div>
  );
};
