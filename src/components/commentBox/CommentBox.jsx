import React, { useState, useEffect, useContext } from "react";
import "../commentBox/commentBox.css";
import { AuthContext } from "../../contexts/AuthContext";
export const CommentBox = ({
  posts,
  addComment,
  setNewComment,
  fullAccess,
  contributorAccess,
}) => {
  const { user } = useContext(AuthContext);
  const [commentsData, setCommentsData] = useState();
  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    if (posts) {
      const initialPostState = posts.map((post) => {
        return { ...post, contentEditable: false, ButtonText: "Edit" };
      });
      setCommentsData(initialPostState);
    }
  }, [posts]);

  const handleEditCommentText = (el) => {
    setEditedComment(el);
  };

  const handleEditComment = (id) => {
    const index = commentsData.findIndex((comment) => comment.id === id);
    if (index === -1) {
      console.log("comment not found");
      return;
    }
    const updatedComment = {
      ...commentsData[index],
      contentEditable: !commentsData[index].contentEditable,
      ButtonText: "Save",
    };
    const updatedComments = [...commentsData];
    updatedComments[index] = updatedComment;
    console.log(updatedComments);

    setCommentsData(updatedComments);
  };

  return (
    <div className="comment-box">
      {commentsData &&
        commentsData.map((comment) => (
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
                {comment.CreatedBy.id === user.userId ? (
                  <button onClick={() => handleEditComment(comment.id)}>
                    {comment.ButtonText}
                  </button>
                ) : null}
              </div>
              <div>{comment.CreatedAt}</div>
            </div>

            <p
              defaultValue={comment.Content}
              onInput={(e) => {
                e.preventDefault();
                handleEditCommentText(e.target.innerHTML);
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
