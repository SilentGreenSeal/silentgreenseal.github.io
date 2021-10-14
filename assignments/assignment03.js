
$(document).ready(function(){
	let elem = [];
// assign the entire table row for hole 1 to a variable, elem
// elem[1] = document.getElementById("1");

// display the number of children (all td elements)
// console.log(elem.children.length);
// display the content of the + button, which is the first child of the fifth element
// console.log(elem.children[4].children[0]); 

// assign a function to the + button
// elem[1].children[4].children[0].onclick = function(){add1(elem[1]);};

let totalPar=0
for(let i=1; i<=18; i++) {
	let par = document.getElementById(i.toString()).children[1].innerHTML;
	par = Number.parseInt(par);
	totalPar += par;
	document.getElementById("parTotal").innerHTML = totalPar.toString();
}

for(let i=1; i<=18; i++) {
  // console.log(i);
  elem[i] = document.getElementById(i.toString());
  elem[i].children[4].children[0].onclick = function(){add1(elem[i]);};
}

// create an "add1" function
function add1 (elem) {
  if(elem.children[2].innerHTML == "-") 
    elem.children[2].innerHTML = "1";
  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    elem.children[2].innerHTML = currentScore + 1;
  }
  overPar(elem);
}

for(let i=1; i<=18; i++) {
  // console.log(i);
  elem[i] = document.getElementById(i.toString());
  elem[i].children[4].children[1].onclick = function(){subtract1(elem[i]);};
}
	
	function subtract1 (elem) {
	  if(elem.children[2].innerHTML == 1)
		  elem.children[2].innerHTML = "-";
	  else if(elem.children[2].innerHTML > 1) {
		let currentScore = elem.children[2].innerHTML;
		currentScore = Number.parseInt(currentScore);
		elem.children[2].innerHTML = currentScore - 1;
	  }
	  overPar(elem);
	}
	
	function overPar (elem) {
		if(elem.children[2].innerHTML == "-")
			elem.children[3].innerHTML = "-";
		else {
			let currentScore = elem.children[2].innerHTML;
			let par = elem.children[1].innerHTML;
			currentScore = Number.parseInt(currentScore);
			par = Number.parseInt(par);
			let over = currentScore - par;
			elem.children[3].innerHTML = over;
		}
		let totalOver = 0;
		
		for (let i=1; i<=18; i++) {
			let over = document.getElementById(i.toString()).children[3].innerHTML;
			if(over == "-")
				over = 0;
			else 
				over = Number.parseInt(over);
			totalOver += over;
			document.getElementById("overTotal").innerHTML = totalOver.toString();
		}
		
		let totalScore = 0;
		
		for (let i=1; i<=18; i++) {
			let score = document.getElementById(i.toString()).children[2].innerHTML;
			if(score == "-")
				score = 0;
			else 
				score = Number.parseInt(score);
			totalScore += score;
			document.getElementById("scoreTotal").innerHTML = totalScore.toString();
		}
	}
	
	function clearHole (elem) {
		if(elem.children[2].innerHTML != "-")
			elem.children[2].innerHTML = "-";
		else {
			let score = elem.children[2].innerHTML;
			score = Number.parseInt(score);
			let getScoreTotal = document.getElementById("scoreTotal").innerHTML;
			getScoreTotal = Number.parseInt(getScoreTotal);
			let newScore = getScoreTotal-score;
			document.getElementById("scoreTotal").innerHTML = newScore.toString();
		}
		overPar(elem);
		
		if(elem.children[3].innerHTML != "-")
			elem.children[3].innerHTML = "-";
	}
	
	for(let i=1; i<=18; i++) {
	// console.log(i);
	elem[i] = document.getElementById(i.toString());
	elem[i].children[5].children[0].onclick = function(){clearHole(elem[i]);};
	}
	
	function clearAll() {
		for(let i=1; i<=18; i++) {
		// console.log(i);
		clearHole(elem[i]);
		}
		
		document.getElementById("scoreTotal").innerHTML = "-";
		document.getElementById("overTotal").innerHTML = "-";
	}
	document.getElementById("clearAll").onclick = function(){clearAll()};
	
});


