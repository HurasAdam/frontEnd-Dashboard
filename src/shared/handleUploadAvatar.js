
export const handleUploadAvatar=(e,photo)=>{

    e.preventDefault()
    const file = new FormData();
    file.append("file", photo);

    console.log(file)

}