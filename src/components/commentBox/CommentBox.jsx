import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import React, { useState, useEffect, useContext } from "react";
import "../commentBox/commentBox.css";
import { AuthContext } from "../../contexts/AuthContext";
export const CommentBox = ({
  posts,
  addComment,
  setNewComment,
  fullAccess,
  contributorAccess,
  onEditComment,
  onUpdateComment,
  onEditTextContent,
  newComment
}) => {
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false)
  



 

  const handleEditComment = (id) => {
    onEditComment(id,posts)
  };


  return (
    <div className="comment-box">
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
                <span className='comment-actionContainer-Date'>{comment.CreatedAt}</span>
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
              defaultValue={comment.Content}
              onInput={(e) => {
                e.preventDefault();
                onEditTextContent(e.target.innerHTML);
              }}
              contentEditable={comment.contentEditable}
            >
              {comment.Content}
            </p>
          </div>
        ))}
<div className='toggleNewCommentForm'>
<div onClick={()=>setVisible(!visible)} className='toggleNewCommentForm-action'>Add comment </div>
</div>
      {visible &&contributorAccess&& (
        <form className='newCommentForm' onSubmit={addComment}>
          <div className="newCommentContainer">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              maxLength={4000}
              onChange={(event) => setNewComment(event.target.value)}
              required
              value={newComment}
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
            <button type="submit">Add comment</button>
          </div>
        </form>
      )}
    </div>
  );
};
