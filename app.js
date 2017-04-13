
//Start jquery
$( document ).ready(function() {
    console.log( "ready!" );


//////Random Movement////////////////////////////////////////////////////
//this was used from the animate lab we did with joe
function makeNewPos(){
  let h = $('#gameboard').height() - 70;
  let w = $('#gameboard').width() - 50;
  let nh = h * Math.random();
  let nw = w * Math.random();
  return [nw,nh]
}

// edit the animateDiv() function so that it uses the makeNewPos() function
// and uses the jquery .animate() method to keep randomly moving it
function animateDiv(){
let random = makeNewPos();

  $('.block').animate({
	 top:random[0],
	left:random[1]
}, 1000, function(){
	animateDiv()
});
  
} 

animateDiv();
//////End Random Movement////////////////////////////////////////////////////


//////Score////////////////////////////////////////////////////

let scoreValue = 0;
let scoreCounter = $('#scorecounter');
let block = $('.block')


$(block).on('click', function(){
	scoreValue += 500;
	createSquare();
scoreCounter.html(scoreValue);
	});

scoreCounter.html(scoreValue);


////////End Score//////////////////////////////////////////////


//////Timer////////////////////////////////////////////////////

let startTime = 42;
let timeCounter = $('#timecounter');

timeCounter.html(startTime);

function countDown(){
	let time = setInterval(function(){
	timeCounter.html(startTime)	
		startTime -= 1;
	if (startTime === -1){
		clearInterval(time);
		// alert(`Your score: ${scoreValue} points`);

	}
	}, 3000);
	} 
countDown();

//////Create Square///////


function createSquare(){
	let gameBoard = document.getElementById('gameboard')
	let createSquare = document.createElement('div');
	
	createSquare.setAttribute('class', 'block');
	$(createSquare).css('left', '5px');
	$(createSquare).css('background', 'red');
		
	gameBoard.appendChild(createSquare);
	animateDiv();	
}

///////////////////////////////////////////////


let button = document.getElementById('makeasquare');

button.addEventListener('click', function(){
	createSquare();
});















});//end jquery