
 let answers = [];
 let solution ="";
 let score =0;


 function loadCountry(bouton) {
    answers = [];
    solution ="";
    const URL = "https://restcountries.eu/rest/v2/regionalbloc/eu";
    let request = new XMLHttpRequest();
    request.open('GET', URL);
    request.send();
    request.onload = function () {
        let data = request.response;
        console.log(data);
        let json = JSON.parse(data);
        let infos = [];
        for (let i = 0; i < json.length; i++) {
            let flag = json[i].flag;
            let country = json[i].name;
            let capital = json[i].capital;
            infos.push([country, capital, flag]);
        }
        let randoms = [0,0,0,0];
        
    
        let validateRandom = new Set(randoms)
        while (validateRandom.size < 4) {
        randoms[0] = Math.floor(Math.random() * infos.length)
        randoms[1] = Math.floor(Math.random() * infos.length)
        randoms[2] = Math.floor(Math.random() * infos.length)
        randoms[3] = Math.floor(Math.random() * infos.length)

        validateRandom = new Set(randoms)
        }
        

        for(let i = 0; i<randoms.length; i++){
            
            answers.push(
                [infos[randoms[i]][0],
                    infos[randoms[i]][1],
                    infos[randoms[i]][2]
                ]
            );
        }

        if(document.getElementById('next')){
            let game = document.getElementById('game');            
            game.removeChild(game.lastChild);
        }
        
        document.getElementById('option1').setAttribute('class','')
        document.getElementById('option2').setAttribute('class','')
        document.getElementById('option3').setAttribute('class','')
        document.getElementById('option4').setAttribute('class','')
        document.getElementById('option1').innerHTML = answers[0][1];
        document.getElementById('option2').innerHTML = answers[1][1];
        document.getElementById('option3').innerHTML = answers[2][1];
        document.getElementById('option4').innerHTML = answers[3][1];

        solution = getRandomArbitrary(0,4);

        document.getElementById('drapeau').setAttribute('src', answers[solution][2]);
        document.getElementById('pays').innerHTML = answers[solution][0];
        document.getElementById('score').innerHTML = "Score : "+score;
          
        
    }

}

function findCapital(bouton){
    if (document.getElementById(bouton).innerHTML == answers[solution][1]){
        score++;
        document.getElementById('score').innerHTML = "Score : "+score;
        document.getElementById(bouton).setAttribute('class','boutonFind')
        let next = document.createElement('button');
        next.innerHTML="Next";
        next.setAttribute('class','next')
        next.setAttribute('id','next')
        next.setAttribute('onclick','loadCountry()')
        document.getElementById('game').appendChild(next);
    }else{
       
        if(score >0){
        score--;
        }
        loadCountry();
    } 
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
