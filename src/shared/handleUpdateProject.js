import { handleArrayCompare } from "./handleArrayCompare";
export const handleUpdateProject = (
  e,
  { data, title, description, contributors, leader },
  mutation,
  id
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
    alert(
      "No changes have been made. Please make changes before clicking the SAVE button"
    );
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
