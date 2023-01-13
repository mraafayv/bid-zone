import React from 'react'

const notification = () => {
  const handleBid =()=>{
    console.log("bid placed")
  }
    
  return (
   <>
    <h1>notification</h1>
    <button onClick={handleBid}>place a bid</button>
   </>
  )
}

export default notification