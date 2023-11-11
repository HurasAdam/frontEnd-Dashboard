import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import React, { useState, useEffect, useContext  } from "react";
import "../commentBox/commentBox.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from '../../contexts/ThemeContext'
export const CommentBox = ({
  id,
  posts,
  showSection,
  setShowSection,
  handleCreatePost,
  createPostMutation,
  postContent,
  setPostContent,
  fullAccess,
  contributorAccess,
  onEditComment,
  onUpdateComment,
  onEditTextContent,
  
  
}) => {
  const { user } = useContext(AuthContext);
  const {theme}=useContext(ThemeContext)

  


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
        return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };  

  return (
    <div className="comment-box" id={theme.mode}>
      {posts &&
        posts.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-userInfoContainer">
              
              <div className="comment-userInfo">
                <img
                  className="userImage"
                  src={comment.CreatedBy.userAvatar}
                  alt=""
                />
                <div className="comment-userInfoData">
                  <h4> {comment.CreatedBy.name} {comment.CreatedBy.surname}</h4>
                  <span>{comment.CreatedBy.role}</span>
                </div>

              </div>
              <div className='comment-actionContainer'>
                <span className='comment-actionContainer-Date'>{calculateTimeDifference(comment.CreatedAt)}</span>
              <span className='comment-actionContainer-Buttons'>
              {comment.CreatedBy.id === user.userId &&!comment.contentEditable||user.role==='admin'&&!comment.contentEditable ? (
                  <CreateOutlinedIcon disabled={true} className='editCommentIcon' onClick={() =>{!comment.buttonDisabled? handleEditComment(comment.id,posts):null}}></CreateOutlinedIcon>
              
                ) : null}
{comment.CreatedBy.id === user.userId &&comment.contentEditable ||user.role==='admin' &&comment.contentEditable?(
  <div className='confirmCancelButtonWrapper'>
  <CheckOutlinedIcon className='editConfirmCommentIcon'  onClick={()=>onUpdateComment(comment.id,posts)}></CheckOutlinedIcon>
  <ClearOutlinedIcon className='editCancelCommentIcon' onClick={()=>handleEditComment(comment.id,posts)}></ClearOutlinedIcon>
  </div>
                ):null
}</span>
              </div>
              
            </div>

            <p
            className={`commentFocus commentFocus-${comment.contentEditable}`}
           
            
              defaultValue={comment.content}
              onInput={(e) => {
                e.preventDefault();
                onEditTextContent(e.target.innerHTML);
              }}
              contentEditable={comment.contentEditable}
            >
              {comment.content}
            </p>
          </div>
        ))}
<div className='toggleNewCommentForm'>
<div onClick={()=>setShowSection(prevState=>!prevState)} className='toggleNewCommentForm-action'>Add comment </div>
</div>
    {showSection?(
        <form className='newCommentForm' onSubmit={(e)=>handleCreatePost(e,postContent,createPostMutation,id)}>
          <div className="newCommentContainer">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              maxLength={4000}
              onChange={(e) => setPostContent(e.target.value)}
              required
              value={postContent}
            ></textarea>
          </div>
          <div className="file-input-container">
          <input
            type="file"
            name="file"
            id="file"
            className="file-input"
          />
          <label htmlFor="file" className="file-input-label"></label>
        </div>
          <div className='addNewCommentButtonContainer'>
            <button  type="submit">Add comment</button>
          </div>
        </form>
      ):null}
    </div>
  );
};
