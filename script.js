const password = document.querySelector("#password");
const strength = document.querySelector("#strength");
const togglebtn = document.querySelector("#togglebtn");

let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let lowercase = "abcdefghijklmnopqrstuvwxyz"
let specialchar = "!@#$%^&*?~"
let number = "0123456789"

togglebtn.addEventListener("click", function(){

   if(password.type === "password") {
    password.type = "text"
    togglebtn.textContent = "hide password"
   } else {
    password.type = "password"
    togglebtn.textContent = "show password"
   }

})

password.addEventListener("input", function(){

    let hasupper = false;
    let haslower = false;
    let hasspecial = false;
    let hasnumber = false;
    let value = password.value;
    for (let char of value) {

        if (uppercase.includes(char) ) {
            hasupper = true
            
        }

        if (lowercase.includes(char)) {
            haslower = true
            
        }

        if (specialchar.includes(char))  {
            hasspecial = true
            
        }

        if (number.includes(char)) {
            hasnumber = true
            
        }
    }

    let score = 0;

    if (hasupper) score++;
    if (haslower) score++;
    if (hasnumber) score++;
    if (hasspecial) score++;

    strength.classList.remove("weak", "medium", "strong");
    
    if (value.length === 0) {
        strength.textContent = ("Enter a password")
        strength.classList.remove("weak", "medium", "strong")
    }
 
    else if (value.length >= 8 && score === 4) {
        strength.textContent = ("strong password")
        strength.classList.add("strong")
    }

    else if (value.length >= 8 && score >= 2){
        strength.textContent = ("medium password")
        strength.classList.add("medium")
    } 

    else {
        strength.textContent = "weak password"
        strength.classList.add("weak")
    }


}) 