// todo
// optimize mobile
// highlight winning paragraph after game is over
// restart button?

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
	allElem.forEach( (item, index) => {
		item.addEventListener('click', item => {
		allElem.forEach(item => {
			item.classList.remove('enemychoice', 'mychoice', 'samechoice');
		});
		playRound(index);
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
	// let outputLength = cardAnimationRoulette(3);
	console.log(playerSelection);
	setTimeout( function () {
		const computerSelection = computerPlay();
		if (playerSelection === computerSelection) {
			allElem[computerSelection].classList.remove('mychoice')
			allElem[computerSelection].classList.add('samechoice');
		} else {
			allElem[computerSelection].classList.add('enemychoice');
			allElem[playerSelection].classList.add('mychoice');
			// cardSinglePulseOn(allElem[computerPlay]);
		}
		const challenge = `${playerSelection}${computerSelection}`;
		console.log(`game is ${challenge}`);
		if (winners.includes(challenge)) {
			let message = `You won round ${score.length+1}<br>${choices[playerSelection]} beats ${choices[computerSelection]}`;
			para.innerHTML = message;
			score += 'W';
		} else if (playerSelection === computerSelection) {
			let message = `Round ${score.length+1} is a tie<br>You've both choosen ${choices[playerSelection]}`;
			para.innerHTML = message;
			score += 'T';
		} else {
			let message = `You lost round ${score.length+1}<br>${choices[playerSelection]} is beaten by ${choices[computerSelection]}`;
			para.innerHTML = message;
			score += 'L';
		}
		if (score.length >= 5) { calcWinner(score); }
	// }, outputLength);
	}, 100);
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
		para.innerHTML = message;
		para.classList.add('tieMessage');
	} else if (scoreWon > scoreLost) {
		message = `YOU WIN! You've won ${scoreWon} rounds and lost ${scoreLost} rounds, with ${scoreTie} ties.`;
		para.innerHTML = message;
		para.classList.add('winMessage');
	} else {
		message = `You Lost :( You've won ${scoreWon} rounds and lost ${scoreLost} rounds, with ${scoreTie} ties.`;
		para.innerHTML = message;
		para.classList.add('loseMessage');
	}
}