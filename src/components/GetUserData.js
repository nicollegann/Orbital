import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"

export default function GetUserData() {
  const { currentUser } = useAuth()
  const [data, setData] = useState() 
  const [error, setError] = useState("")
  
  //to retrieve profile info from firestore
  const getUser = async () => {
    try {
      setError("");
      const documentSnapshot = await db
        .collection("UserProfile")
        .doc(currentUser.email)
        .get();

      const userData = documentSnapshot.data()
      setData(userData)
    } catch {
      setError("Failed to retrieve profile.")
    }
  };

  // Get user on mount
  useEffect(() => {
    getUser()
  });

  return [data, error]
}