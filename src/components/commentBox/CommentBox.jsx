import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import React, { useState, useEffect, useContext } from "react";
import "../commentBox/commentBox.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
export const CommentBox = ({
  id,
  postList,
  showSection,
  setShowSection,
  handleCreatePost,
  handleEditPost,
  handleDeletePost,
  createPostMutation,
  editPostMutation,
  deletePostMutation,
  postContent,
  setPostContent,
  setShowMsgPopup,
  fullAccess,
  contributorAccess,
  onEditComment,
  onUpdateComment,
  onEditTextContent,
  editedPost,
  setEditedPost,
}) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);


  const handleEditClick = (e, postId, value) => {
    e.preventDefault();
    setEditedPost(postId);
    setPostContent(value);
    console.log(postId);
  };

  const calculateTimeDifference = (date) => {
    const difference = new Date() - new Date(date);
    const units = {
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000,
      second: 1000,
    };
    for (const [unit, value] of Object.entries(units)) {
      const count = Math.floor(difference / value);
      if (count > 0) {
        return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  return (
    <div className="comment-box" id={theme.mode}>
      {postList &&
        postList.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-userInfoContainer">
              <div className="comment-userInfo">
                <img
                  className="userImage"
                  src={comment.CreatedBy.userAvatar}
                  alt=""
                />
                <div className="comment-userInfoData">
                  <h4>
                    {" "}
                    {comment.CreatedBy.name} {comment.CreatedBy.surname}
                  </h4>
                  <span>{comment.CreatedBy.role}</span>
         
         {comment&&comment?.files.map((file)=>{
          return(<InsertDriveFileIcon/>)
         })}
                </div>
              </div>
              <div className="comment-actionContainer">
                <span className="comment-actionContainer-Date">
                  {calculateTimeDifference(comment.CreatedAt)}
                </span>
                {comment.CreatedBy.id === user.userId ? (
                  <span className="comment-actionContainer-Buttons">
                    {editedPost !== comment.id ? (
                      <>
                        <CreateOutlinedIcon
                          disabled={true}
                          className="editCommentIcon"
                          onClick={(e) =>
                            handleEditClick(e, comment.id, comment.content)
                          }
                        ></CreateOutlinedIcon>
                        <DeleteOutlinedIcon
                          onClick={() =>
                            handleDeletePost(comment.id, deletePostMutation)
                          }
                        />
                      </>
                    ) : (
                      <div className="confirmCancelButtonWrapper">
                        <CheckOutlinedIcon
                          className="editConfirmCommentIcon"
                          onClick={() =>
                            handleEditPost({
                              postId: comment.id,
                              newContent: postContent,
                              mutation: editPostMutation,
                              postList,
                              setShowMsgPopup,
                            })
                          }
                        ></CheckOutlinedIcon>
                        <ClearOutlinedIcon
                          className="editCancelCommentIcon"
                          onClick={(e) => handleEditClick(e, null, "")}
                        ></ClearOutlinedIcon>
                      </div>
                    )}
                  </span>
                ) : null}
              </div>
            </div>
            {editedPost === comment.id ? (
              <textarea
                onChange={(e) => setPostContent((prev)=>{
                  return{...prev,textContent:e.target.value}
                })}
                className={`commentBox${
                  editedPost === comment.id ? "__editMode" : ""
                }`}
              >
                {comment.content}
              </textarea>
            ) : (
              <p
                className={`commentFocus commentFocus-${comment.contentEditable}`}
                defaultValue={comment.content}
                onInput={(e) => {
                  e.preventDefault();
                  onEditTextContent(e.target.innerHTML);
                }}
              >
                {comment.content}
              </p>
            )}
          </div>
        ))}
      <div className="toggleNewCommentForm">
        <div
          onClick={() => setShowSection((prevState) => !prevState)}
          className="toggleNewCommentForm-action"
        >
          {showSection ? "Hide" : "Add comment"}
        </div>
      </div>
      {showSection ? (
        <form
          className="newCommentForm"
          onSubmit={(e) =>
            handleCreatePost(e, postContent, createPostMutation, id)
          }
        >
          <div className="newCommentContainer">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              maxLength={4000}
              onChange={(e) => setPostContent((prev)=>{
                return {...prev,textContent:e.target.value}
              })}
              required={true}
              value={postContent?.textContent}
            ></textarea>
          </div>
          <div className="file-input-container">
            <input
              type="file"
              name="file"
              id="file"
              className="file-input"
              onChange={(e) => setPostContent((prev)=>{
                return {...prev,files:[...prev.files,e.target.files[0]]}
              })}
            />
            <label htmlFor="file" className="file-input-label"></label>
          </div>
          <div className="addNewCommentButtonContainer">
            <button type="submit">Add comment</button>
          </div>
        </form>
      ) : null}
    </div>
  );
};
