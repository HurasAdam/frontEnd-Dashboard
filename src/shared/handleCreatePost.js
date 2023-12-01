export const handleCreatePost = (e, content, mutation, id) => {
  e.preventDefault();

const files= content.files

  const formData = new FormData();
  // formData.append("file", content.file);
  files.forEach((file,index)=>{
    formData.append(`file`,file)
  })
  formData.append("textContent", content.textContent);

  console.log(formData);
  mutation.mutate({ id, content: formData });
};
