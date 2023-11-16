import "./ticketDetails.css";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CommentBox } from "../../components/commentBox/CommentBox";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useQuery } from "react-query";
import { ObjectDateToString } from "../../utils/ObjectDateToString";
import {
  getSelectOptionList,
  getTicket,
  updateTicket,
} from "../../features/ticketApi/ticketApi";
import { useSocketListen } from "../../hooks/useSocketListen";
import { getTicketPosts } from "../../features/ticketApi/ticketApi";
import { createTicketPost } from "../../features/ticketApi/ticketApi";
import { mutationHandler } from "../../shared/mutationHandler";
import { useQueryClient } from "react-query";
import { handleCreatePost } from "../../shared/handleCreatePost";
import { editTicketPost } from "../../features/ticketApi/ticketApi";
import { handleEditPost } from "../../shared/handleEditPost";
import { deleteTicketPost } from "../../features/ticketApi/ticketApi";
import { handleDeletePost } from "../../shared/handleDeletePost";
import { deleteTicket } from "../../features/ticketApi/ticketApi";
import { handleDeleteTicket } from "../../shared/handleDeleteTicket";
import { MsgPopup } from "../../components/msgPopup/MsgPopup";
import { handlePopup } from "../../shared/handlePopup";
import { handleUpdateTicket } from "../../shared/handleUpdateTicket";
export const TicketDetails = () => {
  useSocketListen({
    event: "postCollectionUpdate",
    queryKey: "posts",
  });

  useSocketListen({
    event: "ticketCollectionUpdate",
    queryKey: "ticket",
  });

  const { ticketId } = useParams();
  const domReference = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const [selectOptions, setSelectOptions] = useState({
    priority: [],
    status: [],
  });

  const [postContent, setPostContent] = useState("");
  const [editedPost, setEditedPost] = useState(null);
  const [showMsgPopup, setShowMsgPopup] = useState({
    visible: false,
    message: "",
    success: null,
  });
  const [showSection, setShowSection] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ZIOBRO");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [postList, setPostList] = useState([]);
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery(
    ["ticket"],
    () => getTicket(ticketId),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setTitle(data?.title);
        setDescription(data?.description);
        setStatus(data?.status);
        setPriority(data?.priority);
        setType(data?.type);
      },
    }
  );
console.log(data)
  const { data: posts } = useQuery(["posts"], () => getTicketPosts(ticketId), {
    onSuccess: (posts) => {
      setPostList(posts);
    },
  });

  const { data: selectOptionList, refetch: fetchPriorityOptionList } = useQuery(
    ["selectOptionList"],
    getSelectOptionList,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const createPostMutation = mutationHandler(createTicketPost, (data) => {
    setShowSection(false);

    if (data.code) {
      handlePopup(setShowMsgPopup, data.response.data);
    } else {
      handlePopup(setShowMsgPopup, data);
    }
  });

  const updateTicketMutation = mutationHandler(updateTicket, (data) => {
    if (data.code) {
      handlePopup(setShowMsgPopup, data.response.data);
    } else {
      handlePopup(setShowMsgPopup, data);
    }
  });

  const editPostMutation = mutationHandler(editTicketPost, (data) => {
    if (data.code) {
      handlePopup(setShowMsgPopup, data.response.data);
    } else {
      setEditedPost(null);
      handlePopup(setShowMsgPopup, data);
      setPostContent("");
    }
  });

  const deleteTicketMutation = mutationHandler(deleteTicket, (data) => {
    console.log(data);
    navigate("/tickets");
  });

  const deletePostMutation = mutationHandler(deleteTicketPost, () => {
    console.log("USUNIETO");
  });

  const handleEditMode = () => {
    setIsDisabled(false);
    fetchPriorityOptionList();
  };

  const [ticketData, setTicketData] = useState({});
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

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
            {data && (
              <div className="ticketDataContainerTop">
                <div className="ticketDataContainerTop__contentHeader">
                  <div className="ticketDataContainerTop__icons">
                    <div class={`icon icon-type__${data.type}`}>
                      {data.type}
                    </div>

                    <div class={`icon icon-priority__${data.priority}`}>
                      {data.priority}
                    </div>
                    <div class={`icon icon-status__${data.status}`}>
                      {data.status}
                    </div>
                  </div>
                  <div className="ticketInfoTopItem">
                    <ScheduleOutlinedIcon />
                    <span>Created:</span>
                    {data && <span>{ObjectDateToString(data.createdAt)}</span>}
                  </div>
                </div>
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
                            value={title && title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="ticketDataBottomItem"></div>
                    <div className="ticketDataTopItemWrapper">
                      <div className="ticketDataTopItem">
                        <label htmlFor="">Author</label>
                        {data && (
                          <div className="ticketAuthorInfo">
                            {" "}
                            {`${data?.author?.name} ${data.author.surname}`}
                          </div>
                        )}
                      </div>
                      <div className="ticketDataTopItem">
                        <label htmlFor="">Project</label>
                        {data.project && (
                          <div className="projectInfo">
                            {data?.project?.title}
                          </div>
                        )}
                      </div>
                    </div>
                    {!isDisabled ? (
                      <div className="ticketDataBottomItem">
                        <div className="ticketDataBottomItemWrapper">
                          <div className="ticketDataBottomItemWrapper-select">
                            <label htmlFor="">Priority</label>

                            {data && (
                              <select
                                disabled={isDisabled}
                                className="selectTicketPriority"
                                onChange={(e) => setPriority(e.target.value)}
                              >
                                {selectOptionList &&
                                  selectOptionList?.priority.map((o) => (
                                    <option
                                      selected={o.value === priority}
                                      disabled={o?.value === priority}
                                      value={o?.value}
                                      key={o?.value}
                                    >
                                      {o?.label}
                                    </option>
                                  ))}
                              </select>
                            )}
                          </div>
                          <div className="ticketDataBottomItemWrapper-select">
                            <label htmlFor="">Status</label>
                            {data && (
                              <select
                                onChange={(e) => setStatus(e.target.value)}
                                className="selectTicketPriority"
                                disabled={isDisabled}
                              >
                                {/* <option disabled selected>
                                {ticketData.status}
                              </option> */}

                                {selectOptionList &&
                                  selectOptionList?.status.map((option) => {
                                    return (
                                      <option
                                        selected={option?.value === status}
                                        disabled={option?.value === status}
                                        key={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    );
                                  })}
                              </select>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <div className="ticketDataBottomItem-textArea">
                      <label htmlFor="">Description</label>
                      {data && (
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          value={description && description}
                          disabled={isDisabled}
                        ></textarea>
                      )}
                    </div>
                  </form>

                  {!isDeleted ? (
                    <div className="ticketInfoButtonWrapper">
                      
                      <button onClick={(e) => setIsDeleted((prev) => !prev)}>
                        Delete
                      </button>
                      {isDisabled  ? (
                        <button 
                        disabled={data?.Archivized}  
                        onClick={handleEditMode}
                        className={data?.Archivized?'btn__disabled':''}
                        >Edit
                        </button>
                      ) : (
                        <button
                          disabled={isDisabled}
                          onClick={(e) =>
                            handleUpdateTicket(
                              {
                                id: ticketId,
                                mutation: updateTicketMutation,
                                formData: {
                                  title,
                                  priority,
                                  status,
                                  description,
                                },
                              },
                              data,
                              setShowMsgPopup
                            )
                          }
                        >
                          Update
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        onChange={(e) => setConfirmDelete(e.target.value)}
                      />
                      <button
                        onClick={(e) =>
                          handleDeleteTicket(e, {
                            id: ticketId,
                            mutation: deleteTicketMutation,
                            confirmationString: confirmDelete,
                          })
                        }
                      >
                        Confirm
                      </button>
                      <button onClick={(e) => setIsDeleted((prev) => !prev)}>
                        Cancel
                      </button>
                    </>
                  )}
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
            setShowMsgPopup={setShowMsgPopup}
            // onEditComment={handleEditComment}
            // onUpdateComment={handleUpdateCommnet}
            // onEditTextContent={setEditedCommentTextContent}
          />

          {showMsgPopup.visible ? (
            <MsgPopup
              showMsgPopup={showMsgPopup}
              setShowMsgPopup={setShowMsgPopup}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
