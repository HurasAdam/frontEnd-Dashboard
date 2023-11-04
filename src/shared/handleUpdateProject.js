export const handleUpdateProject = (e,{data,title,description,contributors,leader},mutation) => {
    e.preventDefault();
const {projectId,title:dataTitle,description:dataDescription,contributors:dataContributors}= data 
const dataContributorList = dataContributors.map((user)=>user._id)
const stateContributorList= contributors.map((user)=>user._id)
const isArrayEqual = dataContributorList.every((id)=>stateContributorList.includes(id)&&dataContributorList.length===stateContributorList.length)

 if(title===dataTitle&&description===dataDescription&&isArrayEqual){
  alert("No changes have been made. Please make changes before clicking the SAVE button")
 }
 else{
  mutation.mutate({ projectId, title, description, contributors,leader });
 }
  };