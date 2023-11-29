export const handleUpdatePassword= (e,updateForm,mutation)=>{
e.preventDefault()

console.log(updateForm)

console.log(mutation)

mutation.mutate(updateForm)

}