const submitButton = document.querySelector(".enroll-button");
const nameInput = document.querySelector("#name");
const telInput = document.querySelector("#mobile");
const warning = document.querySelector(".enroll-warning");
const successMessage = document.querySelector(".enroll-success");

const mobileRegex = /\(\d{3}\)\s\d{3}-\d{2}-\d{2}/;

function postRequest(name, mobile) {
    fetch('', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "id": 1, "name": name, "mobile": mobile })
})
}

submitButton.onclick = (e) => {
    e.preventDefault();
    if(nameInput.value !== "" && mobileRegex.test(telInput.value)){
        warning.style.display = "none";
        successMessage.style.display = "flex";
        nameInput.classList.remove("empty-input");
        telInput.classList.remove("empty-input");
        postRequest(nameInput.value, telInput.value.replace(/\D/g, ''));

    }
    else {
        warning.style.display = "block";
        if (nameInput.value === "") {
            console.log(nameInput.value);
            nameInput.classList.add("empty-input");
        }
        if (!mobileRegex.test(telInput.value)) {
            telInput.classList.add("empty-input");
        }
    }
}

telInput.addEventListener("input", (e) => {
    e.target.value = phoneMask(e.target.value);
})

function phoneMask (str) {
    let result;
    result = "+"
    const mobileLength = 11;
    str = str.replace(/\D/g, '');
    for (let i = 0; i < str.length && i < mobileLength; i++) {
        switch (i) {
          case 0:
            result += "7 (";
            continue;
          case 4:
            result += ") ";
            break;
          case 7:
            result += "-";
            break;
          case 9:
            result += "-";
            break;
          default:
            break;
        }
        result += str[i];
      }
      //
      return result;
    
}