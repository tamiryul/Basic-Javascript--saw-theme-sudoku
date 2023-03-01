function checkPassword () {
    let pswd2=`1234`;
    let pswd1=document.getElementById("pswd1").value;
    let user2=`abcd`;
    let user1=document.getElementById(`user1`).value
    if(pswd1 == pswd2 && user1 == user2){
        window.location.href = "./../html/index.html";
    }
    else {
        window.alert("Invalid Username or password");
    }
}