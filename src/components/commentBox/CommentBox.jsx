import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
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
  // const [commentsData, setCommentsData] = useState();
  



 

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
                  <h4> {comment.CreatedBy.name}</h4>
                  <span>{comment.CreatedBy.role}</span>
                </div>
                {comment.CreatedBy.id === user.userId &&!comment.contentEditable ? (
                  <CreateOutlinedIcon disabled={true} className='editCommentIcon' onClick={() =>{!comment.buttonDisabled? handleEditComment(comment.id,posts):null}}></CreateOutlinedIcon>
              
                ) : null}
{comment.CreatedBy.id === user.userId &&comment.contentEditable ?(
  <CheckOutlinedIcon className='editCommentIcon'  onClick={()=>onUpdateComment(comment.id,posts)}></CheckOutlinedIcon>
                ):null
}
              </div>
              <div>{comment.CreatedAt}</div>
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

      {contributorAccess && (
        <form onSubmit={addComment}>
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
          <div>
            <button type="submit">Add comment</button>
          </div>
        </form>
      )}
    </div>
  );
};
