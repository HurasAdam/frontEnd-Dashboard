
export const handleEditPost = (id,content,mutation)=>{
console.log(id)
mutation.mutate({id,content})

}