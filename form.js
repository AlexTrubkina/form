const submitButton = document.querySelector(".enroll-button");
const nameInput = document.querySelector("#name");
const telInput = document.querySelector("#mobile");
const warning = document.querySelector(".enroll-warning");
const successMessage = document.querySelector(".enroll-success");

const mobileRegex = /\(\d{3}\)\s\d{3}-\d{2}-\d{2}/;

function postRequest(name, mobile) {
    fetch("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: 1, name: name, mobile: mobile }),
    });
}

submitButton.onclick = (e) => {
    e.preventDefault();
    if (nameInput.value !== "" && mobileRegex.test(telInput.value)) {
        warning.style.display = "none";
        successMessage.style.display = "flex";
        nameInput.classList.remove("empty-input");
        telInput.classList.remove("empty-input");
        postRequest(nameInput.value, telInput.value.replace(/\D/g, ""));
    } else {
        warning.style.display = "flex";
        if (nameInput.value === "") {
            console.log(nameInput.value);
            nameInput.classList.add("empty-input");
        }
        if (!mobileRegex.test(telInput.value)) {
            telInput.classList.add("empty-input");
        }
    }
};

const getInputNumbersValue = (input) => {
    return input.value.replace(/\D/g, "");
};

const onPhoneInput = (e) => {
	console.log("hi");
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

    if (!inputNumbersValue) {
        return (input.value = "");
    }

    if (input.value.length != selectionStart) {
        // для редактирования номера в середине
        if (e.data && /\D/g.test(e.data)) {
            // при попытке записать не числовой символ
            input.value = inputNumbersValue;
        }
        return;
    }

    // замена первого числа на 7ку

    if (inputNumbersValue[0] !== "7" && inputNumbersValue[0] !== "8")
        inputNumbersValue = "7" + inputNumbersValue;
    const firstSymbols = (inputNumbersValue[0] = "+7");
    formattedInputValue = input.value = firstSymbols + " ";

    // маска номера

    if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
    }
    input.value = formattedInputValue;
};

const onPhonePaste = (e) => {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
    const pasted = e.clipboardData || window.СlipboardData;
    if (pasted) {
        const pastedText = pasted.getData("Text");
        if (/\D/g.test(pastedText)) {
            // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
            // formatting will be in onPhoneInput handler
            input.value = inputNumbersValue;
            return;
        }
    }
};

telInput.addEventListener("input", onPhoneInput);

telInput.addEventListener("paste", onPhonePaste);
