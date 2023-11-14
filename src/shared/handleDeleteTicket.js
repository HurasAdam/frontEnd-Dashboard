
export const handleDeleteTicket=(e,{id,mutation})=>{
e.preventDefault()

    console.log(id)

    mutation.mutate(id)

}