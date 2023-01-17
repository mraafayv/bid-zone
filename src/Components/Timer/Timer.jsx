import "./Timer.css";
import { useEffect, useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export default function Timer({ data, checkExpiryOfTimer }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expired, setExpired] = useState(false);
  const [documentIDArray, setDocumentIDArray] = useState([]);

 
  useEffect(() => {
    async function notifyBidders() {
      let message = `${data.highestBidder.name.toUpperCase()} has won the auction for ${data.prodName} by placing a bid of Rs. ${data.currentBid}`;

      if (documentIDArray) {
        console.log("documentIDArray",documentIDArray)
        documentIDArray.forEach(async (docID) => {
          let docRef = doc(db, "userInformation", docID);

          let docSnap = await getDoc(docRef);

          if(docSnap.uid === data.highestBidder.uid){
            message = `Congratulations! you have won the auction for ${data.prodName}`
          } 
          await updateDoc(docRef, {
            notification: arrayUnion(message)
          })
        });
      }


      
    }
    

    if(expired){
      notifyBidders();
    }
  }, [expired]);

  useEffect(() => {
    // let tempArr = []
    async function getSubscribers() {
      data.subscribers.forEach((subscriber) => {
        const q = query(
          collection(db, "userInformation"),
          where("uid", "==", subscriber)
        );
        async function getSubscriberDoc() {
          const snapshot = await getDocs(q);
          snapshot.forEach((doc) => {
            console.log("doc.id",doc.id)
            // setDocumentIDArray([...documentIDArray, doc.id]);
            setDocumentIDArray(documentIDArray => documentIDArray.concat(doc.id));
            // console.log("subscriber ID", doc.id);
          });
        }
        getSubscriberDoc();
      });
    }

    getSubscribers();
    // getSubscriberDoc()
  }, [doc]);

  useEffect(() => {
    // console.log("data.duration: ",data.duration)
    var countDownDate = data.duration.seconds * 1000;

    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

      // If the count down is finished, write some text
      if (distance < 0) {
        setExpired(true);
        // checkExpiryOfTimer(distance);
        clearInterval(x);
      }
    }, 1000);
  }, []);

  return (
    <div className="timer" id="timer">
      {/* {console.log("data in timer", data)} */}
      {expired ? (
        <div className="expired">This Auction is No Longer Available</div>
      ) : (
        <div className="timer">
          <div className="timer-label">Ends In:</div>
          <h4 className="days">
            <span>{days}</span>
            <span className="days-label">DAYS</span>
          </h4>
          <span>:</span>
          <h4 className="hours">
            <span>{hours}</span>
            <span className="hours-label">HOURS</span>
          </h4>
          <span>:</span>
          <h4 className="minutes">
            <span>{minutes}</span>
            <span className="minutes-label">MINUTES</span>
          </h4>
          <span>:</span>
          <h4 className="seconds">
            <span>{seconds}</span>
            <span className="seconds-label">SECONDS</span>
          </h4>
        </div>
      )}
    </div>
  );
}
