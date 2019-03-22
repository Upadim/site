var href = window.location.href;
var dir = href.substring(0, href.lastIndexOf('/')) + "/";

function getWord() {
    var myRequest = new XMLHttpRequest();
    myRequest.open("GET", dir + "/words/words.txt");
    myRequest.send();
    myRequest.onreadystatechange = function () {
	getWordCallback(myRequest);
    };
}

function getWordCallback(myRequest){
    var word;
    var words;    
    if (myRequest.readyState === 4 && myRequest.status==200) {
	words = myRequest.responseText.split("\n"[0]);
	word = words[Math.floor(Math.random() * words.length)];
	document.getElementById("content").innerHTML = word;
    }    
}

getWord(dir);