
export const handleUpdateTicket = ({id,mutation,callback})=>{


console.log(id)
console.log(mutation)
mutation.mutate(id)

}