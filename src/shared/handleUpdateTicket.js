import { handlePopup } from "./handlePopup";


export const handleUpdateTicket = ({ id, mutation, formData }, responseData, setShowMsgPopup) => {
    const { title, priority, status, description } = formData;
  
    const {
      title: responseDataTitle,
      priority: responseDataPriority,
      status: responseDataStatus,
      description: responseDataDescription,
    } = responseData;
  
    const updates = {};
  
    if (title !== responseDataTitle) {
      updates.title = title;
    }
  
    if (priority !== responseDataPriority) {
      updates.priority = priority;
    }
  
    if (status !== responseDataStatus) {
      updates.status = status;
    }
  
    if (description !== responseDataDescription) {
      updates.description = description;
    }
  
console.log(updates)

    if (Object.keys(updates).length === 0) {
      const errorObj = { message: "No changes were made. Make some changes to update the data.", success: false };
      handlePopup(setShowMsgPopup, errorObj);
    } else if (!title || !priority || !status || !description) {
      const errorObj = { message: "All fields must be filled in", success: false };
      handlePopup(setShowMsgPopup, errorObj);
    } else {

      mutation.mutate({id,content:updates});
      

    }
  };