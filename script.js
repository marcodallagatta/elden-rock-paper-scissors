const rockElem = document.querySelector('.rock');
const paperElem = document.querySelector('.paper');
const scissorsElem = document.querySelector('.scissors');
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
function cardAnimationRoulette(duration = '0.6', delay = '0.4', rounds = '5') {
	rockElem.style.animation = `card-pulse ${duration}s ${rounds}`;
	paperElem.style.animation = `card-pulse ${duration}s ${delay/2}s ${rounds}`;
	scissorsElem.style.animation = `card-pulse ${duration}s ${delay}s ${rounds}`;
	setTimeout( function() {
		removeCardAnimation();
	}, (duration * rounds + delay) * 1000);
}
function removeCardAnimation() {
	rockElem.style.animation = "";
	paperElem.style.animation = "";
	scissorsElem.style.animation = "";
}
function cardSinglePulse(event) {
	event.target.style.animation = 'card-pulse 0.6s 1';
	setTimeout(function() {
		event.target.style.animation = "";
	}, 600);
}

//// Event listening
function addCardsListeners() {
	rockElem.addEventListener('mouseover', function(event) {
		cardSinglePulse(event);
	});
	rockElem.addEventListener('click', function(event) {
		userChoice(event);
	});
	paperElem.addEventListener('mouseover', function(event) {
		cardSinglePulse(event);
	});
	paperElem.addEventListener('click', function(event) {
		userChoice(event);
	});
	scissorsElem.addEventListener('mouseover', function(event) {
		cardSinglePulse(event);
	});
	scissorsElem.addEventListener('click', function(event) {
		userChoice(event);
	});
}
addCardsListeners();

//// Game routine
function playRound(playerSelection) {
	const computerSelection = computerPlay();
	const challenge = `${playerSelection}${computerSelection}`;
	console.log(`game is ${challenge}`);
	if (winners.includes(challenge)) {
		let message = `You won the round: ${playerSelection} beats ${computerSelection}\n`;
		console.log(message);
		para.innerHTML += message + '<br>';
		score += 'W';
		console.log(`The score is: ${score}`);
	} else if (playerSelection === computerSelection) {
		let message = `It's a tie: you've both choosen ${playerSelection}\n`;
		console.log(message);
		para.innerHTML += message + '<br>';
		score += 'T';
		console.log(`The score is: ${score}`);
	} else {
		let message = `You lost the round: ${playerSelection} is beaten by ${computerSelection}\n`;
		console.log(message);
		para.innerHTML += message + '<br>';
		score += 'L';
		console.log(`The score is: ${score}`);
	}
}

function game(rounds) {
	para.textContent = '';

	let roundRes;

	for (let i = 0; i < rounds; i++) {
		roundRes = playRound( prompt("Rock, Paper or Scissors?"),computerPlay());
		if (roundRes === false) {
			i--;
		}
		console.log(roundRes);
	}

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

	if (scoreWon === scoreLost) {
		message = `It's a tie! You've won ${scoreWon} rounds and lost ${scoreLost} rounds, with ${scoreTie} ties.`;
		console.log(message);
		para.innerHTML += '<br>' + message;
	} else if (scoreWon > scoreLost) {
		message = `YOU WIN! You've won ${scoreWon} rounds and lost ${scoreLost} rounds, with ${scoreTie} ties.`;
		console.log(message);
		para.innerHTML += '<br>' + message;
	} else {
		message = `You Lost :( You've won ${scoreWon} rounds and lost ${scoreLost} rounds, with ${scoreTie} ties.`;
		console.log(message);
		para.innerHTML += '<br>' + message;
	}

}