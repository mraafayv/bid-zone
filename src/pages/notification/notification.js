import './Notification.css'
import Navbar from "../../Components/Navbar/Navbar";
import NotificationCard from '../../Components/NotificationCard/NotificationCard'

import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  
} from "firebase/firestore";
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';


export default function Notification() {

  const [notifications, setNotifications] = useState(null)

const { localUser } = useAuth();

useEffect(()=> {
  
  async function getNotifications(){
    const q = query(collection(db, "userInformation"), where("uid", "==", localUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    setNotifications(doc.data().notification)
  // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data().notification);
  })
  
};

getNotifications().catch(err => console.log(err.message))

}, [localUser])

  return (
    <>
      <Navbar />
      <h1 className="page-title">Notifications</h1>
      <div className="notifications-page">
        <div className="notifications-container">
          <h3>Recent Activity</h3>
          {notifications ? notifications.map(notification => {
            return <NotificationCard data={notification} key={notification}/>
          }): <div className='no-activity-text'>No Recent Activity!</div>}
        </div>
      </div>
    </>
  );
}
