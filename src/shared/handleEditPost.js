import { handlePopup } from "./handlePopup";

export const handleEditPost = ({
  postId,
  newContent,
  mutation,
  postList,
  setShowMsgPopup,
}) => {


  const currentPost = postList.filter((post) => post.id === postId);
  const currentPostContent = currentPost.map((post) =>
    currentPost.length > 0 ? post.content : "")[0];

  if (currentPostContent === newContent) {
    const errorMessageObj = { message: "No changes made to the post content", success: false };
    handlePopup(setShowMsgPopup, errorMessageObj);
  } else if (!newContent) {
    const errorMessageObj = { message: "Post content cannot be empty. Please enter the content before saving", success: false };
    handlePopup(setShowMsgPopup, errorMessageObj);
  } else {
    mutation.mutate({ id: postId, content: newContent });
  }
};
