import { useState } from "react";
import { db } from "../firebase/config";
import { doc, addDoc, collection, Timestamp } from "firebase/firestore";

export const useFireStore = (collectionData) => {
  //collection ref
  const dbRef = collection(db, collectionData);

  // add a document
  const addDocument = async (doc) => {
    try {
        // const createdAt = Timestamp.fromDate(Date.now())
      const addedDocumnet = await addDoc(dbRef, doc);
    } catch (err) {
      console.log(err);
    }
  };
  return { addDocument };
};
