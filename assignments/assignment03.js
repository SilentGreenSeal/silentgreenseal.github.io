$( document ).ready(function() {

	let elem = [];
	for(var i=0;i<18;i++){
		var row = (i+1) + '';
		// assign the entire table row for hole 1 to a variable, elem
		elem[i]
		  = document.getElementById(row);

		// display the number of children (all td elements)
		// console.log(elem.children.length);
		// display the content of the + button, which is the first child of the fifth element
		// console.log(elem.children[4].children[0]); 

		// assign a function to the + button
		elem[i].children[4].children[0].onclick 
		  = function(){add1(elem[i]);};

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
	}
	
});
