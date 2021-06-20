import { useEffect, useState} from "react";
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"

//Get tutee names
export const useGetTutee = () => {
  const [tutee, setTutee] = useState([]);
  useEffect(() => {
    db.collection("TuteeProfile")
      .get()
      .then((querySnapshot) => {
        let arr = [{ value: "ALLTUTEES", name: "ALL"}];
        querySnapshot.docs.map((doc) =>
          arr.push({ value: doc.id, name: doc.id })
        );
        setTutee(arr);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);
  return [tutee];
};

//Get 'name' field of current user
export const useGetCurrUserName = () => {
  const { currentUser, getEmail } = useAuth()
  const [currName, setCurrName] = useState("")
  useEffect(() => {
    const role = currentUser.email
    const collectionName = (role !== "toinfinityandbeyond.orbital@gmail.com") ? "TutorProfile" : "AdminProfile"
    
    db.collection(collectionName)
    .doc(getEmail())
    .get()
    .then((doc) => {
      if (doc.exists) {
        setCurrName(doc.data().name)
      }
    })
  })
  return currName
}

//Get current user profile
export const useGetProfile = () => {
  const { currentUser } = useAuth()
  const [data, setData] = useState() 
  
  useEffect(() => {
    const role = currentUser.email
    const collectionName = (role !== "toinfinityandbeyond.orbital@gmail.com") ? "TutorProfile" : "AdminProfile"

    db.collection(collectionName)
      .doc(currentUser.email)
      .get()
      .then((doc) => {
        const userData = doc.data()
        setData(userData)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db])
  return data
}


//Get current tutee profile
export const useTuteeGetProfile = (name) => {
  const [data, setData] = useState() 
  
  useEffect(() => {
    db.collection("TuteeProfile")
      .doc(name)
      .get()
      .then((doc) => {
        const userData = doc.data()
        setData(userData)
      })
  }, [db])
  return data
}
