
export const handleUploadAvatar=(e,photo,mutation)=>{

    e.preventDefault()
    const file = new FormData();
    file.append("file", photo);

 mutation.mutate(file)

}