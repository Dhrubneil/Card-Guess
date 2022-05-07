

let introTextEn = document.getElementById('intro-text');
let introTextBn = document.getElementById('intro-text-bn');

let playBtn = document.getElementById('play-btn');
let playBtnBn = document.getElementById('play-btn-bn');

let intervalTextEn = document.getElementById('interval-text-en');
let intervalTextBn = document.getElementById('interval-text-bn');

let gamePageEn = document.getElementById('game-page-en');
let gamePageBn = document.getElementById('game-page-bn');


function hideBn(){
    introTextBn.style.display = 'none';
    playBtnBn.style.display = 'none';
    intervalTextBn.style.display = 'none';
    gamePageBn.style.display = 'none';
}
function showBn(){
    introTextBn.style.display = 'flex';
    playBtnBn.style.display = 'flex';
    intervalTextBn.style.display = 'flex';
    gamePageBn.style.display = 'flex';   
}

function hideEn(){
    introTextEn.style.display = 'none';
    playBtn.style.display = 'none';
    intervalTextEn.style.display = 'none';
    gamePageEn.style.display = 'none'; 
}

function showEn(){
    introTextEn.style.display = 'flex';
    playBtn.style.display = 'flex';
    intervalTextEn.style.display = 'flex';
    gamePageEn.style.display = 'flex'; 
}

hideBn();


let en = document.querySelector('#en')
let bn = document.querySelector('#bn')

bn.addEventListener('click', ()=>{
    showBn();
    hideEn();

    bn.style.background = 'orangered';
    en.style.background = 'grey';
})
en.addEventListener('click', ()=>{
    showEn();
    hideBn();

    en.style.background = 'orangered';
    bn.style.background = 'grey';
})


// window.onload = function(){

//     hideBn();
// }

let blink = document.querySelector('.blink');
let underBar = document.querySelector('.underBar');
let intervalPage = document.querySelector('.interval');

function startGame(){
    document.querySelector('.intro').style.display = 'none';

    intervalPage.style.transform = 'translateX(0%)';
    intervalPage.style.visibility = 'visible';
    intervalPage.style.opacity = '1';
    
    // intervalPage.style.transition = 'all 0.5s ease-in-out';
    // intervalPage.style.flexDirection = 'column';
    // intervalPage.style.justifyContent = 'center';
    // intervalPage.style.alignItems = 'center';
    

    blink.style.display = "flex";
    underBar.style.display = "flex";


    let gamePage = document.querySelector('.game-page');
    setTimeout(() => {
        gamePage.style.visibility = "visible";
        gamePage.style.display = "flex";
        gamePage.style.transition = "all 0.5s linear";
        gamePage.style.opacity = "1";
        gamePage.style.transform = "scale(1)";
        document.querySelector('.interval').style.display = 'none';
    }, 7000);
}


playBtn.addEventListener('click', () => {
     startGame();
     setTimeout(() => {
        document.querySelector('.bet-page').style.display = 'flex';

     }, 10500);
})

playBtnBn.addEventListener('click', () => {
     startGame();
     setTimeout(() => {
        document.querySelector('.bet-page').style.display = 'flex';

     }, 10500);

})




let cards = ['joker', 'queen', 'king'];

function shuffleCards(cards){
    console.log(cards);
    for(let i = 0; i < 10; i++){
        var x = Math.random();
        var y = Math.random();

        var pos1 = Math.round(x * 10) % 3;
        var pos2 = Math.round(y * 10) % 3;

        var temp = cards[pos1];
        cards[pos1] = cards[pos2];
        cards[pos2] = temp;

        console.log(pos1 + " " + pos2);
    }
    console.log(cards);
}


let currentAmount = parseInt((document.getElementById('current-amount').innerHTML).substring(1));

document.getElementById('okay').addEventListener('click', () => {
    if(currentAmount <= 0){
        location.reload()
    }
    else{

        document.querySelector('.cards-container').style.display = 'none';
    }
})

let betBtn = document.getElementById('bet-btn');

let betInput = document.getElementById('bet-input');
let betAmount = 0;
let cardsActive = false;
let result = false;


betBtn.addEventListener('click', () => {
    cardsActive = true;
    result = true;

    document.getElementById('bet-amount').style.display = 'flex';
    betAmount = parseInt(betInput.value);
    betInput.value = "$";


    if(betAmount && betAmount <= currentAmount){
        document.getElementById('placed-amount').innerHTML += betAmount;

        document.getElementById('place-bet').style.display = 'none';

        document.querySelector('.message').style.display ='none';

        document.querySelector('.shuffle').style.display ='flex';

        document.querySelector('.cards-container').style.display = 'flex'
        document.querySelector('.cards-container').style.background = 'rgba(37, 37, 37, 0.8)'
        let secondBlink = document.querySelectorAll('.blink')[1]
        secondBlink.style.display = 'flex';
        secondBlink.style.alignItems = 'flex-end';
        secondBlink.style.margin = '1.1rem 0 0 0';

        setTimeout(() => {
            let cards = document.querySelectorAll('.card');
            cards.forEach((card) => {
                card.style.display = 'flex';
            })
            document.querySelector('.guess').style.display = 'flex';
            document.querySelector('.shuffle').style.display = 'none';
            document.querySelector('.cards-container').alignItems = 'flex-start';
        },6500)


        shuffleCards(cards);
    }
    if(betAmount > currentAmount){
        document.querySelector('.cards-container').style.display = "flex";
        document.querySelector('.cards-container').style.background = 'rgba(37, 37, 37, 0.8)';
        document.querySelector('.shuffle').style.display ='none';
        document.querySelector('.message').style.display ='flex';
    }

})




console.log(currentAmount);

let cardTags = document.querySelectorAll('.card');
cardTags.forEach((card, index) => {
    card.addEventListener('click', () => {
        // card.innerHTML = cards[index];
        if(result && cardsActive){
            if(cards[index]=='queen'){
                currentAmount += 3*betAmount;
            }
            else{
                currentAmount -= betAmount;
            }
            result = false;
        }
        if(cardsActive){
            card.innerHTML = cards[index];
            document.getElementById('current-amount').innerHTML = `$${currentAmount}`;
        }
        document.getElementById('place-bet').style.display = 'flex';
        document.getElementById('placed-amount').innerHTML = "$";
        document.getElementById('bet-amount').style.display = 'none';

        document.getElementById('bet-input').style.display = 'none';
        document.getElementById('bet-btn').style.display = 'none';
        if(currentAmount > 0){

            document.getElementById('bet-btn-new').style.display = 'block';
        }
        // out of money-------------------------------
        if(currentAmount <= 0){
            document.querySelector('.bet-area').style.display = 'none';

            document.querySelector('.shuffle').style.display = 'none';


            let cards = document.querySelectorAll('.card');
            cards.forEach((card) => {
                card.style.display = 'none';
                card.innerHTML = "?";
            })
            document.querySelector('.guess').style.display = 'none';

            document.querySelector('.message').style.display = 'flex';
            document.getElementById('message').innerText = "You are out of money";
            document.getElementById('okay').innerText = "Start Again";
        }
    })
})

document.getElementById('bet-btn-new').addEventListener('click', () => {
    document.getElementById('bet-input').style.display = 'block';
    document.getElementById('bet-btn').style.display = 'block';
    document.getElementById('bet-btn-new').style.display = 'none';

    document.querySelector('.cards-container').style.display = "none";
    document.querySelector('.shuffle').style.display = "flex";

    let cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.style.display = 'none';
        card.innerHTML = "?";
    })
    document.querySelector('.guess').style.display = 'none';
})

