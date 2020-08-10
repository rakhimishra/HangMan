const wordE1=document.getElementById("word");
const wronglettersE1=document.getElementById("wrong-letters");
const playAgain = document.getElementById("play-button");
const popup=document.getElementById("popup-container");
const notification =document.getElementById("notification-container");
const finalMessage=document.getElementById("final-message");
const finalMessagerevealword=document.getElementById("final-message-reaveal-word");

const figureParts=document.querySelectorAll(".figure-part");
const words=["application","programming","interface","wizard"];

let selectedword= words[Math.floor(Math.random()*words.length)];
let playable=true;

const correctLetter=[];
const wrongletters=[];
//show hidden word
function displayWord(){
    wordE1.innerHTML=`
    ${selectedword.split('').map(letter=>{
        return `<span class="letter">
        ${correctLetter.includes(letter)?letter:''}
        </span>`
    }).join('')}
    `;
    const innerWord = wordE1.innerText.replace(/[\n]/g,'');
    console.log(innerWord);
    if(innerWord===selectedword){
        finalMessage.innerText="congratulations you won!😊😄";
        popup.style.display="flex";
        playable=false;
    }
}
function showNotification(){
    notification.classList.add("show");
    setTimeout(function(){
        notification.classList.remove("show");
    },2000);
}
function updateWrongLetterEl(){
    //display wrong letters
    console.log(wronglettersE1);
    wronglettersE1.innerHTML=`
    ${wronglettersE1.length>0?`<p>Wrong letters</p>`:''}
    ${wrongletters.map(letter=>`<span>${letter}</span>`)}
    `
    figureParts.forEach((part,index)=> {
        const error =wrongletters.length;
        if(index < error){
            part.style.display="block";
        }
        else{
            part.style.display="none";
        }
        
    });
    if(wrongletters.length===figureParts.length){
        finalMessage.innerText="unfortunately you lost😯😯";
        popup.style.display="flex";
        playable=false;

    }

}
//add eventlistener for key press
window.addEventListener('keydown',e=>{
    if(playable){
        if(e.keyCode>=65 && e.keyCode<=90){
            const letter=e.key.toLowerCase();
            if(selectedword.includes(letter)){
                if(!correctLetter.includes(letter)){
                    correctLetter.push(letter);
                    displayWord();
                    return;
                }
                //if that key is already pressed
                else{
                    //letter in string and alreday pressed
                    showNotification();
                    return;
                }
            }
            if(!wrongletters.includes(letter)){
                //letter not in string
                wrongletters.push(letter);
                updateWrongLetterEl();
                return;
            }
            else{
                //letters not pressed also letter already pressed
                showNotification();
                return;
            }
        }
    }
});
//restart the game
playAgain.addEventListener("click",function(){
    playable=true;
    correctLetter.splice(0);
    wrongletters.splice(0);

    selectedWord=words[Math.floor(Math.random()*words.length)];
    displayWord();
    updateWrongLetterEl();
    popup.style.display="none";
})


displayWord();