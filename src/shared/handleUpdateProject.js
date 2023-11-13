import { handleArrayCompare } from "./handleArrayCompare";
import { handlePopup } from "./handlePopup";
export const handleUpdateProject = (
  e,
  { data, title, description, contributors, leader },
  mutation,
  id,popupSetter
) => {
  e.preventDefault();
  const updateObj = {};
  const {
    projectId,
    title: dataTitle,
    description: dataDescription,
    contributors: dataContributors,
    projectLeader: dataLeader,
  } = data;

  const isContributorListChanged = !handleArrayCompare(
    dataContributors,
    contributors
  );
  const isLeaderChanged = !handleArrayCompare([dataLeader], [leader]);
  console.log(isLeaderChanged);

  if (
    title === dataTitle &&
    description === dataDescription &&
    !isContributorListChanged &&
    !isLeaderChanged
  ) {
  const errorMsgObj = {message:"No changes have been made. Please make changes before clicking the SAVE button",success:true}
    handlePopup(popupSetter,errorMsgObj)

  } else {
    if (title !== dataTitle) {
      updateObj.title = title;
    }
    if (description !== dataDescription) {
      updateObj.description = description;
    }
    if (isContributorListChanged) {
      updateObj.contributors = contributors;
    }
    if (isLeaderChanged) {
      updateObj.leader = leader;
    }

    console.log(updateObj);
    mutation.mutate({ id, update: updateObj });
  }
};
