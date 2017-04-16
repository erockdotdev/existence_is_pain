// class Square {
// 	constructor(h, w,){
// 		this.h = h;
// 		this.

// 	}



// }



//Start jquery
$( document ).ready(function() {
    console.log( "ready!" );


//////Random Movement and Speed////////////////////////////////////////////////////

//this was used from the animate lab we did with joe
// this takes the gameboard height and width and adds math.random to create new values for height and width 
//this is done to give random values to animate div


function makeNewPos(){
  let h = $('#gameboard').height() - 50;//-70 and -50 so the new vlues dont get too cloade to the border of the gme board
  let w = $('#gameboard').width() - 130;
  let nh = h * Math.random();
  let nw = w * Math.random();
  return [nw,nh] //returns an array with one array index for each position
}

// edit the animateDiv() function so that it uses the makeNewPos() function
// and uses the jquery .animate() method to keep randomly moving it

//take an element and moves it from its original position and to a new on on a loop and with a set speed
function animateDiv(){
let random = makeNewPos();

	  $('.block').animate({ //anything with the class block will move
		 top:random[0], // this is where the make new position values are used
		left:random[1]
	}, 1000, function(){
		animateDiv() // call back to itself otherwise it would only run once
	});
	  
	} 

// animateDiv();//runs animate div
//////End Random Movement////////////////////////////////////////////////////


//////Score ////////////////////////////////////////////////////
//here I tried making an event listener to add to the score and create new blocks when anything with the class of block was clicked on.
//set here, this only worked on html created objects and not dynamicaly created ones. meaning the first click would add to the score and 
// create new div elements, but clicks on those created elements did nothing. that was solved later in the create square function


let scoreValue = 0; // initial score value
let scoreCounter = $('#scorecounter');// I have a span with the id of score counter and I set it to the variable score Counter

	scoreCounter.html(scoreValue);// takes the value in scoreValue and places it in the span score counter this is placed here 
	//to display initial value, before anything is added to it 

// let block = $('.block')

// function score(){
// $(block).on('click', function(){
// 	scoreValue += 500;
// 	createSquare();
// scoreCounter.html(scoreValue);
// 	});
// // console.log('score:', scoreValue)
// }

// score();

///LOOSE POINTS//////


////////End Score//////////////////////////////////////////////


//////Timer////////////////////////////////////////////////////

let startTime = 42; // initial time value
let timeCounter = $('#timecounter'); // I have a span with the id of timecounter and I set it to the variable timeCounter

	timeCounter.html(startTime);// takes the value in startTime and places it in the span timeCounter 
		//this is here to show the initial value in the counter before it is subtracted from.

//this function takes the startTime value and reduces the value by 1 every second
// it has an if statement to clear the interval at one
// and it triggers the endwindow to display (defined later) that shows 'your score' and the game reset option 
function countDown(){
	
	let time = setInterval(function(){
	timeCounter.html(startTime)	
		startTime -= 1;
/////////Above, start counter - Below, condition to end timers countdown///////////////////////	
	if (startTime === -1){
		clearInterval(time);
		$('#endwindow').css('display', 'initial');///// the end window displaying score is hidden until this point
		// alert(`Your score: ${scoreValue} points`);

	}
	}, 1000);
	} 


//////End Timer///////////////////////////////////////////
//// these notes are from Matt on creating classes
// class Square {
// 	constructor(xAxis, yAxis) {
//       this.xAxis = xAxis;
// 	}
// 	createSquare() {

// 	}
// 	animateDiv() {

// 	}
// }

// let square = new Square();
// square.createSquare();

//////Create Square/////////////////////////
let gameBoard = document.getElementById('gameboard') // sets the gameboard div to the variable gameBoard

$(gameBoard).click(function(){

	
	if (scoreValue <=99){
		scoreValue = 0
		scoreCounter.html(scoreValue)
	} else {
		scoreValue -= 100;
	scoreCounter.html(scoreValue);
	finalScore.innerHTML = `Your score ${scoreValue} points`;
	}//end if else

	$(gameBoard).css('background', 'rgba(33,230,227, .75)');
	setTimeout(function(){
	$(gameBoard).css('background', 'rgba(0, 0, 0, .0)')  }, 100);
});





function createSquare(){
	
	let square = document.createElement('div');//creates the div that will be given attributes and appended to be the squares
	
	// a big problem I had was getting new blocks to spawn in random locations I knew how to set the display  and adjust top and left
	//to get it in a new position, but with help from Matt I have a way to create random values and use them as the values for the 
	// top and left position
	let left = Math.random() * 500;
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
			finalScore.innerHTML = `Your score ${scoreValue} points`; // this is for the endwindow | it takes the score value and places it 
			// in the innerHTML at the end of the game. It has to be placed in here to send the updated scoreValue to finalScore. if this is 
			// outside of the eventlistener, it will not show the updated scoreValue but the initial value of scoreValue which is 0.


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
		startTime = 10;// this is just used to overwrite counter time for testing
		$('#startwindow').css('display', 'none');// hides start window/startbutton
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

		$('#startwindow').css('display', 'initial');
		$('#endwindow').css('display', 'none');// makes end window disappear
	});

///////////////END END BUTTON///////////////////////////


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




/////////////Score Card///////////
// let zero = startTime

// function scoreCard(){

// if (zero === 0){

// let scoreCard = document.createElement('div');

// scoreCard.setAttribute('class', 'scorecard');

// gameBoard.appendChild(scoreCard);


// }scoreCard();











});//end jquery









