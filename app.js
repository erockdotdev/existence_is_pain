
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
}, 2000, function(){
	animateDiv()
});
  
} 

animateDiv();
//////End Random Movement////////////////////////////////////////////////////


//////Score////////////////////////////////////////////////////
let scoreValue = 0;
let scoreCounter = $('#scorecounter');


$('.block').on('click', function(){
	scoreValue += 500;
	// alert('Your score is ' + scoreValue);

scoreCounter.html(scoreValue);
	
});
scoreCounter.html(scoreValue);


////////End Score//////////////////////////////////////////////


//////Timer////////////////////////////////////////////////////

let startTime = 8;
let timeCounter = $('#timecounter');

timeCounter.html(startTime);

function countDown(){
	let time = setInterval(function(){
	timeCounter.html(startTime)	
		startTime -= 1;
	if (startTime === -1){
		clearInterval(time);
		alert(scoreValue)
	}
	}, 1000);
	} 
countDown();





// clear timer and then call a function










// if(startTime === 0){
// 	// clearInterval();
// 	startTime = 0; 
// }

 















});//end jquery