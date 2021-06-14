const nameField = document.querySelector("#name");
const jobRoleField = document.getElementById("other-job-role");
const jobDropDown = document.getElementById("title");
const optionTag = jobDropDown.getElementsByTagName("OPTION");
const designDropDown = document.getElementById("shirt-designs");
const shirtColorsDropDown = document.getElementById("shirt-colors");

nameField.focus();

jobRoleField.style.display = "none";
shirtColorsDropDown.style.display = "none";
jobDropDown.addEventListener("change", ()=>{
    for(let i = 1; i < optionTag.length; i++){
        if(optionTag[i].value === "other"){
            if(optionTag[i].selected === true){
                jobRoleField.style.display = "block";
                console.log("true");
            }else{
                jobRoleField.style.display = "none";
                console.log("false");
            }
        }
    }    
});


