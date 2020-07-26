let projects = document.getElementById("projectfield")

// var image = document.createElement("img");
// div.setAttribute("src", "https://firebasestorage.googleapis.com/v0/b/skytecwebsiterewrite.appspot.com/o/SkytecMall.png?alt=media&token=1084d2f6-59cf-4ccd-a372-688191e42075");
// div.appendChild(image);

function GetProjects() {
    return fetch("https://skytecbotrewrite-4.asahi79289.repl.co/projects/")
    .then(projects => {
        projects = projects.json();
        console.log(projects);
        return projects;
    })
}

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

                console.log("Image Found");
                console.log("Image Is " + json[key].image);
            }

            projects.appendChild(div);
             
            console.log(json[key].name);
        }
    })
}

CreateElements();