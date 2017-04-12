
//Start jquery
$( document ).ready(function() {
    console.log( "ready!" );


//////Random Movement////////////////////////////////////////////////////

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
	scoreValue += 5
	// alert('Your score is ' + scoreValue);

scoreCounter.html(scoreValue);
	
});
scoreCounter.html(scoreValue);


////////End Score//////////////////////////////////////////////


//////Timer////////////////////////////////////////////////////

let startTime = 5;
let timeCounter = $('#timecounter');

timeCounter.html(startTime);

function countDown(){
	setInterval(function(){
	timeCounter.html(startTime)	
		startTime -= 1;}, 1000);
	if(startTime === 0){
	// clearInterval();
	startTime = '0'; 
}
	} 
countDown();

// if(startTime === 0){
// 	// clearInterval();
// 	startTime = 0; 
// }



















});//end jquery