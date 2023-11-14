export const handleDeleteProject = (id, mutation, confirmationString) => {
  if (!confirmationString || confirmationString !== "delete") {
    alert("Please insert delete to confirm ");
  } else {
    mutation.mutate(id);
  }
};
