export const handleDeleteProject = (id, mutation, confirm) => {
  if (!confirm || confirm !== "delete") {
    alert("Please insert delete to confirm ");
  } else {
    mutation.mutate(id);
  }
};
