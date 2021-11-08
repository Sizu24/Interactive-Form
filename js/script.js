const jobRoleField = document.getElementById("other-job-role");
const jobDropDown = document.getElementById("title");
const jobOptionTag = jobDropDown.getElementsByTagName("OPTION");
const designDropDown = document.getElementById("design");
const designOptionTag = designDropDown.getElementsByTagName("OPTION");
const shirtColorsDropDown = document.getElementById("shirt-colors");
const shirtColorOptionTag = shirtColorsDropDown.getElementsByTagName("OPTION");
const submitButton = document.querySelector("form");
const activities = document.querySelector("#activities-box");
const creditCardNumber = document.querySelector("#cc-num");
const zipcode = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
let activitiesTotal = 0;

// Focus on Name field when page loads
document.querySelector("#name").focus();

// Hide input field for "other job" 
jobRoleField.style.display = "none";

// Hide input field for shirt style
shirtColorsDropDown.style.display = "none";

/* 
    Event listener that checks if "other" is selected in job section
    If "other" is selected, then text field will display for user to input job 
 */
jobDropDown.addEventListener("change", ()=>{
    for(let i = 1; i < jobOptionTag.length; i++){
        if(jobOptionTag[i].value === "other"){
            if(jobOptionTag[i].selected === true){
                jobRoleField.style.display = "block";
            }else{
                jobRoleField.style.display = "none";
            }
        }
    }    
});

/*
    Checks drop down design for shirts.
    If design selected is "JS Puns", will display only JS Puns designs.
    If design selected is "I heart JS", will display only I heart JS designs.
*/
designDropDown.addEventListener("change", e =>{
    const dropDownOptions = document.querySelectorAll("#color option");
    // Reset drop down option selection
    dropDownOptions[0].selected = true;
    // loop through dropdown options
    for(let i = 0; i < dropDownOptions.length; i++){
        dropDownOptions[i].style.display = "none";
        if(dropDownOptions[i].dataset.theme === e.target.value){
            shirtColorsDropDown.style.display = "block";
            dropDownOptions[i].style.display = "block";
        }else{
            dropDownOptions[i].style.display = "none";
        }
    }
});

// Focused checkbox highlighted for better accessibility
const registerActivities = document.querySelector("#activities");
const checkbox = document.querySelectorAll("#activities input[type='checkbox']");

// loop through checkboxes to see which is focused and add highlight on focused checkbox
for(let i = 0; i < checkbox.length; i++){
    checkbox[i].onfocus = ()=>{
        checkbox[i].parentNode.classList.add("focus");
    };
    checkbox[i].onblur = ()=>{
        checkbox[i].parentNode.classList.remove("focus");
    };
}

/* 
    Check to see if activities are selected, and add up the total cost for all selected activities
*/
let total = 0;
registerActivities.addEventListener("change", e =>{
    const activitiesCost = document.querySelector("#activities-cost");

    if(e.target.checked === true){
        total += parseInt(e.target.dataset.cost);
        e.target.checked;
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

// event listener to see which payment method is selected, and displays only selected method
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

// Check if activity checkboxes conflict with schedule times, and disable conflicting fimes
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

// Functions to check if validation passes or fails
const validationPass = element =>{
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.style.display = "none";
};
const validationFail = element =>{
    element.parentElement.classList.add("not-valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.style.display = "block";
};

// Validators
const nameValidator = ()=>{
    const nameInputBox = document.querySelector("#name");
        let nameValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]+ ?$/.test(nameInputBox.value);
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
});

const checkboxValidator = ()=>{
    const isBoxChecked = activitiesTotal > 0;
    if(isBoxChecked > 0){
        validationPass(activities);
    }else{
        validationFail(activities);
    }
    return isBoxChecked;
}

// Error messages
const requiredField = "This field is required";
const errorSpan = document.createElement("SPAN");
errorSpan.innerHTML = requiredField;

// Create display for error message, and hide by default until error is made
const charErrorMessage = creditCardNumber.parentElement;
charErrorMessage.insertBefore(errorSpan, charErrorMessage.lastElementChild);
errorSpan.style.display = "none";

/* 
    Event listeners to check on keyup if indput data in fields are valid
*/

// For Credit Card field
const cardNumberValidator = ()=>{
    // check if number is between 13-16 digits
    const validNumber = /^\d{13,16}\s*$/.test(creditCardNumber.value); 

    if(creditCardNumber.value === ""){

        // add inner html to cc field for last child
        // add id to span
        // creditCardNumber.parentElement.lastElementChild.setAttribute("id, errorMessage");
        errorSpan.style.display = "block";
        creditCardNumber.parentElement.classList.add("not-valid");
        creditCardNumber.parentElement.classList.remove("valid");
        creditCardNumber.parentElement.lastElementChild.style.display = "none";
        return false;
    }else if(validNumber === true){
            validationPass(creditCardNumber);
            errorSpan.style.display = "none";
            return true;
    }else{
        validationFail(creditCardNumber);  
        errorSpan.style.display = "none";    
        console.log("VALUE 3");
        return false;
    }
    return validNumber;
}

creditCardNumber.addEventListener("keyup", ()=>{
    cardNumberValidator();
});

// For zip code field
const zipValidator = ()=>{
    const validZip = /^\d{5}\s*$/.test(zipcode.value);
    if(validZip === true){
        validationPass(zipcode);
    }else{
        validationFail(zipcode);
    }
    return validZip;
}
zipcode.addEventListener("keyup", ()=>{
    zipValidator();
});

// For security code field
const securityCodeValidator = ()=>{
    const validSecurityCode = /^\d{3,4}\s*$/.test(cvv.value);
    if(validSecurityCode === true){
        validationPass(cvv);
    }else{
        validationFail(cvv);
    }
    return validSecurityCode;
}

cvv.addEventListener("keyup", ()=>{
    securityCodeValidator();
});


/*
    Event listener on submit button runs validators to check if name, email, and checkbox fields are valid
    Checks to see if credit card is selected, and runs validators for cc related fields
    Submits if all valid, otherwise shows error message for invalid inputs instead of submitting form
*/
submitButton.addEventListener("submit", e =>{
    const nameValid = nameValidator();
    const emailValid = emailValidator();
    const checkboxValid = checkboxValidator();
    if(paymentDropDown.value === "credit-card"){
        const nextPage = cardNumberValidator();
        zipValidator();
        securityCodeValidator();
        if(nextPage !== true){
            // use prevent default if error occurs
            e.preventDefault();
        }
    }
    if(nameValid !== true || emailValid !== true || checkboxValid !== true){
        e.preventDefault();
    }
});

// Error message for leaving form field blank 
const blankError = "Info in this field is required";



