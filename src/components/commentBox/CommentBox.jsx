import React, { useState, useEffect } from 'react';
import "../commentBox/commentBox.css"
export const CommentBox=({posts,addComment,setNewComment})=> {


 

  return (
    <div className="comment-box">
      
  
      {posts&&posts.map((comment) => (
        <div key={comment.id} className="comment">
         <img className='userImage' src={comment.CreatedBy.userAvatar} alt="" /> <h4> {comment.CreatedBy.name} {comment.CreatedAt}</h4>
          
          <p>{comment.Content}</p>
        
        
        </div>
      ))}
       
      <form onSubmit={addComment}>
    
        <div className='newCommentContainer'>
          
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            
            onChange={(event) => setNewComment(event.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Add comment</button>
        </div>
      </form>
    </div>
  );
}

