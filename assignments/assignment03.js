
$(document).ready(function(){
	let elem = [];
	// assign the entire table row for hole 1 to a variable, elem
	for(var i=1;i<=18;i++){
	elem[i]
	  = document.getElementById(i);
	elem[i].children[4].children[0].onclick 
	  = function(){add1(elem[i]);};
	  
	}
	/*
	  elem[2]
	  = document.getElementById("2");
	elem[2].children[4].children[0].onclick 
	  = function(){add1(elem[2]);};
	  
	  elem[3]
	  = document.getElementById("3");
	elem[3].children[4].children[0].onclick 
	  = function(){add1(elem[3]);};
	  */

});

	// create an "add1" function
	function add1 (elem) {
	  if(elem.children[2].innerHTML == "-") 
		elem.children[2].innerHTML = "1";
	  else {
		let currentScore = elem.children[2].innerHTML;
		currentScore = Number.parseInt(currentScore);
		elem.children[2].innerHTML = currentScore + 1;
	  }
	}
