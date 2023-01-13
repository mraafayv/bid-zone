import React, { useState, useEffect } from "react";
import Categories from "../../Components/Categories/Categories";
import PopularProducts from "../../Components/PopularProducts/PopularProducts";
import HomeContent from "../../Components/HomeContent/HomeContent";
import Navbar from "../../Components/Navbar/Navbar";
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
