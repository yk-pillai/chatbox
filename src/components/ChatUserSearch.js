import { collection, query, where, getDocs, updateDoc, serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ChatUserSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const {currentUser} = useContext(AuthContext);

  const searchUser = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", searchText), where("displayName", "!=", currentUser.displayName));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    if(querySnapshot.empty){
      setSearchedUser(null);
    }else{
      querySnapshot.forEach((doc) => {
        setSearchedUser(doc.data());
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") searchUser();
  };

  const handleClick = async () => {
    const combinedId = (currentUser.uid>searchedUser.uid)? currentUser.uid+searchedUser.uid:searchedUser.uid+currentUser.uid;
    const res = await getDoc(doc(db, "chats", combinedId));
    if(!res.exists()){
      await setDoc(doc(db, "chats", combinedId), {messages:[]});
      await updateDoc(doc(db, "userChats", currentUser.uid),{
        [combinedId+".userInfo"]: {
          uid: searchedUser.uid,
          displayName: searchedUser.displayName,
          photoURL: searchedUser.photoURL
        },
        [combinedId+".date"]: serverTimestamp()
      })
      await updateDoc(doc(db, "userChats", searchedUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
    setSearchText("");
    setSearchedUser(null);
  }

  return (
      <div className="search">
        <input
          type="text"
          placeholder="Search the user"
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        ></input>
        {searchedUser && (
          <div className="chat-user" onClick={handleClick}>
            <img src={searchedUser.photoURL} alt="friend"></img>
            <div className="user-info">
              <span className="user-name">{searchedUser.displayName}</span>
            </div>
          </div>
        )}
      </div>
  );
};

export default ChatUserSearch;
