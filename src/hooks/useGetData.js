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

//Get tutee attendance/observation record (by date / name)
export const useGetRecord = (date, tutee, tutor, record) => {
  
  const [data, setData] = useState([])
  
  const retrieveData = (querySnapShot) => {
    let arr = []
    querySnapShot.forEach((doc) => 
      arr.push({ id: doc.id, 
                 value: doc.data() })
    )
    setData(arr)
  }

  useEffect(() => {
    if (tutor !== "Admin") {
      //if tutor specifies tutee name and date
      if (tutee !== "ALL" && date !== "") {
        db.collection(record)
        .doc(date)
        .collection(date)
        .where("name", "==", tutee)
        .where("tutor", "==", tutor)
        .get()
        .then((querySnapShot) => {
          retrieveData(querySnapShot)
        })
        //if tutor specifies date only
      } else if (tutee === "ALL" && date !== "") {
        db.collection(record)
        .doc(date)
        .collection(date)
        .where("tutor", "==", tutor)
        .get()
        .then((querySnapShot) => {
          retrieveData(querySnapShot)
        })
        //if tutor specifies name only
      } else if (tutee !== "ALL" && date === "") {
        db.collection("TuteeProfile")
        .doc(tutee)
        .collection(record)
        .where("tutor", "==", tutor)
        .get()
        .then((querySnapShot) => {
          retrieveData(querySnapShot)
        })
      }
    } else {
      //if admin specifies tutee name and date
      if (tutee !== "ALL" && date !== "") {
        db.collection(record)
        .doc(date)
        .collection(date)
        .where("name", "==", tutee)
        .get()
        .then((querySnapShot) => {
          retrieveData(querySnapShot)
        })
        //if admin specifies date only
      } else if (tutee === "ALL" && date !== "") {
        db.collection(record)
        .doc(date)
        .collection(date)
        .get()
        .then((querySnapShot) => {
          retrieveData(querySnapShot)
        })
        //if admin specifies name only
      } else if (tutee !== "ALL" && date === "") {
        db.collection("TuteeProfile")
        .doc(tutee)
        .collection(record)
        .get()
        .then((querySnapShot) => {
          retrieveData(querySnapShot)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db])
    
  return [data]
}

//Get tutee profile
export const useGetTuteeProfile = (name) => {
  const [data, setData] = useState() 
  
  useEffect(() => {
    db.collection("TuteeProfile")
      .doc(name)
      .get()
      .then((doc) => {
        const tuteeData = doc.data()
        setData(tuteeData)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db])
  return data
}

