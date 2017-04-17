# Existence is Pain

This game started with the idea for another game called Square Popper. After creating the initial game logic for Square Popper, I went to style it. Thats when I had the inspiration to use Mr. Meseeks from 'Rick and Morty' as the main element for the game. That became the basis for the rest of the style decisions.

The MVP game logic was a block moving randomly around the game area. If the user clicks on the block they score and the block breaks into two more. This continues until the player runs out of time. 

In 'Rick and Morty' The character Mr. Meseeks it brought to life to complete a simple task then dies. Mutiple Meseeks can be created at once to complete tasks. If it takes too long for them to complete a task they go crazy - they are not ment to live that long. For a Meeseeks, existence is pain.

So in the game the player clicks on a Meeseeks, it dies and more are spawned and the process repeats itself. The trick is, if the player misses its target, the Meeseeks take away from the players score. 

This continues until the time runs out.


# Tech used

To make this game is used HTML5, CSS3, javaScript and jQuery.

In HTML i set up divs to be styled for the gameboard, including the timer, scorekeeper and buttons to transverse the menus.

I used javaScript to: 
	- append div elements as the clickable Meeseeks. 
	- set the score
	- set the timer
	- set the audio effects

I used jQuery to:
	- Set a fade in for the whole game when the window loads
	- to clear children of a div. This was vital to the reset functions to play a new game without refreshing the browser.

CSS was used for styling and the animation of the background wall paper.

There were a few pieces of code I used from class and some from w3 schools and StackOverflow that are noted in the code.

# Wireframes
[![][./readmepictures/20170411_201623.jpg]]

For 'Square Popper' I loayed out the play for how the game would progress.
.
Next they click squares until the time runs out.

I took out the plan to add in additional objects, but kept the plan that if they miss, points will be deducted. 

# User Story

The user story is pretty straight forward. To begin as a user i want the option to start or to see what the games rules are. 

If I go to rules I want to see the rules, go back to start or beable to play from right there. I also thought a user was unfamiliar with 'Rick and Morty' they would want to know what Meseek is and why would it want to die. For that reason I provided a link on the top of the instruction to a Youtube video that would get the point across.

From there, when the game is over I would want to see my total score and have the option to play again or quit.

All of these elements are included. 


# Instructions

Click as many Meeseeks as you can before the time runs out.

If you miss you'll loose points.

# Problems Solved
I had a few big challenges making this work.

The first was having event listeners work on dynamically created elements. I solved that by adding the click event directly to the function that creates the element. 

The next was posting the score after the time was up. I was getting what the score was set to, but not to what it changed to at the end of the game. In order to fix that i had to set the innerhtml of the div that shows the score from within the function that added to the score.

The last big challenge I has was havign random spawn locations. At first the elements would only come out of the same area after being created, which lead to it being too easy to click on them when they spawned.
To fix this I had to use Math.random times an appropriate number to het random top and left loactions.

# Unsolved Problems

I feel like the elements cluster much more to the right of the game board than the left, so it doesnt feel as scattered or random as I would like. The problem is that when I adjust the width they can spread too, they do fill the rightside, but break out of the bottom of the game board.  I set it as best as I could for the elements to spread out as much as possible without breaking out the bottom, but I feel it could be better.

Also, as of writing this, I have yet to understand how to use classes to maniplate the DOM. Hopfully with the time I have left I'll figure it out.


# Time

| E.I.P.        | Estimated Time| Actualtime |complete
| ------------- |:-------------:| ----------:|-----:|
| Game Logic    | 20 hours      | 32 hours   |98%
| Styling       | 5 hours       | 15 hours   |100%
| Tweaking      | 5 hours       | 3 hours    |100%





