// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDz-KSo-m6eBWnQI0E021Zl7dY84y7HreY",
    authDomain: "skytecwebsiterewrite.firebaseapp.com",
    databaseURL: "https://skytecwebsiterewrite.firebaseio.com",
    projectId: "skytecwebsiterewrite",
    storageBucket: "skytecwebsiterewrite.appspot.com",
    messagingSenderId: "155059884574",
    appId: "1:155059884574:web:f647f8307327121f0cd40f",
    measurementId: "G-9PWPP1SZRE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

let projects = document.getElementById("projectfield");

// var image = document.createElement("img");
// div.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/skytecwebsiterewrite.appspot.com/o/SkytecMall.png?alt=media&token=1084d2f6-59cf-4ccd-a372-688191e42075");
// div.appendChild(image);

function GetProjects() {
    return fetch("https://skytecbotrewrite.asahi79289.repl.co/projects/")
    .then(projects => {
        projects = projects.json();
        console.log(projects);
        return projects;
    })
    .catch(error => {
        console.log(error);
        if (error == "TypeError: Failed to fetch") {
            console.log("Unable to connect to Skytec Repl, directly connecting to Skytec Firebase.");
            finaldata = {};
            return db.collection("projects").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    docdata = doc.data();
                    finaldata[doc.id] = doc.data();
                });
                console.log("Retrieved data from Firebase:\n", finaldata);
                return finaldata;
            });
        } else {
            console.log("Unable to resolve error.");
        };
    });
};

function CreateElements() {
    GetProjects().then(json => {
        for (var key in json) {

            var div = document.createElement("li");
            div.setAttribute("class", "project");

            var name = document.createElement("h1");
            name.textContent = json[key].name;
            div.appendChild(name);

            var description = document.createElement("h4");
            description.textContent = json[key].description;
            div.appendChild(description);

            if ("image" in json[key]) {
                var image = document.createElement("img");
                image.setAttribute("src", json[key].image);
                div.appendChild(image);
            };

            projects.appendChild(div);
        };
    });
};

CreateElements();