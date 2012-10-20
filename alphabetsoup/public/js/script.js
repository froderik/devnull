var numberOfGuesses = 0;

function placeWords(words) {
	$.getJSON('http://localhost:4567/10words', function(data) {
		console.log("Got data:" + data);
		$('#wordsBox').val(data.join(" "));
	});
}

function sendGuess() {
	var input = $('#guessBox').val();
	console.log("sending: " + input);
	numberOfGuesses++;
	$.getJSON('http://localhost:4567/guess?q='+input, function(data) {
		alert("right guess");
		placeWords();
		$('#guessBox').val('');
	})
	.error(function() { 
		alert("wrong guess, number: " + numberOfGuesses); 
	});
}

$(document).ready(function(){
	console.log("starting alphabetsoup client");
	placeWords("apa apa apa");
	$('#guessButton').click(function(){
		console.log('guessing....');
		sendGuess();
	});
});


	