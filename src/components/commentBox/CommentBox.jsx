import React, { useState, useEffect } from 'react';
import "../commentBox/commentBox.css"
export const CommentBox=()=> {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments');
      const comments = await response.json();
      setComments(comments);
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, comment }),
      });
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setName('');
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comment-box">
      <h2>Comments</h2>
      <form onSubmit={addComment}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Add comment</button>
        </div>
      </form>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <h4>{comment.name}</h4>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}

