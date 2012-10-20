function placeWords(words) {

	$.getJSON('http://localhost:4567/10words', function(data) {
	  
		console.log("Got data:" + data);
		$('#wordsBox').val(data.join(" "));
	
	});

}

function sendGuess() {
	var input = $('#guessBox').val();
	console.log("sending: " + input);
	$.getJSON('http://localhost:4567/guess', input, function(data) {
	  
		console.log("Got data:" + data);
		
	
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


	