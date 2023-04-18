import React, { useState, useEffect } from 'react';
import "../commentBox/commentBox.css"
export const CommentBox=({posts,addComment,setNewComment,fullAccess,contributorAccess})=> {

const [textAreaHeight,setTextAreaHeight]=useState()

console.log(contributorAccess&&contributorAccess)

  return (
    <div className="comment-box">
      
  
      {posts&&posts.map((comment) => (
        <div key={comment.id} className="comment">
        <div className="comment-userInfoContainer">
          <div className='comment-userInfo'> 
        <img className='userImage' src={comment.CreatedBy.userAvatar} alt="" /> 
        <div className='comment-userInfoData'>
        <h4> {comment.CreatedBy.name}</h4>
        <span>{comment.CreatedBy.role}</span>
        </div>
        </div>
        <div>{comment.CreatedAt}</div>
        </div>
          
   <p>
        
          {comment.Content}
          </p>
          
          
        
    
        </div>
      ))}
       
      {contributorAccess&&<form onSubmit={addComment}>
    
        <div className='newCommentContainer'>
          
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            maxLength={4000}
            onChange={(event) => setNewComment(event.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Add comment</button>
        </div>
      </form>}
    </div>
  );
}

