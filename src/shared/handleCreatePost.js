export const handleCreatePost = (e,content,mutation,id)=>{
e.preventDefault()
    console.log(content)
    console.log(id)
mutation.mutate({id:id,content:content})


}