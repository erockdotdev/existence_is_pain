
// Start jQuery
$( document ).ready(function() {
    console.log( "ready!" );
// fades page in on initial load. 
$('#fade').fadeIn(1000);


//////Random Movement and Speed////////////////////////////////
/* this was used from the animate lab we did with joe
this takes the gameboard height and width and adds math.random to create new values for height and width 
this is done to give random values to animate div */

// -50and -142 so the new values don't get too close to the border of the game board
function makeNewPos() {
  let h = $('#gameboard').height() - 50;
  let w = $('#gameboard').width() - 142;
  let nh = h * Math.random();
  let nw = w * Math.random();
 
 // returns an array with one array index for each position
  return [nw,nh] 
}



// takes an element and moves it from its original position and to a new on on a loop and with a set speed
function animateDiv() {
  let random = makeNewPos();
  // anything with the class block will move
  $('.block').animate({ 
  // this is where the make new position values are used
  top:random[0], 
  left:random[1]
  }, 1000, function() {
  // call back to itself otherwise it would only run once
  animateDiv() 
});
  
} 
//////End Random Movement//////////////////////////////////////
///////////////////////////////////////////////////////////////




//////Score ////////////////////////////////////////////////////
/*here I tried making an event listener to add to the score and create new blocks when anything with the class of block was clicked on.
if I set the listener here, it only worked on html created objects and not dynamicaly created ones. Meaning the first click would add to the score and 
create new div elements, but clicks on those created elements did nothing. I solved that by adding the eventlistener directly to the dynamically 
created divs*/

// initial score value
let scoreValue = 0; 
// I have a span with the id of score counter and I set it to the variable scoreCounter
const scoreCounter = $('#scorecounter');

/* Takes the value in scoreValue and places it in the span score counter this is placed here 
to display initial value, before anything is added to it */
scoreCounter.html(scoreValue); 
////////End Score//////////////////////////////////////////////
///////////////////////////////////////////////////////////////



//////Timer////////////////////////////////////////////////////

// initial time value
let startTime = 42; 
// I have a span with the id of timecounter and I set it to the variable timeCounter
const timeCounter = $('#timecounter'); 
/* Takes the value in startTime and places it in the span timeCounter 
this is here to show the initial value in the counter before it is subtracted from. */
timeCounter.html(startTime);

/* The following function takes the startTime value and reduces the value by 1 every second.
It has an if statement to clear the interval at -1 (that way we see zero on screen)
and it triggers the endwindow to display (defined later) that shows 'your score' and the game reset and end options */
function countDown() {
	
  const time = setInterval(function() {
  timeCounter.html(startTime)	
  startTime -= 1;
 //Above, start counter - Below, condition to end timers countdown/	
  if (startTime === -1) {
	clearInterval(time);
	// the end window displaying score is hidden until this point
	$('#endwindow').css('display', 'initial');///

	}}, 1000);}; 


//////End Timer////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


//////GAMEBOARD AND PROPERITIES///////////////////////////////
// When the gameboard is clicked I want that to count as a miss. The score will be subtracted from, the screen will flash, and the sound will play.
// Sets the gameboard div to the variable gameBoard
const gameBoard = document.getElementById('gameboard'); 

  $(gameBoard).click(function() {
  laser.play();
  // this if statement keeps the score from showing a negative number
  if (scoreValue <=300) {
	scoreValue = 0
    scoreCounter.html(scoreValue)
  } else {
		// deduct 300 points from player
	scoreValue -= 300;
	// sound effect
	laser.play();
    //update score counter
    scoreCounter.html(scoreValue);
    /* this is one of two locations(add to score is the second) that post to the finalscore window. that way the final
    score will reflect the latest addition or subtraction */
    finalScore.innerHTML = `YOU SCORED<br /> ${scoreValue} points`;
	}//end if else
	// When the background is clicked it changes to this blue-ish color
	$(gameBoard).css('background', 'rgba(33,230,227, .75)');
	// The timeout is set so after just a quick flash the background changes from that bluish clolor back to black, creating a flash
	setTimeout(function() {
	$(gameBoard).css('background', 'rgba(0, 0, 0, .0)')  }, 100);
});
//////GAMEBOARD AND PROPERITIES////////////////////////////////
///////////////////////////////////////////////////////////////



//////Create Square/////////////////////////
function createSquare(){
// Creates the div that will be given attributes and appended to be the gameboard. NOTE: I'm using circles now, but the original code was written for squares
  let square = document.createElement('div');
	
	/*A big problem I had was getting new blocks to spawn in random locations I knew how to set the display and adjust top and left
	to get it in a new position, but with help from Matt I have a way to create random values and use them as the values for the 
	top and left position*/
  let left = Math.random() * 550;
  let top = Math.random() * 460;
  // Gives the newly created div the class of block
  square.setAttribute('class', 'block');
  // This is how values to spawn in new random positions declared
  $(square).css('left', left);
  $(square).css('top', top);
  /*$(square).css('background', 'red');
  this oversides the css styling - i'll need to comment this out initialy used 
  to see the difference between the static HTML div I created and the dynamically created divs*/
	
  // This is where I had to but the event listener in order for it to work on dynamically created dom elements	
  square.addEventListener('click', function(event) { 
  // This was a great code I found on w3. The eventlisteners on the divs created here were triggering the eventlistener on the game board(bubbling up). This fixed that 
  event.stopPropagation();
  // This makes the square that was clicked to disappear
  $(square).css('display', 'none');
  // Adds to the score
  scoreValue += 500;				 
  // Updates the innerHTML of the score counter span to the updated scoreValue 
  scoreCounter.html(scoreValue);   
  /* This is for the endwindow. It takes the score value and places it 
  in the innerHTML at the end of the game.(the second area I mentioned earlier) It has to be placed in here to send the updated scoreValue to 
  finalScore. If this is outside of the eventlistener, it will not show the updated scoreValue but the initial value of scoreValue which is 0.*/
  finalScore.innerHTML = `YOU SCORED<br />  ${scoreValue} points`; 
  // Sound created when clicked
  goodBye.play();
  // The click event is a call back will create the a new square with all of these attribute and then another one.
  createSquare();
  createSquare();
  });
  // Puts square on the game
  gameBoard.appendChild(square);
  // Runs animate div	
  animateDiv(); 
}

/////////End Create Square//////////////////////////////////////
////////////////////////////////////////////////////////////////


//BUTTONS//////////////////////////////////////////////////////


///////////startbutton/////////////////////////

// Start the Game
let button = document.getElementById('start');
button.addEventListener('click', function() {
  // Setting the startTime here can be used overwrite startTime for testing
  startTime = 42;

  // Hides start window and all its children
  $('#startwindow').css('display', 'none');
  // hides How to Play and its children
  $('#howtoplaywindow').css('display', 'none');
  // Play sound on click
  hello.play(); 
  // Creates initial mr meseek
  createSquare();
  // Starts timer I put timer in a fucntion to be called so countdown doesn't start when the page loads
  countDown();
  });
	
////////////End Start Button////////////////////////////////////
////////////////////////////////////////////////////////////////


//////Reset Button/////////////////////////////
// Clears elemets and gives back original values

let reset = document.getElementById('reset');

reset.addEventListener('click', function() {
  //clears gameboard
  $('#gameboard').empty();
  // clears scorecounter
  $('#scorecounter').empty();
  // Sets countervalue to 0 otherwise on reset it would be blank on reset
  $('#scorecounter').html(0);
  // Clears timer
  $('#timecounter').empty(); 
  // Sets timer back to 42 otherwise it would be blank on reset and will take a second to appear
  $('#timecounter').html(42); 
  // Shows start window
  $('#startwindow').css('display', 'initial');
  // makes end window disappear
  $('#endwindow').css('display', 'none');
  // Play sond on click
  hello.play(); 
  // Makes startwindow dissappear: I need to check if there was a reason why I set it then remove it in this button
  $('#startwindow').css('display', 'none');
  // Resets time: again, I have to check if there is a reason why i have this set after setting it above
  startTime = 42;
  scoreValue = 0;
  // Start the game
  createSquare();
  countDown();
  });
/////////////////END RESET//////////////////////////////////////
////////////////////////////////////////////////////////////////


//////////END BUTTON////////////////////////////
let end = document.getElementById('end');

end.addEventListener('click', function() {
  // Clears gameboard - found this jquery code. it clears all children of a parent.
  $('#gameboard').empty();
  // Clears scorecounter
  $('#scorecounter').empty();
  // Sets countervalue to 0 otherwise on reset it would be blank on reset 
  $('#scorecounter').html(0);
  // Clears timer
  $('#timecounter').empty(); 
  // Sets timer back to 42 otherwise it would be blank on reset and will take a second to appear
  $('#timecounter').html(42);
  // Plays sound on click
  meeseeks.play();
  // Plays sound on click
  hello.play(); 
  // Shows startwindow again
  $('#startwindow').css('display', 'initial');
  // Makes end window disappear
  $('#endwindow').css('display', 'none');// makes end window disappear
  });

///////////////END END BUTTON///////////////////////////////////
////////////////////////////////////////////////////////////////

///////////////HOW TO PLAY BUTTON - in start menu/////
let howToPlay = $('#howtoplaybutton')
// Brings to how to play window
$(howToPlay).on('click', function() {
  // How to Play window comes up
  $('#howtoplaywindow').css('display','initial');
  // Starwindow disapears
  $('#startwindow').css('display', 'none');
  // play sound
  hello.play(); 
  });
// How to play is initialy set to none so it doesnt show up  when the page loads
$('#howtoplaywindow').css('display', 'none');

////////////////////End HOW TO PLAY BUTTON//////////////////////
////////////////////////////////////////////////////////////////



/////PLAY button - how to play window(not the same as start button)/////////

let play = $('#play');

$(play).on('click', function() {
  $('#howtoplaywindow').css('display', 'none');
  // hides start window/startbutton
  $('#startwindow').css('display', 'none');
  // Clears gameboard
  $('#gameboard').empty();
  // Clears scorecounter
  $('#scorecounter').empty();
  // Sets countervalue to 0 otherwise on reset it would be blank on reset
  $('#scorecounter').html(0);
  // Clears timer
  $('#timecounter').empty(); 
  // Sets timer back to 42 otherwise it would be blank on reset and will take a second to appear
  $('#timecounter').html(42); 

  $('#startwindow').css('display', 'initial');
  // Makes end window disappear
  $('#endwindow').css('display', 'none');
  // play sound
  hello.play(); 

  $('#startwindow').css('display', 'none');
  startTime = 42;
  scoreValue = 0;

  createSquare();
  countDown()

  });
///////////END PLAYbutton///////////////////////////////////////
////////////////////////////////////////////////////////////////

///////////BACK button//////////////////////////////////////////

// This button had porperities that i think are self explanitory after reading the previous buttons
let backButton = $('#back');

$(backButton).on('click', function(){
  $('#startwindow').css('display', 'initial');
  // makes end window disappear
  $('#endwindow').css('display', 'none');
  $('#howtoplaywindow').css('display', 'none');
  goodBye.play();
	});




/////////////END OF BUTTONS/////////////////////////////////////
////////////////////////////////////////////////////////////////



///////////////END WINDOW FINAL SCORE///////
// After timer runsout this window appears. It displays the finalscore and the reset and end buttons.

let endWindow = document.getElementById('endwindow');
let finalScore = document.createElement('h1');
  endWindow.appendChild(finalScore);


////////////////////////////////////////////////////////////////

/////DO NOT DELETE the following code 
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
let hard = $('#hard');
$(hard).click(function(){

{	scoreValue -= 500;
	scoreCounter.html(scoreValue);
	}//end if else
/////// this is a left over from trying to make a hard mode button
//it is connected to nothing, but if i delete it game wont start

});
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////




//SOUNDS/////////////////


// This is where I set the audio files for the event listeners;

// PLAY THEME I found the jQuery code to auto play music
$("#music").get(0).play();
////////////////////////////////////////////////////////////////
let goodBye = document.createElement('audio');
  goodBye.setAttribute('src','./sounds/goodbye.mp3');

  goodBye.play();
////////////////////////////////////////////////////////////////

let hello = document.createElement('audio');
  hello.setAttribute('src','./sounds/hello.mp3');
// hello.play(); 
////////////////////////////////////////////////////////////////
let meeseeks = document.createElement('audio');
  meeseeks.setAttribute('src','./sounds/lookatme.mp3');
  meeseeks.play();
////////////////////////////////////////////////////////////////
let laser = document.createElement('audio');
  laser.setAttribute('src','./sounds/Laser2.mp3');

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

//END///////////////////////////////////////////////////////////

class Attempt {
	constructor(name , sentence){
		this.name = name;
		this.sentence = sentence;
	}
}

let x = new Attempt('Eric', 'This probably won\'t count even if it works' )
// but it does work if I console log x!
console.log(x)

/////////////////////////////////////////////////////////////

// class Footer {
// 	constructor(){
// 		this.url = './images/Mr._Meeseeks_Box.png';
// 		;
// 	}
// }

// let footer = new Footer();
// document.body.appendChild(footer)

// console.log(footer)

//this..this does not work




});// End jquery









