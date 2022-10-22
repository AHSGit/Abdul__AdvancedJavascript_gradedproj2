// login page password show/hide
var state = false;

function toggle() {
    event.preventDefault();
    if (state) {
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("eye").style.color = '#7a797e';
        state = false;
    } else {
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("eye").style.color = '#5887ef';
        state = true;
    }
}

// login authentication using local storage
localStorage.setItem("username", "admin");
localStorage.setItem("password", "admin");

function validate() {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var message = document.getElementById("message");

    var storedUsername = localStorage.getItem("username");
    var storedPassword = localStorage.getItem("password");

    if (username == storedUsername && password === storedPassword) {
        window.location.href = "./index.html";
    } else {
        message.innerHTML = '*Login Failed: Invalid username or password!';
        /* alert('*Login Failed: Invalid username or password!'); */
    }
}

// restrict user from going back to the login page
function preventbackbutton() { window.history.forward(); }
setTimeout("preventbackbutton()", 0);
window.onunload = () => { null };

// below method does not work with Chrome/Edge latest versions but works well with Firefox
/* history.pushState(null, null, document.URL);
window.addEventListener('popstate', () => {
history.pushState(null, null, document.URL);
}); */


// populate the HTML elements using data from Data.json
fetch('Data.json')
    .then((res) => res.json())
    .then(data => populatePage(data));


var i = 0;
function populatePage(data) {
    
    displayData();
    
    let prevBtn = document.querySelector("#prev");
    prevBtn.addEventListener("click", () => {
        if (i > 0) i--;            
        else i=0;           
        displayData();
        console.log(i);
    });
    
    let nextBtn = document.querySelector("#next");
    nextBtn.addEventListener("click", ()=> {
        if (i < data.resume.length -1) i++;
        else i = data.resume.length-1;
        displayData();
        console.log(i);
    });

    function displayData() {
        if (i == 0) document.querySelector("#prev").style.visibility = "hidden";     
        else document.querySelector("#prev").style.visibility = "visible";

        if (i == data.resume.length-1) document.querySelector("#next").style.visibility = "hidden";
        else document.querySelector("#next").style.visibility = "visible";

        // full name
        let fullName = document.querySelector('#full-name');
        fullName.innerHTML = data.resume[i].basics.name;


        // job title
        let jobTitle = document.querySelector('#job-title');
        jobTitle.innerHTML = data.resume[i].basics.AppliedFor;


        // profile picture with a fallback default
        let profileImg = document.querySelector('#img-frame');
        profileImg.innerHTML = `<img src="${data.resume[i].basics.image}" alt="profile-img" id="img" onerror="this.onerror=null;this.src='./profile-icon2.png'">`;

        
        // phone number
        let phoneNo = document.querySelector('#phone');
        phoneNo.innerHTML = data.resume[i].basics.phone;

        
        // email
        let email = document.querySelector('#email');
        email.innerHTML = data.resume[i].basics.email;

        
        // social network details
        let social = document.querySelector('#profile');
        social.innerHTML = `<a href="${data.resume[i].basics.profiles.url}">${data.resume[i].basics.profiles.network}</a>`;

        
        // address details
        let address = document.querySelector('#address');
        address.innerHTML = 
        `${data.resume[i].basics.location.address},
        ${data.resume[i].basics.location.city},
        ${data.resume[i].basics.location.state},
        ${data.resume[i].basics.location.postalCode}`;

        
        // skills list from provided array
        var skillsList = "";
        for (let x = 0; x <= data.resume[i].skills.keywords.length - 1; x++) {
            let skills = data.resume[i].skills.keywords[x];
            skillsList += "<li>" + skills + "</li>";
        }
       
        let skills = document.querySelector('#tech-skills');
        skills.innerHTML = skillsList;

        
        // hobbies list from provided array
        var hobbiesList = "";
        for (let y = 0; y <= data.resume[i].interests.hobbies.length - 1; y++) {
            let hobbies = data.resume[i].interests.hobbies[y];
            hobbiesList += "<li>" + hobbies + "</li>";
        }
        
        let hobby = document.querySelector('#hobby');
        hobby.innerHTML = hobbiesList;

        // experience details
        let company = document.querySelector('#company');
        company.innerHTML = data.resume[i].work["Company Name"];

        let position = document.querySelector('#position');
        position.innerHTML = data.resume[i].work.Position;

        let start = document.querySelector('#start');
        start.innerHTML = data.resume[i].work["Start Date"];

        let end = document.querySelector('#end');
        end.innerHTML = data.resume[i].work["End Date"];

        let summary = document.querySelector('#summary');
        summary.innerHTML = data.resume[i].work.Summary;

        // project details
        

    }
      
};
