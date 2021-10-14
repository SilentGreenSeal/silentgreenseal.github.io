
$(document).ready(function() {
    let elem = []; // variable used for each table row

    let totalPar = 0

    //Calculate total par score
    for (let i = 1; i <= 18; i++) {
        let par = document.getElementById(i.toString()).children[1].innerHTML; //create variable for par score display value
        par = Number.parseInt(par); //change par from string to int
        totalPar += par; //par score calculation
        document.getElementById("parTotal").innerHTML = totalPar.toString(); //display total par score
    }

    //add 1 to player score for each "+" button click
    for (let i = 1; i <= 18; i++) {
        elem[i] = document.getElementById(i.toString()); //change from int to string
        elem[i].children[4].children[0].onclick = function() {
            add1(elem[i]);
        }; //update player score
    }

    //create an "add1" function
    function add1(elem) {
        if (elem.children[2].innerHTML == "-")
            elem.children[2].innerHTML = "1"; //change to 1
        else {
            let currentScore = elem.children[2].innerHTML; //create variable for player score display value
            currentScore = Number.parseInt(currentScore); //change from string to int
            elem.children[2].innerHTML = currentScore + 1; //display score
        }
        overPar(elem); //update total score, total over/under par, and over/under score for each hole
    }

    //subtract 1 from play score for each "-" button click
    for (let i = 1; i <= 18; i++) {
        elem[i] = document.getElementById(i.toString()); //convert to string
        elem[i].children[4].children[1].onclick = function() {
            subtract1(elem[i]);
        }; //update player score
    }
    //create "subtract1" function
    function subtract1(elem) {
        if (elem.children[2].innerHTML == 1)
            elem.children[2].innerHTML = "-"; //return to default
        else if (elem.children[2].innerHTML > 1) {
            let currentScore = elem.children[2].innerHTML; //variable for score display
            currentScore = Number.parseInt(currentScore); //convert to int
            elem.children[2].innerHTML = currentScore - 1; //display score
        }
        overPar(elem); //update total score, total over/under par, and over/under score for each hole
    }

    //create "overPar" function
    function overPar(elem) {
        if (elem.children[2].innerHTML == "-")
            elem.children[3].innerHTML = "-"; //if there is no player score, there is no over/under par score
        else {
            let currentScore = elem.children[2].innerHTML; //variable for score display
            let par = elem.children[1].innerHTML; //retrieve respective par score
            currentScore = Number.parseInt(currentScore); //convert score to int
            par = Number.parseInt(par); //convert par to int
            let over = currentScore - par; //find over/under score
            elem.children[3].innerHTML = over; //display over/under score
        }
        let totalOver = 0;

        //find and display total over/under for all 18 holes
        for (let i = 1; i <= 18; i++) {
            let over = document.getElementById(i.toString()).children[3].innerHTML; //variable for over/under score display from each hole
            if (over == "-")
                over = 0; //assign value to scoreless hole
            else
                over = Number.parseInt(over); //convert to int
            totalOver += over; //find total over/under
            document.getElementById("overTotal").innerHTML = totalOver.toString(); //display total over/under
        }

        let totalScore = 0;

        //find and display total player score for all 18 holes
        for (let i = 1; i <= 18; i++) {
            let score = document.getElementById(i.toString()).children[2].innerHTML; //variable for player score display from each hole
            if (score == "-")
                score = 0; //assign value to scoreless hole
            else
                score = Number.parseInt(score); //convert to int
            totalScore += score; //find total player score
            document.getElementById("scoreTotal").innerHTML = totalScore.toString(); //display total player score
        }
    }

    //create "clearHole" function
    function clearHole(elem) {
        if (elem.children[2].innerHTML != "-")
            elem.children[2].innerHTML = "-"; //set player score back to scoreless
        else {
            let score = elem.children[2].innerHTML; //variable for player score display
            score = Number.parseInt(score); //convert to int
            let getScoreTotal = document.getElementById("scoreTotal").innerHTML; //variable for total player score display
            getScoreTotal = Number.parseInt(getScoreTotal); //convert to int
            let newScore = getScoreTotal - score; //find updated total score
            document.getElementById("scoreTotal").innerHTML = newScore.toString(); //display updated score
        }
        overPar(elem); //update total score and total over/under par score

        if (elem.children[3].innerHTML != "-")
            elem.children[3].innerHTML = "-"; //set over/under score back to scoreless
    }

    //execute clearHole
    for (let i = 1; i <= 18; i++) {
        elem[i] = document.getElementById(i.toString()); //change from int to string
        elem[i].children[5].children[0].onclick = function() {
            clearHole(elem[i]);
        }; //if "C" is clicked, execute clearHole
    }

    //create "clearAll" function
    function clearAll() {
        for (let i = 1; i <= 18; i++) {
            clearHole(elem[i]); //clear all player scores and over/under scores
        }

        document.getElementById("scoreTotal").innerHTML = "-"; //clear total player score
        document.getElementById("overTotal").innerHTML = "-"; //clear total over/under par score
    }
    document.getElementById("clearAll").onclick = function() {
        clearAll()
    }; //run clearAll function if "Clear All" is clicked

});