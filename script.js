// global constants
var strikes = 0;
const clueHoldTime = 500; //how long to hold each clue's light/sound mmeasure in milliseconds 1000 mili = 1 second
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playq

//Global Variables
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;

 

//starting the game
function startGame() {
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  strikes = 2;
 
  //getRandomInt();
  for(let i=0;i<pattern.length;i++)
    {
      pattern[i]=getRandomInt();
    }
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("pauseBtn").classList.remove("hidden");
  playClueSequence();
}
function pauseGame() {
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("pauseBtn").classList.add("hidden");
 
}
// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}



//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

function lightButton(btn){
  document.getElementById("Btn"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("Btn"+btn).classList.remove("lit")
}
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}
function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms") //getRandomInt()
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
}
function loseGame(){
  pauseGame();
  alert("Game Over. You lost.");
}
function winGame(){
  pauseGame();
  alert("Game Over. You won!");
}
function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  if(pattern[guessCounter] == btn)
  {
    //Guess was correct!
    if(guessCounter == progress)
    {
      if(progress == pattern.length - 1)
      {
        //GAME OVER: WIN!
        winGame();
      }else{
        //Pattern correct. Add next segment
        progress++;
        playClueSequence();
      }
    }
    else 
    {
      //so far so good... check the next guess
      guessCounter++;
    }
  }
  /*
  else if( )
    {
      
    }*/
    else if(strikes <= 0)
    {
      //Guess was incorrect
      //GAME OVER: LOSE!
      loseGame();
      
    }
  else
    {
      strikes -=1; 
      playClueSequence();
       
     
    }
  // add game logic here
  
}

function getRandomInt() {
  //max = 4;
  //const num = 
  return Math.ceil(Math.random() * Math.floor(4));//max));
}

    
 

/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");