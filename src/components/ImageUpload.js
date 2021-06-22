import React, {useState, useEffect} from "react";
import {storage} from "../firebase";
import {CopyToClipboard} from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";



const ImageUpload = () => {
    const [image,setImage]= useState(null);
    const [url,setUrl]= useState(
        localStorage.url ? JSON.parse(localStorage.url): []
    );
    useEffect(() => {
      localStorage.setItem("url",JSON.stringify(url));
    },[url]);
    

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
    // const[isCopied,setIsCopied]=useState(false)

    // const codeSnippet =  
    //    "![]({url})";
    
        

    // const onCopyText = () =>{
        // setIsCopied(true);
        // setTimeout(()=>{
            // setIsCopied(false);
        // },1000);
    // }
    return(
        <div className="filehandle">
            <br/>
            <br/>
             <h3>ADD IMAGE</h3>
             <input type="file" onChange={handleChange} />
             <button onClick={handleUpload}>Upload</button>
             <br/>
             
             ![]({url})
             {/* <CopyToClipboard value={{url}} onCopy={onCopyText}> */}
                 {/* <span>{isCopied ? "Copied!" : <MdContentCopy/>}</span> */}
                 {/* </CopyToClipboard> */}
             
             
            </div>
    );
};

export default ImageUpload;