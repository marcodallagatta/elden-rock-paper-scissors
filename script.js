const choices = ['rock', 'paper', 'scissors'];
// possible winning combinations for the first value
// based on index numbers of the 'choices' variable
const winners = ['10', '02', '21'];
let score = '';

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

function playRound(playerSelection, computerSelection) {
	let playerSelect = playerSelection.toLowerCase();

	if (!choices.includes(playerSelect)) {
		console.log(`Your selection "${playerSelect}" wasn't valid.\nPlease choose either "rock", "paper" or "scissors"\n`);
		return false;
	}

	const challenge = `${wordToIndex(playerSelect)}${wordToIndex(computerSelection)}`;

	if (winners.includes(challenge)) {
		console.log(`You won the round: ${playerSelect} beats ${computerSelection}\n`);
		score += 'W';
		console.log(`The score is: ${score}`);
	} else if (playerSelect === computerSelection) {
		console.log(`It's a tie: you've both choosen ${playerSelect}\n`);
		score += 'T';
		console.log(`The score is: ${score}`);
	} else {
		console.log(`You lost the roud: ${playerSelect} is beaten by ${computerSelection}\n`);
		score += 'L';
		console.log(`The score is: ${score}`);
	}
}

function game(rounds) {
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
		} else {
			scoreTie += 1;
		}
	}

	if (scoreWon === scoreLost) {
		console.log(`It's a tie! You've won ${scoreWon} rounds and lost ${scoreLost} rounds.`)
	} else if (scoreWon > scoreLost) {
		console.log(`YOU WIN! You've won ${scoreWon} rounds and lost ${scoreLost} rounds, with ${scoreLost} ties.`)
	} else {
		console.log(`You Lost :( You've won ${scoreWon} rounds and lost ${scoreLost} rounds, with ${scoreLost} ties.`)
	}

}