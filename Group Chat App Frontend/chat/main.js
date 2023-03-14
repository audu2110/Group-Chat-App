const myForm = document.querySelector('#my-form');
const messageInput=document.querySelector('#message');
const msg_send=document.querySelector('#user-send')
const chats=document.querySelector('.chats')
const users_list=document.querySelector('.users-list')
const users_count=document.querySelector('.users-count')
myForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();
    var message=messageInput.value

    let obj={
        message
    };
    console.log(message);
    console.log(obj);
    const token  = localStorage.getItem('token')
    axios.post("http://localhost:5000/message/sendmsg",obj,  { headers: {"Authorization" : token} })
    .then((response)=>{
      console.log(response)
      showNewUserOnScreen(response.data.newUserDetail)  
    })
    .catch((err)=>{
      document.body.innerHTML=document.body.innerHTML+"<h4>Something went wrong</h4>"
      console.log(err);
    })
}


const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

window.addEventListener("DOMContentLoaded", () =>{
    // const token  = localStorage.getItem('token')
    // const decodeToken = parseJwt(token)
    // console.log("decode tokenjhhvhjshshbshb",decodeToken.userId)
    // const uid=decodeToken.userId;
    // showAlltheUsers()
    // setInterval(axios.get("http://localhost:5000/message/getmessages", { headers: {"Authorization" : token} })
    // .then((response)=>{
    //   console.log("all the data",response.data);
    //   // console.log("all the data in database",response.data.allMessages.length);
    //   // console.log("all the data in database",response.data.allMessages[0].Username);
      
    //   for(var i=0;i<response.data.allMessages.length;i++){
    //     if(uid==response.data.allMessages[i].userId){
    //       showNewUserOnScreen(response.data.allMessages[i],'outgoing');
    //     }
    //     else{
    //       showNewUserOnScreen(response.data.allMessages[i],'incoming');
    //     }
        
    //   }
    // })
    // .catch((err)=>{
    //   console.log(err);
    // }), 1000)
    
    
    const lsdata = JSON.parse(localStorage.getItem("messages"));

  let lastid;
  if (lsdata == null) {
    lastid = 0;
  } else {
    lastid = lsdata[lsdata.length - 1].msgid;
  }
  let mergemsgs = [];
  const token  = localStorage.getItem('token')
  axios
    .get(`http://localhost:5000/message/getmessages?id=${lastid}`, { headers: {"Authorization" : token} })
    .then((messages) => {
      if (messages.data.length > 0) {
        if (lsdata) {
          mergemsgs = lsdata.concat(messages.data);
        } else {
          mergemsgs = messages.data;
        }
        if (mergemsgs.lenght > 1000) {
          let remove = mergemsgs.length - 1000;
          for (let i = 0; i < remove; i++) {
            mergemsgs.shift();
          }
        }
      } else {
        mergemsgs = JSON.parse(localStorage.getItem("messages"));
      }
      localStorage.setItem("messages", JSON.stringify(mergemsgs));

      const msgcontainer = document.getElementById("msgs");
      msgcontainer.innerHTML = "";
      msgcontainer.innerHTML = "<h1>Messages:</h1>";

      for (let i = 0; i < mergemsgs.length; i++) {
        const msgdiv = document.createElement("div");
        msgdiv.classList.add("msgdiv");
        const name = document.createElement("div");
        name.innerHTML = `<p>${mergemsgs[i].Username}:</p>`;
        msgdiv.appendChild(name);
        const msg = document.createElement("div");
        msg.innerHTML = `<p>${mergemsgs[i].message}</p>`;
        msgdiv.appendChild(msg);
        msgcontainer.appendChild(msgdiv);
      }
    });
  
  })
  
  
  function showNewUserOnScreen(user,status){
  
    // document.getElementById('messagge').value='';
  
    // if(localStorage.getItem(user.email) !== null){
    //   removeUserFromScreen(email);
    // }
    let div=document.createElement('div');
    div.classList.add('message',status)
    let content=`<h5> ${user.Username}</h5>
                    <p>${user.message}</p>`
    div.innerHTML=content;
    chats.appendChild(div);
    chats.scrollTop=chats.scrollHeight;
  }
  






  function showAlltheUsers(){
    users_list.innerHTML=""
    
    const token  = localStorage.getItem('token')
    axios.get("http://localhost:5000/message/getusers", { headers: {"Authorization" : token} })
    .then((response)=>{
      // console.log("all the users",response.data.allUsers[0].name)
      console.log(response.data.allUsers.length);
      // console.log("all the data in database",response.data.allMessages.length);
      // console.log("all the data in database",response.data.allMessages[0].Username);
      
      // for(var i=0;i<response.data.allMessages.length;i++){
      //   showNewUserOnScreen(response.data.allMessages[i],'outgoing');
      // }
      for(var i=0;i<response.data.allUsers.length;i++){
        let p=document.createElement('p')
        p.innerText=response.data.allUsers[i].name
        users_list.appendChild(p)
      }
      users_count.innerHTML=response.data.allUsers.length
    })
    .catch((err)=>{
      console.log(err);
    })
  }















//   function editUserDetails(uid, name,email,phonenumber){
//     document.getElementById('email').value = email;
//     document.getElementById('name').value = name;
//     document.getElementById('phonenumber').value=phonenumber;
//     deleteUser(uid)
//   }
  
//   function deleteUser(uid){
//     axios.delete(`http://localhost:5000/admin/delete-user/${uid}`)
//     .then((response)=>{  
//       console.log(response);  
//       removeUserFromScreen(uid)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
    
//   }
  
//   function removeUserFromScreen(uid){
//     const parentNode = document.getElementById('listOfUsers');
//     const childNodeToBeDeleted = document.getElementById(uid);
//     if(childNodeToBeDeleted){
//       parentNode.removeChild(childNodeToBeDeleted);
//     }
    
//   }
