// for Login event
document.getElementById("loginForm").addEventListener("click", function(event) {
    event.preventDefault();
    logData(); // Call the login function here
});

function logData() {
    let email = document.getElementById('login').value;
    let npassword = document.getElementById('password').value;
    
    let nlog = localStorage.getItem('uemail');
    let npass = localStorage.getItem('upass');    
    
    if (email === nlog && npassword === npass){
        alert("Login successful");
        window.location.href = 'library.html'; // Redirect to library.html if login is successful
    } 
    else {
        alert("Invalid Information");
    }
}

// for Signup event
document.getElementById("signup").addEventListener("onclick", function(event) {
    event.preventDefault();
  
  });
  
  function addData(){
    let username=document.getElementById('uemail').value;
    let password=document.getElementById('upass').value;
  
    
    
    localStorage.setItem('uemail',username);
    localStorage.setItem('upass',password);
    username=uemail;
    password=upass;
  }
