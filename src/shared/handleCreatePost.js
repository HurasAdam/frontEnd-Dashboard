export const handleCreatePost = (e,content,mutation,id)=>{
e.preventDefault()


console.log(content)

const file = new FormData();
file.append("file", content.file);



const modifiedContent = {
    ...content,
    file: file,
  };
  console.log(modifiedContent)

mutation.mutate({id,content:modifiedContent})


}