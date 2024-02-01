"use strict";

class Cell {
    #x;
    #y;
    #kleur;
    #grootte;


    constructor(x, y, kleur, grootte) {
        this.#x = x;
        this.#y = y;
        this.#kleur = kleur;
        this.#grootte = grootte;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getKleur() {
        return this.#kleur;
    }

    getGrootte() {
        return this.#grootte;
    }

    drawCell() {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.height = this.#grootte + "px";
        cell.style.width = this.#grootte + "px";

        cell.dataset.x = this.#x;
        cell.dataset.y = this.#y;
        cell.dataset.kleur = this.#kleur;


        cell.onmouseover = function () {
            if (mouseDown) {
                cell.dataset.kleur = getGeselecteerdeKleur();
                cell.style.backgroundColor = getGeselecteerdeKleur();
            }
        }







        document.getElementById("kleurplaat").appendChild(cell);
    }
}


let mouseDown = 0;
document.body.onmousedown = function () {
    mouseDown = true;
}
document.body.onmouseup = function () {
    mouseDown = false;
}


let hoogte = document.getElementById('hoogte').value;
let breedte = document.getElementById('breedte').value;
let grootte = document.getElementById('celgrootte').value;
tekenVeld(hoogte, breedte, grootte);





document.getElementById("veldgrootte_toepassen").onclick = function () {
    let hoogte = document.getElementById('hoogte').value;
    let breedte = document.getElementById('breedte').value;
    let grootte = document.getElementById('celgrootte').value;
    tekenVeld(hoogte, breedte, grootte);
}


function tekenVeld(hoogte, breedte, grootte) {
    //Maak het veld leeg
    document.getElementById("kleurplaat").innerHTML = "";

    for (let i = 0; i < hoogte; i++) {
        for (let j = 0; j < breedte; j++) {
            const cell = new Cell(j, i, "white", grootte);
            cell.drawCell();
        }
        const linebreak = document.createElement("br");
        document.getElementById("kleurplaat").appendChild(linebreak);
    }
}

function getGeselecteerdeKleur() {
    let radioButtons = document.querySelectorAll('input[type=radio]');
    for (let radio of radioButtons) {
        if (radio.checked) {
            return radio.value;
        }
    }

}

document.getElementById("exporteer").onclick = function () {
    //creeër een array van alle cel objecten
    const array_cel_objecten = [];
    const tekening = document.getElementsByClassName("cell");
    for (const cel of tekening) {
        array_cel_objecten.push({ "x": cel.dataset.x, "y": cel.dataset.y, "kleur": cel.dataset.kleur, "grootte": cel.style.width });
    }
    //console.table(array_cel_objecten);
    //console.log(JSON.stringify(array_cel_objecten));

    //Download tekening als json bestand
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(array_cel_objecten));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "tekening" + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

}


document.getElementById('fileToUpload').onchange = function () {

    const selectedFile = document.getElementById('fileToUpload').files[0];

    if (selectedFile !== undefined) {

        const fileSize = selectedFile.size / 1024; // in kB

        let validFile = true


        if (fileSize > 1000) {
            validFile = false
            document.getElementById('fileToUpload').value = '';
            alert('File is too large. You can only upload files up to 1000 kB.');
        }

        if (validFile) {
            const reader = new FileReader();
            reader.onload = function() {
              const contents = reader.result;
              loadJson(contents);

            };
            reader.readAsText(selectedFile);
        }
    }
}


function loadJson(contents) {
    const array_cel_objecten = JSON.parse(contents);
    console.table(array_cel_objecten);

    //zet de veldgrootte naar de hoogste waarde van x en y
    let max_hoogte = 0;
    for (let cell of array_cel_objecten) {
    
        if (parseInt(cell.y) > max_hoogte) {
            max_hoogte = parseInt(cell.y)
        }
    }
    let max_breedte = 0;
    for (let cell of array_cel_objecten) {
    
        if (parseInt(cell.x) > max_breedte) {
            max_breedte = parseInt(cell.x)
        }
    }



    tekenVeld(max_hoogte + 1, max_breedte + 1, array_cel_objecten[0].grootte.substring(0, 2));

    
}
let elementWrapper = document.querySelector(".wrapper");
let displayWrapper = window.getComputedStyle(elementWrapper, null).display;;
if (displayWrapper === "none") {
    const boodschap = document.createElement("h1");
    boodschap.innerText = "Kleurplaat niet beschikbaar in deze schermresolutie";
    boodschap.id = "boodschapResolutie";
    const gif = document.createElement("img");
    gif.src = "images/bobRossGif.gif";
    gif.id = "bobRossGif";
    document.body.appendChild(boodschap);
    document.body.appendChild(gif);
}