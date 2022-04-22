// todo
// highlight winning pc card
// 


const rockElem = document.querySelector('.rock');
const paperElem = document.querySelector('.paper');
const scissorsElem = document.querySelector('.scissors');
const allElem = document.querySelectorAll('.card');
const choices = ['Bleed', 'Comet', 'Mimic'];
// possible winning combinations for the first value
// based on index numbers of the 'choices' variable
// rock/bleed = 0, paper/comet = 1, scissors/mimic = 2
const winners = ['10', '02', '21'];
let score = '';
let para = document.querySelector('.result');

//// RPS logic
function computerPlay() {
	return Math.floor(Math.random() * 3);
}

//// Graphic, animation
function cardAnimationRoulette(rounds = 5, duration = 0.6, delay = 0.4) {
	rockElem.style.animation = `card-pulse ${duration}s ${rounds}`;
	paperElem.style.animation = `card-pulse ${duration}s ${delay/2}s ${rounds}`;
	scissorsElem.style.animation = `card-pulse ${duration}s ${delay}s ${rounds}`;
	const animLength = (delay + (duration * rounds)) * 1000;
	// setTimeout( function() {
	// 	allElem.forEach(item => item.style.animation = "");
	// }, animLength);
	return animLength;
}

function cardSinglePulseOn(event) {
	event.target.style.animation = 'card-zoom-in 0.6s forwards';
}
function cardSinglePulseOff(event) {
	event.target.style.animation = 'card-zoom-out 0.6s';
	setTimeout(function() {
		event.target.style.animation = "";
	}, 600);
}

//// Event listening
function addCardsListeners() {
	addCardMouseOver();
	allElem.forEach(item => {
		item.addEventListener('mouseleave', item => {
			cardSinglePulseOff(item);
		})
	});
	allElem.forEach(item => {
		item.addEventListener('click', item => {
			playRound(0);
		})
	});
}
function addCardMouseOver() {
	allElem.forEach(item => {
		item.addEventListener('mouseover', item => {
			cardSinglePulseOn(item);
		})
	});
}
// separated to stop glitching animation on mouseover while doing the 'scrolling animation' in cardAnimationRoulette()
function removeCardMouseOver() {
	allElem.forEach(item => {
		item.removeEventListener('mouseover', item => {
			cardSinglePulseOn(item);
		})
	});
}

// clears the event listeners to avoid interrupting animations
// and for game over
function removeElemListeners() {
	allElem.forEach(item => {
		item.replaceWith(item.cloneNode(true));
	});
}
addCardsListeners();

//// Game routine
function playRound(playerSelection) {
	let outputLength = cardAnimationRoulette(3);
	para.textContent = '';
	setTimeout( function () {
		const computerSelection = computerPlay();
		const challenge = `${playerSelection}${computerSelection}`;
		console.log(`game is ${challenge}`);
		if (winners.includes(challenge)) {
			let message = `You won the round: ${playerSelection} beats ${computerSelection}\n`;
			para.innerHTML = message + '<br>';
			score += 'W';
		} else if (playerSelection === computerSelection) {
			let message = `It's a tie: you've both choosen ${playerSelection}\n`;
			para.innerHTML = message + '<br>';
			score += 'T';
		} else {
			let message = `You lost the round: ${playerSelection} is beaten by ${computerSelection}\n`;
			para.innerHTML = message + '<br>';
			score += 'L';
		}
		if (score.length > 1) { calcWinner(score); }
	}, outputLength);
}

function calcWinner(score) {
	removeElemListeners();

	let scoreSum = score.split('');
	let scoreWon = 0;
	let scoreLost = 0;
	let scoreTie = 0;
	// calculate winning results
	for (let i = 0; i < scoreSum.length; i++) {
		if (scoreSum[i] === 'W') {
			scoreWon += 1;
		} else if (scoreSum[i] === 'L') {
			scoreLost += 1;
		} else if (scoreSum[i] === 'T') {
			scoreTie += 1;
		}
	}
	announceWinner(scoreWon, scoreLost, scoreTie);
}

function announceWinner(scoreWon, scoreLost, scoreTie) {
	if (scoreWon === scoreLost) {
		message = `It's a tie! You've won ${scoreWon} rounds and lost ${scoreLost} rounds, with ${scoreTie} ties.`;
		para.innerHTML = '<br>' + message;
	} else if (scoreWon > scoreLost) {
		message = `YOU WIN! You've won ${scoreWon} rounds and lost ${scoreLost} rounds, with ${scoreTie} ties.`;
		para.innerHTML = '<br>' + message;
	} else {
		message = `You Lost :( You've won ${scoreWon} rounds and lost ${scoreLost} rounds, with ${scoreTie} ties.`;
		para.innerHTML = '<br>' + message;
	}
}