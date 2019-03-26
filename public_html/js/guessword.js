var etalon_word_chars;
var answer_chars;
var pressed_keys = new Array();
var errors = 0;
var href = window.location.href;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

function getWord() {
    var wordRequest = new XMLHttpRequest();
    wordRequest.open("GET", dir + "/words/words.txt");
    wordRequest.send();
    wordRequest.onreadystatechange = function () {
	getWordCallback(wordRequest);
    };
}

function getWordCallback(wordRequest) {
    var word;
    var words;
    if (wordRequest.readyState === 4 && wordRequest.status === 200) {
	words = wordRequest.responseText.split("\n"[0]);
	word = words[Math.floor(Math.random() * words.length)];
	buildWordBoard(word, buildImageBoard);
    }
}

function buildImageBoard(img_no) {
    image = '<img src="img/hang_' + img_no + '.jpg" alt="hang_img"/>';
    document.getElementById("hang_container").innerHTML = image;
}

function buildWordBoard(word, callback) {
    var word_html = '';
    etalon_word_chars = word.trim().split('');
    answer_chars = new Array(etalon_word_chars.length);

    word_html = '<div id="hang_game_board">';
    word_html = word_html + '<div id="word_container">';
    for (var i = 0; i < etalon_word_chars.length; i++) {
	word_html = word_html + '<div class="letter_container" id = "letter_container_' + i + '" >';
	if (i === 0 
		|| i === etalon_word_chars.length - 1 
		|| etalon_word_chars[i] === etalon_word_chars[0] 
		|| etalon_word_chars[i] === etalon_word_chars[etalon_word_chars.length - 1]) {
	    word_html = word_html + etalon_word_chars[i];
	    answer_chars[i] = etalon_word_chars[i];
	}
	word_html = word_html + "</div>";
    }
    word_html = word_html + '<div class = "clear"></div>';
    word_html = word_html + '</div>';
    word_html = word_html + '<div id = "message_area">';
    word_html = word_html + '</div>';    
    word_html = word_html + '<div id = "hang_container">';
    word_html = word_html + '</div>';
    word_html = word_html + '<div id = "controls_area">';
    word_html = word_html + '<input type="submit" value="Начать сначала" onclick="getWord()">';
    word_html = word_html + '</div>';
    word_html = word_html + '</div>';

    document.getElementById("content").innerHTML = word_html;

    callback(0);
}

document.addEventListener("keypress", function (e) {
    executeCharPress (e);
});

function executeCharPress (event){
    if (!checkCharacter(event.key) && !alreadyPressed(event.key)) {
	wrongCharacter();
	return;
    }
    if (checkWin()) {
	
    }    
}

function checkCharacter(pressedChar) {
    var div_id;
    var char_found = false;
    console.log('Key pressed:' + pressedChar);
    for (var i = 0; i < etalon_word_chars.length; i++) {
	if (etalon_word_chars[i] === pressedChar) {
	    console.log("Character " + pressedChar + " found at position " + i);
	    div_id = 'letter_container_' + i;
	    document.getElementById(div_id).innerHTML = pressedChar;
	    answer_chars[i] = pressedChar;
	    var char_found = true;
	}
    }
    return char_found;
}

function wrongCharacter() {
    errors++;
    if (errors < 11) {
	buildImageBoard(errors);
    }
    if (errors === 10) {
	youLost();
    }
}

function youLost(){
    console.log("Upps... You have failed this game!");
}

function checkWin(){
    if (isEqual(etalon_word_chars, answer_chars)) {
	document.removeEventListener ("keypress", executeCharPress);
	console.log ("You have won!");
    };
}

function alreadyPressed(char){
    if(char){
	pressed_keys.forEach(function(key, index, chars){
	    if (key === char) return true;
	});
	pressed_keys.push(char);
	return false;
    }
}

function isEqual (etalon, answers) {

    if (Object.prototype.toString.call(etalon) !== Object.prototype.toString.call(answers)) return false;
    
    if (etalon.join('') === answers.join('')) {
	return true;
    } else {
	return false;
    }
};

getWord(dir);