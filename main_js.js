var referee = {
    step: 0,
    winner: 0,
    counter_generate: 0,
    chessmen: [],
    selected_chessman: 0,
    layable_locations: [],
    mInterval: null,
    assignRole: function(color){
        this.mInterval = setInterval(() => {audios[0].play()}, 5000);
        player1.color = color;
        color == 'R' ? player2.color = 'B' : player2.color = 'R';
        switch(color){
            case 'R':
                console.log('Player1 is red!');
                break;
            default:
                console.log('Player1 is black!');
        }
    },

    referee: function (coordinate, animal){
        if(coordinate == "m44"){
            if(animal == "elephantR"){
                this.gameOver("Red is winner!");
            }else if(animal == "elephantB"){
                this.gameOver("Black is winner!");
            }
        }else{
            let count = 0;
            let count2 = 0;
            for(let i = 0; i < this.chessmen.length; i ++){
                if(this.chessmen[i].name == "elephant"){
                    count2 ++;
                    if(!this.chessmen[i].live){
                        count ++;
                    }
                    if(count >= 2){
                        this.gameOver("It's a draw!");
                        break;
                    }
                    if(count2 >=2){
                        break;
                    }
                }
            }
        }
    },

    turn: function (){
        player1.turn = !player1.turn;
        player2.turn = !player2.turn;
        switch(player1.turn){
            case true:
                play.style.backgroundColor = player1.color == 'R' ?  'red' : 'black';
                play.innerHTML = player1.color == 'R' ?  "Red's turn!" : "Black's turn!";
                break;
            default:
                play.style.backgroundColor = player2.color == 'R' ?  'red' : 'black';
                play.innerHTML = player2.color == 'R' ?  "Red's turn!" : "Black's turn!";
        }
        
    },
    process: function(){
        this.step ++;
        player1.turn ? player1.step ++ : player2.step ++;
        this.turn();
        initializeSelected();
    },

    gameOver: function(text){
        clearInterval(this.mInterval);
        audios[0].pause();
        audios[9].play();
        switch(text){
            case "Red is winner!":
                play.style.backgroundColor = "red";
                this.winner = "red";
                break;
            case "Black is winner!":
                play.style.backgroundColor = "black";
                this.winner = "black";
                break;
            default:
                play.style.backgroundColor = "#F2C94B";
                this.winner = "neither";
        };
        play.innerHTML = text;
        let len = squares.length;
        for(let i = 0; i < len; i ++){
            squares[i].addEventListener('click', selectWrong);
        };
    }
}
var player1 = {
    id: 123,
    name: 'HUI',
    color: 'white',
    winning: 'pending',
    turn: true,
    step: 0,
    force: 0,
    chessmen:[

    ]
};
var player2 = {
    id: 321,
    name: 'LIU',
    color: 'white',
    winning: 'pending',
    turn: false,
    step: 0,
    force: 0,
    chessmen:[

    ]
};
var selected_chessman = 0; //cache the selected chessman(element)
var layable_locations = [];

//load game: generate game metrix and give every location a function that make the chessman can be moved here
var play = document.getElementsByClassName('row')[0];
const sounds = ['background_sound', 'lion', 'elephant', 'dog', 'cat', 'mouse', 'wrong', 'done', 'open', 'success'];
var audios = [];
async function myAudio(){
    sounds.forEach(
        (item, index) => {
            audios[index] = document.createElement('audio');
            audios[index].src = `sounds/${item}.mp3`;
        }
    );
    
};
myAudio();
var squares = document.getElementsByClassName('square');
const gamemetrix = new Array(9);
for(let i = 0; i < 9; i ++){
    let arr = new Array(9);
    for(let j = 0; j < 9; j ++){
        arr[j]= squares[9*i + j];
        arr[j].setAttribute('id', `m${i}${j}`);
    }
    gamemetrix[i] = arr;
}

const grasslands = [
    [
        gamemetrix[0][0], gamemetrix[0][1], gamemetrix[0][2], gamemetrix[1][0],gamemetrix[1][1], gamemetrix[1][2], gamemetrix[2][0], gamemetrix[2][1]
    ], 
    [
        gamemetrix[6][7], gamemetrix[6][8], gamemetrix[7][6], gamemetrix[7][7], gamemetrix[7][8], gamemetrix[8][6], gamemetrix[8][7], gamemetrix[8][8]
    ]
];

const forests = [
    [
        gamemetrix[0][6], gamemetrix[0][7], gamemetrix[0][8], gamemetrix[1][6],gamemetrix[1][7], gamemetrix[1][8], gamemetrix[2][7], gamemetrix[2][8]
    ], 
    [
        gamemetrix[6][0], gamemetrix[6][1], gamemetrix[7][0], gamemetrix[7][1], gamemetrix[7][2], gamemetrix[8][0], gamemetrix[8][1], gamemetrix[8][2]
    ]
];

const residentials = [
    [
        gamemetrix[0][3], gamemetrix[0][4], gamemetrix[0][5], gamemetrix[1][3], gamemetrix[1][4], gamemetrix[1][5], gamemetrix[2][4]
    ],
    [
        gamemetrix[3][0], gamemetrix[3][1], gamemetrix[4][0], gamemetrix[4][1], gamemetrix[4][2], gamemetrix[5][0], gamemetrix[5][1]
    ],
    [
        gamemetrix[3][7], gamemetrix[3][8], gamemetrix[4][6], gamemetrix[4][7], gamemetrix[4][8], gamemetrix[5][7], gamemetrix[5][8]
    ],
    [
        gamemetrix[6][4], gamemetrix[7][3], gamemetrix[7][4], gamemetrix[7][5], gamemetrix[8][3], gamemetrix[8][4], gamemetrix[8][5]
    ]
];

const swamps = [
    [
        gamemetrix[2][2], gamemetrix[2][3], gamemetrix[3][2]
    ],
    [
        gamemetrix[2][5], gamemetrix[2][6], gamemetrix[3][6]
    ],
    [
        gamemetrix[5][2], gamemetrix[6][2], gamemetrix[6][3]
    ],
    [
        gamemetrix[5][6], gamemetrix[6][5], gamemetrix[6][6]
    ]
]

const  deserts = [
    [
        gamemetrix[3][3], gamemetrix[3][4], gamemetrix[3][5], gamemetrix[4][3], gamemetrix[4][5], gamemetrix[5][3], gamemetrix[5][4], gamemetrix[5][5]
    ]
]

const oases = [
    [
        gamemetrix[4][4]
    ]
]

//style all the areas and taget with different scope
const areas = [grasslands, forests, residentials, swamps, deserts, oases];
var length_areas = areas.length;
const styles = ['grassland', 'forest', 'residential', 'swamp', 'desert', 'oasis'];
var length_styles = styles.length;
for(let i = 0; i < length_areas; i ++){
    let len = areas[i].length;
    for( let j = 0; j < len; j ++){
        let class_name = `square ${styles[i]} n${j}`;
        let len2 = areas[i][j].length;
        for(let k = 0; k < len2; k ++){
            areas[i][j][k].setAttribute('class', class_name);
        }
    }
}

//chessmen generate locations, generate chessman and collect all the occupied locations
const locations_generate = [
    gamemetrix[0][2], gamemetrix[0][3], gamemetrix[1][2], gamemetrix[1][3],
    gamemetrix[0][5], gamemetrix[0][6], gamemetrix[1][5], gamemetrix[1][6],
    gamemetrix[2][0], gamemetrix[2][1], gamemetrix[3][0], gamemetrix[3][1],
    gamemetrix[2][7], gamemetrix[2][8], gamemetrix[3][7], gamemetrix[3][8],
    gamemetrix[5][0], gamemetrix[5][1], gamemetrix[6][0], gamemetrix[6][1],
    gamemetrix[5][7], gamemetrix[5][8], gamemetrix[6][7], gamemetrix[6][8],
    gamemetrix[7][2], gamemetrix[7][3], gamemetrix[8][2], gamemetrix[8][3],
    gamemetrix[7][5], gamemetrix[7][6], gamemetrix[8][5], gamemetrix[8][6]
]
var occupied_locations = new Array(32);
let len = locations_generate.length;
for(let i = 0; i < len; i ++){
    let node = document.createElement('img');
    node.src = 'pics/location.png';
    node.setAttribute('id', `L${i}`);
    node.addEventListener('click', generate);
    locations_generate[i].appendChild(node);
    occupied_locations[i] = locations_generate[i];
};
//restart button
document.getElementsByTagName("button")[0].addEventListener('click', () => {location.reload();});
//animals with color
const animals = [
    'dogR', 'dogR', 'catR', 'catR', 'elephantR', 'mouseR', 'mouseR', 'mouseR', 'leopardR', 'leopardR', 'lionR', 'lionR', 'lynxR', 'lynxR', 'tigerR', 'tigerR',
    'dogB', 'dogB', 'catB', 'catB', 'elephantB', 'mouseB', 'mouseB', 'mouseB', 'leopardB', 'leopardB', 'lionB', 'lionB', 'lynxB', 'lynxB', 'tigerB', 'tigerB'
]

    //generate 32 randoms
const randoms = new Array(32);
let random = -1;
for(let i = 0; i < 32; i ++){
    do {
        random = Math.floor(Math.random() * 1000) % 32;   
    }
    while(randoms.includes(random));
    randoms[i] = random;
};
    //generate chessmans
function generate(e){
    audios[8].play();
    let parentElement = e.target.parentElement;
    occupied_locations[occupied_locations.indexOf(parentElement)] = null;//remove the generated location from the occupied location's array
    e.target.remove();
    let animal = animals[randoms[referee.counter_generate]];
    let node = document.createElement('img');
    node.src = `pics/${animal}.png`;
    node.setAttribute('id', `c${referee.counter_generate}`);
    node.setAttribute('class', animal);
    node.addEventListener('click', selectChessman);
    parentElement.appendChild(node);
    referee.chessmen.push({
        id: referee.counter_generate,
        name: animal.slice(0, animal.length -1),// animal without color
        color: animal[animal.length - 1],
        live: true,
        pp_force: checkPpAndForce(animal.slice(0, animal.length -1))
    });
    rejustForce(referee.chessmen[referee.counter_generate], parentElement.className[7]);
    console.log("Generate a new chessman: ", referee.chessmen[referee.counter_generate]);

    !referee.counter_generate ? referee.assignRole(referee.chessmen[0].color) : null ;//when generate first chessman referee assign role
    referee.counter_generate ++;
    if(referee.winner){return;};
    referee.process();
};

//select and move chessman
    //select chessman and computer the moveable locations
function selectChessman(e){

    if(!selected_chessman){ //when there is no select chessman
        let color = e.target.className[e.target.className.length -1];
        switch(color){
            case player1.color:
                player1.turn ? selectRedOrBlack(e) : selectWrong();
                break;
            case player2.color:
                player2.turn ? selectRedOrBlack(e) : selectWrong();
        }
    }else{
        if(selected_chessman.id == e.target.id){
            //cancel the selecting and initalize the element's situation
            console.log('Cancel the selecting.')
            initializeSelected();
        }else{
            if(e.target.tagName == 'IMG'){
                let new_select_color = e.target.className[e.target.className.length - 1];
                let old_select_color = selected_chessman.className[selected_chessman.className.length -1];
                if(old_select_color == new_select_color){
                    console.log('Reselect a chessman.');
                    initializeSelected();
                    selectChessman(e);
                }
            }
        };
        
    }
}
//move the select chessman, all the layable locations with a event listener to this function so it call 'move here'
function moveHere(e){
    if(referee.winner){
        return;
    }
    audios[7].play();
    referee.step ++;
    referee.turn();
    let target = e.target;
    let parentElement = target.parentElement;
    if(e.target.tagName == 'IMG'){
       console.log(`You/${selected_chessman.className} capture a chessman/${e.target.className} here!`);
       updateChessmen(parentElement.id, selected_chessman.className, e.target.className);
       target.remove();
       //when the element's target is a element with img tag, remove the img and move the chessman into it's parent element
       parentElement.appendChild(selected_chessman);
    }else{
       //move chessman from the orignal location. Essentially the orignal location's children[0] is remove to target's location
        target.appendChild(selected_chessman);
        referee.referee(target.id, selected_chessman.className);
    };

    rejustForce(referee.chessmen[parseInt(selected_chessman.id.slice(1))], selected_chessman.parentElement.className[7]);
    switch('s'){
        case parentElement.className[7]:
            dieOrLive(e.target);
            break;
        case target.className[7]:
            dieOrLive(e.target.children[0]);
    }

    initializeSelected();
}
//chect the animal is at own's native area
function checkNative(animal, surrounding){
    let native = function(){
        switch(animal){
            case 'lion':
            case 'leopard':
                return 'g';//'g' == 'grassland'
            case 'tiger':
            case 'lynx':
                return 'f'; //'f' == 'forest'
            case 'dog':
            case 'cat':
                return  'r';//'r' == 'residential'
            case 'mouse':
                return  'rd'; // rd == residential and desert
            case 'elephant':
                return '';
        };
    }();
    return native.includes(surrounding);
}

function checkPpAndForce(animal){
    switch(animal){
        case 'elephant':
            return [
                ['mouse'],
                ['lion', 'tiger', 'leopard', 'lynx', 'dog', 'cat'],
                100
            ];
        case 'lion':
            return [
                ['elephant'],
                ['tiger', 'leopard', 'lynx', 'dog', 'cat'],
                70
            ];
        case 'tiger':
            return [
                ['elephant'],
                ['lion', 'leopard', 'lynx', 'dog', 'cat'],
                70
            ];
        case 'leopard':
            return [
                ['elephant', 'lion', 'tiger'],
                ['dog', 'cat', 'lynx'],
                50
            ];
        case 'lynx':
            return [
                ['elephant', 'lion', 'tiger'],
                ['dog', 'cat', 'mouse', 'leopard'],
                50
            ];
        case 'dog':
            return [
                ['elephant', 'lion', 'tiger', 'leopard', 'lynx'],
                [],
                30
            ];
        case 'cat':
            return [
                ['elephant', 'lion', 'tiger', 'leopard', 'lynx'],
                ['mouse'],
                30
            ]
        case 'mouse':
            return [
                ['lynx', 'cat'],
                ['elephant'],
                10
            ]
    }
}

function initializeSelected(){
    try{
        selected_chessman.style.opacity = 1; //initialize the selected chessman's opacity
        //remove the layable postions listener and restyle border
        layable_locations.forEach(
            (item) =>{
                item.removeEventListener('click', moveHere);
                item.style.opacity = 1;
                console.log('Initialize the layable locations opacity, and remove the event listener from layable location/element.');
                }
        );
    }
    catch(err){
        console.log('The function generate() call the initiallizeSelected function.\nBut nothing to be initialized.');
    };
    selected_chessman = null;
    layable_locations = [];
}

function rejustForce(chessman, surrounding){
    //console.log('Call the rejustForce function to rejust or initialize the force of this', chessman.name, '\n orginal force: ', chessman.pp_force[2]);
    //initialize the force of animal
    let old_force = chessman.pp_force[2];
    switch(chessman.name){
        case 'tiger':
        case 'lion':
            chessman.pp_force[2] = 70;
            break;
        case 'lynx':
        case 'leopard':
            chessman.pp_force[2] = 50;
    }
    //console.log('initialized force: ', chessman.pp_force[2]);
    if(!checkNative(chessman.name, surrounding) && (surrounding == 'f' || surrounding == 'g')){
        switch(chessman.name){
            case 'tiger':
            case 'lion':
                chessman.pp_force[2] = 60;
                break;
            case 'lynx':
            case 'leopard':
                chessman.pp_force[2] = 40;
        }
    }
    //console.log('rejusted force: ', chessman.pp_force[2]);
    if(old_force != chessman.pp_force[2]){
        console.log(`The force of ${chessman.name}: ${old_force} \n is rejusted to: ${chessman.pp_force[2]}.`)
    }
}

function selectRedOrBlack(e){
    console.log('Select a chessman.');
    let target = e.target;
    playSound(referee.chessmen[parseInt(target.id.slice(1))].name);
    let class_name = target.parentElement.className;
        let those_areas = document.getElementsByClassName(class_name);//where the seleced chessman lays
        let len = those_areas.length;
        target.style.opacity = 0.5;
        selected_chessman = target; //cache the selected chessman
        //add neighboring locations
        let coordinate =[parseInt(target.parentElement.id[1]), parseInt(target.parentElement.id[2])];
        let near_coordinates = [
            [coordinate[0] - 1, coordinate[1]],
            [coordinate[0], coordinate[1] - 1],
            [coordinate[0], coordinate[1] + 1],
            [coordinate[0] + 1, coordinate[1]]
        ];

        for(let i = 0; i < 4; i ++){
            try{
                let element = gamemetrix[near_coordinates[i][0]][near_coordinates[i][1]];
                if(element && !occupied_locations.includes(element)){
                    layable_locations.push(element);
                }
            }
            catch(err){}  
        }

        //add native locations if the animal live at its own native area
        if(checkNative(referee.chessmen[parseInt(target.id.slice(1))].name, class_name[7])){ //the first letter of surrounding at the seventh location of location's class name 
            let native_places = [];
            for(let i = 0; i < len; i ++){
                if(!occupied_locations.includes(those_areas[i])){
                    native_places.push(those_areas[i]);
                }
            }

            let native_free = [target];//the first is the selected chessman
            computerFreeSpaces(target.parentElement);
            //console.log('Native free locations: ', native_free)
            let len_native_free = native_free.length;
            for(let i = 1; i < len_native_free; i ++){
                if(!layable_locations.includes(native_free[i])){
                    console.log('native free');
                    layable_locations.push(native_free[i]);
                }
            }
            
            function computerFreeSpaces(element){
                let id = element.id;
                let x = parseInt(id[1]);
                let y = parseInt(id[2]);
                //four sides's neighbour element: over, right, bottom and left
                let nbs = [[x - 1, y], [ x, y + 1], [ x + 1, y], [x, y - 1]];
                for(let i = 0; i < 4; i ++){
                    let n = nbs[i][0];
                    let m = nbs[i][1];
                    if(n > -1 && n < 9 && m > -1 && m < 9 
                        && native_places.includes(gamemetrix[n][m]) 
                        && !native_free.includes(gamemetrix[n][m])){
                            if(gamemetrix[n][m].children[0]){
                                layable_locations.push(gamemetrix[n][m])
                            }else{
                                native_free.push(gamemetrix[n][m]);
                                computerFreeSpaces(gamemetrix[n][m]);
                            }
                    }
                }
            }
        }

        //delete those locations where same color chessmans(own side) and predator chessman lay at
        let id = parseInt(target.id.slice(1));//id at the chessmans list
        for(let i = 0; i < layable_locations.length; i ++){
            if(layable_locations[i].children[0]){
                let id_item = parseInt(layable_locations[i].children[0].id.slice(1));
                let chessman1 = referee.chessmen[id];
                let chessman2 = referee.chessmen[id_item];
                let name1 = chessman1.name;
                let name2 = chessman2.name;
                let color1 = chessman1.color;
                let color2 = chessman2.color;
                let force1 = chessman1.pp_force[2];
                let force2 = chessman2.pp_force[2];
                let prey1 = chessman1.pp_force[1];
                let prey2 = chessman2.pp_force[1];
                let predator1 = chessman1.pp_force[0];
                let condition1 =  color1 == color2;
                let condition2 = predator1.includes(name2);
                let condition3 = !prey1.includes(name2);
                let condition4 = prey2.includes(name1) &&  force1 <= force2;
                if(condition1 || condition2 || condition3 || condition4){
                    layable_locations.splice(i, 1);
                    i --;
                }
            }
        }

        layable_locations.forEach(
            (item) => {
                item.style.opacity = 0.5;   
                item.addEventListener('click', moveHere);
            }
        )      
};

function dieOrLive(chessman){
    let random = Math.floor((Math.random() * 1000)) % 3;
    if(!random){
        updateChessmen("xxx", "xxx", chessman.className);
        chessman.remove();
        console.log('Your chessman is lost in swamp!');
    }
}

function selectWrong(){
    audios[6].play();
    console.log('It is not your chessman!');
}

function playSound(animal){
    switch(animal){
        case 'tiger':
        case 'leopard':
        case 'lynx':
            audios[sounds.indexOf('lion')].play();
            break;
        default:
            audios[sounds.indexOf(animal)].play();
    }
}

function updateChessmen(location, slected_name, name){
    let len = referee.chessmen.length;
    for(let i = 0; i < len; i ++){
        if(referee.chessmen[i].name == name.slice(0, name.length -1)
             && referee.chessmen[i].color == name[name.length -1]){
                console.log("update chessmen!!!");
                referee.chessmen[i].live = false;
                break;
            };
    };

    referee.referee(location, slected_name);
}