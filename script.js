const rockElem = document.querySelector('.rock');
const paperElem = document.querySelector('.paper');
const scissorsElem = document.querySelector('.scissors');
const choices = ['rock', 'paper', 'scissors'];
// possible winning combinations for the first value
// based on index numbers of the 'choices' variable
const winners = ['10', '02', '21'];
let score = '';
let para = document.querySelector('.result');

function wordToIndex (i) {
	const input = i.toLowerCase();
	switch (i) {
		case 'rock':
			return '0';
			break;
		case 'paper':
			return '1';
			break;
		case 'scissors':
			return '2';
			break;
	}
}

function computerPlay() {
	return choices[Math.floor(Math.random() * 3)];
}

function cardAnimationRoulette(duration = '.6', rounds = '5') {
	rockElem.style.animation = `card-pulse ${duration}s ${rounds}`;
	paperElem.style.animation = `card-pulse ${duration}s .2s ${rounds}`;
	scissorsElem.style.animation = `card-pulse ${duration}s .4s ${rounds}`;
}

cardAnimationRoulette();

function playRound(playerSelection, computerSelection) {
	let playerSelect = playerSelection.toLowerCase();

	const challenge = `${wordToIndex(playerSelect)}${wordToIndex(computerSelection)}`;

	if (winners.includes(challenge)) {
		let message = `You won the round: ${playerSelect} beats ${computerSelection}\n`;
		console.log(message);
		para.innerHTML += message + '<br>';
		score += 'W';
		console.log(`The score is: ${score}`);
	} else if (playerSelect === computerSelection) {
		let message = `It's a tie: you've both choosen ${playerSelect}\n`;
		console.log(message);
		para.innerHTML += message + '<br>';
		score += 'T';
		console.log(`The score is: ${score}`);
	} else {
		let message = `You lost the round: ${playerSelect} is beaten by ${computerSelection}\n`;
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