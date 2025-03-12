const URL_ELEMENTI = "./elementi.json";
const URL_IMMAGINI = "./Immagini/";
const SELEZIONE = "banana";

let numeroImmaginiGiuste = 0;

function onLoad_Setup(){
    let griglia = document.getElementById("grigliaFoto");

    fetch(URL_ELEMENTI).then(
        response => response.json()
    ).then(data => {
        console.log(data);

        data.forEach(element => {
            let immagine = document.createElement('img');
            immagine.setAttribute('nome', element.nome);
            immagine.src = URL_IMMAGINI + element.nome + "." + element.formato;
            immagine.setAttribute('onclick', "selezionaImmagine(this)");
            immagine.classList.add("immagineVerifica");
            
            if(immagine.getAttribute("nome").includes(SELEZIONE)) numeroImmaginiGiuste++;

            griglia.appendChild(immagine);
        });
    }).catch(error => console.log(error));
}

let immaginiSelezionate = [];

function selezionaImmagine(immagine){
    immagine.classList.add("immagineSelezionata");
    immaginiSelezionate.push(immagine);
}

function verificaUmano(){
    console.log(immaginiSelezionate);

    immaginiSelezionate.forEach(immagine => {
        immagine.classList.remove("immagineSelezionata");
    });

    if(immaginiSelezionate.length < numeroImmaginiGiuste){
        alert("Non sei un umano");
        immaginiSelezionate = [];
        return;
    }

    for(let immagine of immaginiSelezionate) {
        if(!immagine.getAttribute("nome").includes(SELEZIONE)){
            console.log(immagine.getAttribute("nome"));
            console.log(immagine.getAttribute("nome").indexOf("banana1"))
            alert("Non sei un umano");
            immaginiSelezionate = [];
            return;
        }
    };
    immaginiSelezionate = [];
    alert("Sei un umano");
}