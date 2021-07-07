const nameField = document.querySelector("#name");
const jobRoleField = document.getElementById("other-job-role");
const jobDropDown = document.getElementById("title");
const jobOptionTag = jobDropDown.getElementsByTagName("OPTION");
const designDropDown = document.getElementById("design");
const designOptionTag = designDropDown.getElementsByTagName("OPTION");
const shirtColorsDropDown = document.getElementById("shirt-colors");
const shirtColorOptionTag = shirtColorsDropDown.getElementsByTagName("OPTION");
const dropDownOptions = document.querySelectorAll("#color option");

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


console.log(dropDownOptions);

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

const registerActivities = document.querySelector("#activities");


let total = 0;
registerActivities.addEventListener("change", e =>{
    const allActivities = document.querySelectorAll("#activities input");
    const activitiesCost = document.querySelector("#activities-cost");
    if(e.target.checked === true){
        total += parseInt(e.target.dataset.cost);
    }else{
        total -= parseInt(e.target.dataset.cost);
    }
    total.toString();
    activitiesCost.textContent = `Total: $${total}`;
});