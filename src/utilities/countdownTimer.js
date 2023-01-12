export function countdownTimer() {
    let currentTime = new Date().getTime();
    let EndTime = new Date("6/28/2023").getTime();
    console.log(currentTime + "-" + EndTime + " = " + (EndTime - currentTime));
  
    let remSec, remMin, remHr, remDay;
  
    remSec = Math.round(((EndTime - currentTime) / 1000) % 60);
    remMin = Math.floor(((EndTime - currentTime) / (60 * 1000)) % 60);
    remHr = Math.floor(((EndTime - currentTime) / (60 * 60 * 1000)) % 24);
    remDay = Math.floor((EndTime - currentTime) / (24 * 60 * 60 * 1000) % 30);
    console.log(
      remSec + "s \n" + remMin + "m \n" + remHr + "h \n" + remDay + "d \n" 
    )

}