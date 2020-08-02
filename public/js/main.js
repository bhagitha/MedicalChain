async function postData(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    console.log("response22", response);
    return await response.json();
}


function _login(event) {
    event.preventDefault();
    let username = document.getElementById("mobile").value;
    let password = document.getElementById("password").value;
    console.log("username=", username, password)
    let login = {
        username: username,
        password: password
    }

    const res = postData("/login", login)
        .then((data) => {
            console.log("response11", data);
        })
        .catch(console.error);


}

function _register(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var actor = document.getElementById("actor").value;
    var gender = document.getElementById("gender").value;
    var age = document.getElementById("age").value;
    var phone = document.getElementById("mobile").value;
    var password = document.getElementById("password").value;
    if (name == "") {
        alert("please provide a valid username");
        document.getElementById("name").focus();
        return false;
    }
    if (actor == "") {
        alert("please provide a actor");
        document.getElementById("actor").focus();
        return false;
    }
    if (address == "") {
        alert("please provide your address");
        document.getElementById("address").focus();
        return false;
    }
    if (age == "") {
        alert("please specify your age");
        document.getElementById("age").focus();
        return false;
    }



    var phonePat = /^[0-9]+$/;
    var phoneValid = phone.match(phonePat);
    if (phoneValid == null) {
        alert("Please provide valid number");
        document.getElementById("mobile").focus();
        return false;
    }


    if (phone.length < 10) {
        alert("Number is not valid ");
        document.getElementById("mobile").focus();
        return false;
    }
    if (phone.length > 10) {
        alert("number is not valid ");
        document.getElementById("mobile").focus();
        return false;
    }

    if (gender == "-1") {
        alert("please specify gender ");
        document.getElementById("gender").focus();
        return false;
    }

    //alert("successfully registered");

    let register = {
        name: name,
        age: age,
        actor: actor,
        phone: phone,
        gender: gender,
        address: address,
        password: password
    }
    console.log("value=", register)

    postData("/register", register)
        .then((data) => {
            console.log("response", data);
            if(data.status == 200)
            alert("register successfully")
        })
        .catch(console.error);

}

function _downloadPdf(event){
    // Get the element.
    event.preventDefault();
    var element = document.getElementById('card_id');

    // Generate the PDF.
    html2pdf().from(element).set({
      margin: 1,
      filename: 'test.pdf',
      html2canvas: { scale: 2 },
      jsPDF: {orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true}
    }).save();
}

function _searchPatient(event){
    event.preventDefault();
    let phone = document.getElementById("phone").value;
    console.log("phone ",phone)
    postData("/searchPatient", {phone : phone})
    .then((data)=>{
        console.log("response ",data);
    })
    .catch(console.error);
}
