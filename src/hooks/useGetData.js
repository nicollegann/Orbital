  
import { useEffect, useState} from "react";
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import { today } from "../components/Schedule/Date"

//Get tutee names (for dropdown box)
export const useGetTutee = () => {
  const [tutee, setTutee] = useState([]);
  useEffect(() => {
    db.collection("TuteeProfile")
      .doc("NameList")
      .get()
      .then((doc) => {
        const arr = doc.data().names
        let newArr = arr.map((name, index) => {
          return { key: index+1, value: name }
        })
        newArr.unshift({ key: 0, value: "ALL" })
        setTutee(newArr)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);
  return [tutee];
};

//Get tutee names (for TuteeAvailability page)
export const useGetTuteeNames = () => {
  const [tutee, setTutee] = useState([]);
  useEffect(() => {
    db.collection("TuteeProfile")
      .doc("NameList")
      .get()
      .then((doc) => {
        setTutee(doc.data().names);
      })
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

//Get tutor names (for dropdown options)
export const useGetTutor = () => {
  const [tutor, setTutor] = useState()

  useEffect(() => {
    db.collection("TutorProfile")
      .get()
      .then((querySnapShot) => {
        let arr = []
        querySnapShot.forEach((doc) => 
          arr.push(doc.data().name)
          )
        setTutor(arr)  
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db])
  return tutor
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

//Get lesson slots options set by admin
export const useGetLessonOptions = (week) => {
  const [data, setData] = useState()

  useEffect(() => {
    db.collection("Schedule")
      .doc("LessonOptions")
      .collection(week)
      .where("date", ">=", today)
      .get()
      .then((querySnapShot) => {
        let arr = []
        querySnapShot.forEach((doc) => 
          arr.push({date: doc.data().date, startTime: doc.data().startTime, endTime: doc.data().endTime})
        )
        setData(arr)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [db])
  return data
}

//Get lesson slots selected by tutee
export const useGetSelectedSlots = (tutee, dateRange) => {
  const [data, setData] = useState()

  useEffect(() => {
    db.collection("Schedule")
      .doc("TuteeAvailability")
      .collection(dateRange)
      .doc(tutee)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setData(doc.data().selectedSlots)
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [db])
  return data
}

//Get lesson slot scheduled by tutor
export const useGetLessonDetails = (date) => {
  const [data, setData] = useState([])

  useEffect(() => {
    //if (user === "Admin") {
      db.collection("Schedule")
        .doc("ScheduledLesson")
        .collection(date)
        .where("date", ">=", today)
        .get()
        .then((querySnapShot) => {
          let arr = []
          querySnapShot.forEach((doc) => 
            arr.push(doc.data())
          )
          setData(arr)
        })
    // } else {
    //   db.collection("Schedule") 
    //     .doc("ScheduledLesson")
    //     .collection(date)
    //     .where("tutor", "==", user)
    //     .get() 
    //     .then((querySnapShot) => {
    //       let arr = []
    //       querySnapShot.forEach((doc) => 
    //         arr.push(doc.data())
    //       )
    //       setData(arr)
    //     })
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [db])

  return data
}

//Get verification code for tutee to submit availability
export const useGetTuteeCode = () => {
  const [code, setCode] = useState("")

  db.collection("Schedule")
    .doc("VerificationCode")
    .get()
    .then((doc) => { 
      setCode(doc.data().code)
    })
  
  return code
}
