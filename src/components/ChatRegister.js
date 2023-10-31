import addAvatar from '../images/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { useState } from 'react';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';


const ChatRegister = () => {
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    const uname = e.target[0].value
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)


        // Create the file metadata
        /** @type {any} */
        const metadata = {
          contentType: "image/jpeg",
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, uname);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log("File available at", downloadURL);
              await updateProfile(user,{
                displayName: uname,
                photoURL: downloadURL
              })
              console.log("Profile uploaded.")
              await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: uname,
                email: email,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "userChats", user.uid), {});
            });
          }
        );
        setSuccessMsg("User created.");
        navigate('/')
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrMsg(errorMessage);
      });
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Yk Chat</span>
        <span className="title">Register</span>
        {errMsg && <div className="text-red-600">{errMsg}</div>}
        {!errMsg && <div className="text-green-600">{successMsg}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" required></input>
          <input type="text" placeholder="Email" required></input>
          <input type="password" placeholder="Password" required></input>
          <input type="file" id="file" style={{ display: "none" }}></input>
          <label htmlFor="file">
            <img src={addAvatar} alt='avatar'></img>
            <span>Add avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>If you have an account. <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default ChatRegister
