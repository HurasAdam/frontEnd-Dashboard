export const handleCreatePost = (e,content,mutation,id)=>{
e.preventDefault()


console.log(content)

const formData = new FormData();
formData.append("file", content.file);
formData.append("textContent",content.textContent)



mutation.mutate({id,content:formData})


}