function placeWords(words) {
	$('#wordsBox').val(words);
}

function sendGuess() {
	var input = $('#guessBox').val();
	console.log("sending: " + input);

}

$(document).ready(function(){
	console.log("starting alphabetsoup client");



	placeWords("apa apa apa");

	$('#guessButton').click(function(){
		console.log('guessing....');
		sendGuess();
	});

});


	