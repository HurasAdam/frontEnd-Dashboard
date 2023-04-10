
export const  settLocalStorage =(updatedUser)=>{

for (const [key, value] of Object.entries(updatedUser)) {
    localStorage.setItem(key, value)
  }}
  