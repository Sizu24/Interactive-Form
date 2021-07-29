const nameField = document.querySelector("#name");
const jobRoleField = document.getElementById("other-job-role");
const jobDropDown = document.getElementById("title");
const jobOptionTag = jobDropDown.getElementsByTagName("OPTION");
const designDropDown = document.getElementById("design");
const designOptionTag = designDropDown.getElementsByTagName("OPTION");
const shirtColorsDropDown = document.getElementById("shirt-colors");
const shirtColorOptionTag = shirtColorsDropDown.getElementsByTagName("OPTION");
const dropDownOptions = document.querySelectorAll("#color option");
const submitButton = document.querySelector("form");
const activities = document.querySelector("#activities-box");
let activitiesTotal = 0;

nameField.focus();
console.log(designDropDown[1]);

jobRoleField.style.display = "none";
shirtColorsDropDown.style.display = "none";

jobDropDown.addEventListener("change", ()=>{
    for(let i = 1; i < jobOptionTag.length; i++){
        if(jobOptionTag[i].value === "other"){
            if(jobOptionTag[i].selected === true){
                jobRoleField.style.display = "block";
                console.log("true");
            }else{
                jobRoleField.style.display = "none";
                console.log("false");
            }
        }
    }    
});

designDropDown.addEventListener("change", e =>{
    const targetValue = e.target.value;

    for(let i = 1; i < designDropDown.length; i++){
        if(designDropDown[i].value === targetValue){
            if(designDropDown[i].selected === true){
                shirtColorsDropDown.style.display = "block";
                console.log("true");
            }
        }else if(designDropDown[i].value === "heart js"){
            if(designDropDown[i].selected === true){
                shirtColorsDropDown.style.display = "block";
                console.log("true");
            }
        }else{
            shirtColorsDropDown.style.display = "none";
        }
    }    
});

designDropDown.addEventListener("change", e =>{

for(let i = 0; i < dropDownOptions.length; i++){
    dropDownOptions[i].style.display = "none";
    if(dropDownOptions[i].dataset.theme === e.target.value){
        dropDownOptions[i].style.display = "block";
    }else{
        dropDownOptions[i].style.display = "none";
    }
}
});


// Focused checkbox highlighted for better accessibility
const registerActivities = document.querySelector("#activities");
const checkbox = document.querySelectorAll("#activities input[type='checkbox']");

for(let i = 0; i < checkbox.length; i++){
    checkbox[i].onfocus = ()=>{
        checkbox[i].parentNode.classList.add("focus");
    }
    checkbox[i].onblur = ()=>{
        checkbox[i].parentNode.classList.remove("focus");
    }
}

let total = 0;
registerActivities.addEventListener("change", e =>{
    const activitiesCost = document.querySelector("#activities-cost");

    if(e.target.checked === true){
        total += parseInt(e.target.dataset.cost);
        e.target.checked
    }else{
        total -= parseInt(e.target.dataset.cost);
    }
    total.toString();
    activitiesCost.textContent = `Total: $${total}`;
});

const paymentDropDown = document.querySelector("#payment");
const paymentSelector = document.querySelectorAll("#payment option");

paymentSelector[1].selected = true;

const creditCard = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");

// hide all payment selctors
paypal.style.display = "none";
bitcoin.style.display = "none";

// event listener change on dropdown
paymentDropDown.addEventListener("change", e =>{
    for(let i = 0; i < paymentSelector.length; i++){
        if(e.target.value === "credit-card"){
            creditCard.style.display = "block";
            paypal.style.display = "none";
            bitcoin.style.display = "none";
        }else if(e.target.value === "paypal"){
            paypal.style.display = "block";
            creditCard.style.display = "none";
            bitcoin.style.display = "none";
        }else{
            bitcoin.style.display = "block";
            paypal.style.display = "none";
            creditCard.style.display = "none";
        }
    }
});

// Check if activity checkboxes conflict with schedule times
registerActivities.addEventListener("change", e =>{

    for(let i = 0; i < checkbox.length; i++){

        if(e.target.checked === true){
            if(checkbox[i].disabled === false && checkbox[i] !== e.target){
                if(checkbox[i].parentElement.children[2].textContent === e.target.parentElement.children[2].textContent){
                    checkbox[i].disabled = true;
                }
            }
        }

        if(e.target.checked === false){
            if(checkbox[i].disabled === true && checkbox[i] !== e.target){
                if(checkbox[i].parentElement.children[2].textContent === e.target.parentElement.children[2].textContent){
                    checkbox[i].disabled = false;
                }
            }
        }

    }
});

const validationPass = element =>{
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.style.display = "none";
}
const validationFail = element =>{
    element.parentElement.classList.add("not-valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.style.display = "block";
}

const nameValidator = ()=>{
    const nameInputBox = document.querySelector("#name");
        let nameValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]+ ?$/.test(nameInputBox.value);
        console.log(`Name validator evaluates to be ${nameValid}`);
        if(nameValid === true){
            validationPass(nameInputBox);
        }else{
            validationFail(nameInputBox);
        }
    return nameValid;
}

const emailValidator = ()=>{
    const email = document.querySelector("#email");
    const emailIsValid = /^[^@]+@+[^@]+\.(com|net|org)+\s*$/i.test(email.value);
    console.log(`Email validator evaluates to be ${emailIsValid}`);
    if(emailIsValid === true){
        validationPass(email);
    }else{
        validationFail(email);
    }
    return emailIsValid;
}
activities.addEventListener("change", e =>{
    if(e.target.checked){
        activitiesTotal++;
    }else{
        activitiesTotal--;
    }
    console.log(activitiesTotal);
});

const checkboxValidator = ()=>{
    const isBoxChecked = activitiesTotal > 0;
    console.log(`Box checked evaluates to be ${isBoxChecked}`);
    if(isBoxChecked > 0){
        validationPass(activities);
    }else{
        validationFail(activities);
    }
    return isBoxChecked;
}
const cardNumberValidator = ()=>{
    const creditCardNumber = document.querySelector("#cc-num");
    const validNumber = /^\d{13,16}\s*$/.test(creditCardNumber.value); 
    console.log(`Card number is ${validNumber}`);
    if(validNumber === true){
        validationPass(creditCardNumber);
    }else{
        validationFail(creditCardNumber);
    }
    return validNumber;
}
const zipValidator = ()=>{
    const zipcode = document.querySelector("#zip");
    const validZip = /^\d{5}\s*$/.test(zipcode.value);
    console.log(`Zip code is ${validZip}`);
    if(validZip === true){
        validationPass(zipcode);
    }else{
        validationFail(zipcode);
    }
    return validZip;
}
const securityCodeValidator = ()=>{
    const cvv = document.querySelector("#cvv");
    const validSecurityCode = /^\d{3,4}\s*$/.test(cvv.value);
    console.log(`The security code validator evaluates to be ${validSecurityCode}`);
    if(validSecurityCode === true){
        validationPass(cvv);
    }else{
        validationFail(cvv);
    }
    return validSecurityCode;
}

submitButton.addEventListener("submit", e =>{
    e.preventDefault();
    nameValidator();
    emailValidator();
    checkboxValidator();
    if(paymentDropDown.value === "credit-card"){
        cardNumberValidator();
        zipValidator();
        securityCodeValidator();
    }
});

// use prevent default if error occurs
