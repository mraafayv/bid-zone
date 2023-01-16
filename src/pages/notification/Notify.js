import React, { useEffect, useState } from "react";
import { getDatabase, ref as realtimeRef, child, get } from "firebase/database";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
const Notify = () => {
  const { localUser } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [owner, setOwner] = useState([]);
  const [loserData, setLoserData] = useState([]);
  const [isLoser, setIsLoser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let fetchWinnerData = [];
    let fetchLoserData = [];

    //get Notification
    const getNotify = () => {
      const dbRef = realtimeRef(getDatabase());
      get(child(dbRef, `expireProduct`))
        .then((snapshot) => {
          snapshot.forEach(async (data) => {
            if (data.exists()) {
              getWinner();
            } else {
              console.log("No data available");
            }
          });
       
        })
        .catch((error) => {
          console.error(error);
        });
    };

    //get user if winner or bidder
    const getWinner = () => {
      const dbRef = realtimeRef(getDatabase());

      get(child(dbRef, "users"))
        .then((snapshot) => {
          snapshot.forEach((data) => {
            if (data.exists()) {
              if (
                data.val().msg.ownerID === localUser.uid ||
                data.val().msg.bidderID === localUser.uid
              ) {
                fetchWinnerData.push(data.val())
                setIsOwner(true);
              } else {
                getData(data.val());
              }
            } else {
              console.log("No data available");
            }
          });
          if (isOwner) {
            setOwner(fetchWinnerData);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    //get Data if user lose a bid
    const getData = async (data) => {
      const querySnapshot = await getDocs(collection(db, "products"));
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (userDoc) => {
          console.log("userdoc", userDoc.data());
          userDoc.data().subscribers.map((loser, index) => {
            if (loser === localUser.uid) {
              fetchLoserData.push(data);
              setIsLoser(true);
            }
          });
        });

        if (isLoser) {
          setLoserData(fetchLoserData);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    if (localUser) {
      getNotify();
    }
  }, [localUser, isOwner, isLoser]);

  return (
    <>
      {isLoading && <h3>loading.......</h3>}

      {isOwner &&
        owner.map((data, index) => (
          <div key={index}>
            <p>
              {data.msg.bidderName} win {data.msg.prodName} product
            </p>
          </div>
        ))}

      {isLoser &&
        loserData.map((data, index) => (
          <div key={index}>
            <p>
              {data.msg.bidderName} win {data.msg.prodName} product
            </p>
          </div>
        ))}
    </>
  );
};

export default Notify;
