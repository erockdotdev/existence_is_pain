
//Start jquery
$( document ).ready(function() {
    console.log( "ready!" );
 
 $('#fade').fadeIn(1000);// fades page in on initial load.


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


let scoreValue = 0; // initial score value
const scoreCounter = $('#scorecounter');// I have a span with the id of score counter and I set it to the variable scoreCounter

scoreCounter.html(scoreValue);// Takes the value in scoreValue and places it in the span score counter this is placed here 
	//to display initial value, before anything is added to it 


////////End Score//////////////////////////////////////////////
///////////////////////////////////////////////////////////////



//////Timer////////////////////////////////////////////////////

let startTime = 42; // initial time value
const timeCounter = $('#timecounter'); // I have a span with the id of timecounter and I set it to the variable timeCounter

timeCounter.html(startTime);// takes the value in startTime and places it in the span timeCounter 
		//this is here to show the initial value in the counter before it is subtracted from.

// The following function takes the startTime value and reduces the value by 1 every second.
// It has an if statement to clear the interval at -1 (that way we see zero on screen)
// and it triggers the endwindow to display (defined later) that shows 'your score' and the game reset and end options
function countDown(){
	
	const time = setInterval(function(){
	timeCounter.html(startTime)	
	startTime -= 1;
/////////Above, start counter - Below, condition to end timers countdown///////////////////////	
	if (startTime === -1){
	clearInterval(time);
	$('#endwindow').css('display', 'initial');///// the end window displaying score is hidden until this point

	}}, 1000);} 


//////End Timer////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


//////gameboard and properities/////////////////////////
const gameBoard = document.getElementById('gameboard') // sets the gameboard div to the variable gameBoard

//when the gameboard is clicked I want that to count as a miss. the score will be subtracted from, the screen will flash, and the sound will play

$(gameBoard).click(function(){
laser.play();
	
	if (scoreValue <=400){//this if statement keeps the score from showing a negative number
		scoreValue = 0
		scoreCounter.html(scoreValue)
	} else {
		scoreValue -= 300;//deduct 300 points from player
		laser.play();//sound effect
	scoreCounter.html(scoreValue);//update score counter
	finalScore.innerHTML = `YOU SCORED<br /> ${scoreValue} points`;//this is one of two locations(add to score is the second) that post to the finalscore window. that way the final
	//score will reflect the latest addition or subtraction
	}//end if else

	$(gameBoard).css('background', 'rgba(33,230,227, .75)');//when the background is clicked it changes to this blue-ish color
	setTimeout(function(){
	$(gameBoard).css('background', 'rgba(0, 0, 0, .0)')  }, 100);// the timeout is set so after just a quick flash the background changes from that bluish clolor back to black, creating a flash
});




//////Create Square/////////////////////////
function createSquare(){
	
	let square = document.createElement('div');//creates the div that will be given attributes and appended to be the squares
	
	// a big problem I had was getting new blocks to spawn in random locations I knew how to set the display  and adjust top and left
	//to get it in a new position, but with help from Matt I have a way to create random values and use them as the values for the 
	// top and left position
	let left = Math.random() * 550;
	let top = Math.random() * 460;
	// console.log("left =====> " + left);
	// console.log("top =====> " + top)
	
	square.setAttribute('class', 'block');// gives the newly created div the class of block
		$(square).css('left', left);// this is how values to spawn in new random positions declared
		$(square).css('top', top);
		// $(square).css('background', 'red');// this oversides the css styling - i'll need to comment this out initialy used 
										   //to see the difference between the static HTML div I created and the dynamically created divs
 		//
		square.addEventListener('click', function(event){ // This is where I had to but the event listener in order for it to work on dynamically created dom elements
			event.stopPropagation();
			$(square).css('display', 'none');// this makes the square that was clicked to disappear
			scoreValue += 500;				 // this adds to the score
			scoreCounter.html(scoreValue);   // this updated the innerHTML of the score counter span to the updated scoreValue 
			finalScore.innerHTML = `YOU SCORED<br />  ${scoreValue} points`; // this is for the endwindow | it takes the score value and places it 
			// in the innerHTML at the end of the game. It has to be placed in here to send the updated scoreValue to finalScore. if this is 
			// outside of the eventlistener, it will not show the updated scoreValue but the initial value of scoreValue which is 0.
			goodBye.play();

			createSquare();//the click event is a call back will create the a new square with all of these attributes
			createSquare();// this is to create a second square
			// console.log('score:', scoreValue)
			// return scoreValue;
			});

	gameBoard.appendChild(square);// puts square on the game
	
	animateDiv(); // runs animate div	
}

/////////End Create Square//////////////////////////////////////



///////////startbutton/////////////////////////

let button = document.getElementById('start');

	

	button.addEventListener('click', function(){
		startTime = 42;// this is just used to overwrite counter time for testing
		$('#startwindow').css('display', 'none');// hides start window/startbutton
		$('#howtoplaywindow').css('display', 'none');
		startTime = 42;
		hello.play(); 
		createSquare();// creates square 
		countDown();//starts countdown I put count down in a fucntion to be called so countdown doesnt start when the page loads
	});
	
////////////End Start Button/////////////////////////


//////Reset Button/////////////////////////////

let reset = document.getElementById('reset');

	reset.addEventListener('click', function(){
		$('#gameboard').empty();//clears gameboard
		
		$('#scorecounter').empty();// clears scorecounter
		$('#scorecounter').html(0);// sets countervalue to 0 otherwise on reset it would be blank on reset

		$('#timecounter').empty(); //clears timer
		$('#timecounter').html(42); // sets timer back to 42 otherwise it would be blank on reset and will take a second to appear

		$('#startwindow').css('display', 'initial');
		$('#endwindow').css('display', 'none');// makes end window disappear
		hello.play(); 
		//end button is reset minus the last 4 lines
		$('#startwindow').css('display', 'none');
		startTime = 42;
		scoreValue = 0;
		createSquare();
		countDown();
	});
/////////////////END RESET/////////////////////


//////////END BUTTON////////////////////////////
let end = document.getElementById('end');

	end.addEventListener('click', function(){
		$('#gameboard').empty();//clears gameboard/ found this jquery code. it clears all children of a parent
		
		$('#scorecounter').empty();// clears scorecounter
		$('#scorecounter').html(0);// sets countervalue to 0 otherwise on reset it would be blank on reset

		$('#timecounter').empty(); //clears timer
		$('#timecounter').html(42); // sets timer back to 42 otherwise it would be blank on reset and will take a second to appear
		meeseeks.play();
		hello.play(); 
		$('#startwindow').css('display', 'initial');
		$('#endwindow').css('display', 'none');// makes end window disappear
	});

///////////////END END BUTTON///////////////////////////

///////////////HOW TO PLAY BUTTON - in start menu/////
let howToPlay = $('#howtoplaybutton')

$(howToPlay).on('click', function(){
	$('#howtoplaywindow').css('display','initial');
	$('#startwindow').css('display', 'none');
	hello.play(); 
})

$('#howtoplaywindow').css('display', 'none');

/////////////////////////////////////

/////play button - how to play window/////////

let play = $('#play');

$(play).on('click', function(){
	$('#howtoplaywindow').css('display', 'none');
	$('#startwindow').css('display', 'none');// hides start window/startbutton
	$('#gameboard').empty();//clears gameboard
		
		$('#scorecounter').empty();// clears scorecounter
		$('#scorecounter').html(0);// sets countervalue to 0 otherwise on reset it would be blank on reset

		$('#timecounter').empty(); //clears timer
		$('#timecounter').html(42); // sets timer back to 42 otherwise it would be blank on reset and will take a second to appear

		$('#startwindow').css('display', 'initial');
		$('#endwindow').css('display', 'none');// makes end window disappear
		hello.play(); 
		//end button is reset minus the last 4 lines
		$('#startwindow').css('display', 'none');
		startTime = 42;
		scoreValue = 0;




		createSquare();// creates square 
		countDown()

})
///////////END play button///////////

let backButton = $('#back');

$(backButton).on('click', function(){
		$('#startwindow').css('display', 'initial');
		$('#endwindow').css('display', 'none');// makes end window disappear
		$('#howtoplaywindow').css('display', 'none');
		goodBye.play();
	});

















///////////////END WINDOW FINAL SCORE///////
//after timer runsout this window appears. it displays the finalscore(pulled from that event listener) and the reset and end buttons

let endWindow = document.getElementById('endwindow');
let finalScore = document.createElement('h1');

	endWindow.appendChild(finalScore)


///////////////////////////////

/////DO NOT DELETE the following code 

let hard = $('#hard');
$(hard).click(function(){

{	scoreValue -= 500;
	scoreCounter.html(scoreValue);
	}//end if else
/////// this is a left over from trying to make a hard mode button
//it is connected to nothing, but if i delete it game wont start

});


//SOUNDS/////////////////
// PLAY THEME
$("#music").get(0).play();


/// add sound so mrmrseeks

let goodBye = document.createElement('audio');
goodBye.setAttribute('src','./sounds/goodbye.mp3');

goodBye.play();


let hello = document.createElement('audio');
hello.setAttribute('src','./sounds/hello.mp3');
// hello.play(); 

let meeseeks = document.createElement('audio');
meeseeks.setAttribute('src','./sounds/lookatme.mp3');
meeseeks.play();

let laser = document.createElement('audio');
laser.setAttribute('src','./sounds/Laser2.mp3');
















});//end jquery









