import React, {useState} from "react";
import {storage} from "../firebase";

const ImageUpload = () => {
    const [image,setImage]= useState(null);
    const [url,setUrl]= useState("");

    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
            console.log(error);
            },
            ()=> {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    setUrl(url);
                });
            }

        );
    }
    console.log("image:",image);

    return(
        <div className="filehandle">
            <br/>
            <br/>
             <h3>ADD IMAGE</h3>
             <input type="file" onChange={handleChange} />
             <button onClick={handleUpload}>Upload</button>
             <br/>
            {url}
        </div>
    );
};
export default ImageUpload;