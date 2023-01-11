import React, { useState, useEffect } from "react";
import Categories from "../../components/Categories/Categories";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import HomeContent from "../../components/HomeContent/HomeContent";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../hooks/useAuth";

export default function Home() {
 

  // useEffect(() => {
  //   // let users = localStorage.getItem("user");
  //   // var localAuth = JSON.parse(users);
  //   if (localUser) {
  //     console.log("localUser", localUser);
  //     setGetUser(localUser);
  //   }
  // }, [localUser]);
  return (
    <div className="homepage">
     
        <>
          <Navbar />
          <HomeContent />
          <Categories />
          <PopularProducts />
        </>
      
     
    </div>
  );
}
