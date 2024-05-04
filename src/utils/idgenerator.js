function generateUniqueId() {
    const timestamp = new Date().getTime();
  
    const randomNumber = Math.floor(Math.random() * 10000);  
    const uniqueId = timestamp.toString() + randomNumber.toString();
  
    return uniqueId;
  }
  
  export default generateUniqueId
//this is id generator function
  