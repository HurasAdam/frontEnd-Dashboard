export const handleDeleteTicket = (e, { id, mutation, confirmationString }) => {
  e.preventDefault();

  if (!confirmationString || confirmationString !== "delete") {
    alert("type in delete to confirm ");
  } else if (!id) {
    alert("Invalid ticket ID.");
  }

  mutation.mutate(id);
};
