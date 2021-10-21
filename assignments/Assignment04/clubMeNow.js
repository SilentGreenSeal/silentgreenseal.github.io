/* -------------------------------
Functions in this app:

clubDistanceList.html

  loadClubDistances()
  appendTableRows()
  displayClubEntry()
  displayClubDistanceEntryForm(c)
  undoLastShot()
  resetAllClubDistances()
  displayAbout()
  
clubEntry.html
 
  addClub()
  cancelClub()
  
clubDistanceEntry.html

  populateStatsTable()
  appendTapEntryButtons()
    updateStats()

--------------------------------- */


// ----- Functions (clubDistanceList.html) -----

// initialize "clubs" array
function loadClubDistances() {
	let clubs;
	// if "clubs" array already exists, load it from local storage
	if (localStorage.getItem("clubs")) {
		clubs = JSON.parse(localStorage.getItem("clubs"));
	}
	// otherwise create new "clubs" array, using resetAllClubs()
	else {
		clubs = resetAllClubDistances();
		clubs = JSON.parse(localStorage.getItem("clubs"));
	}
	return clubs;
}

// append one row to HTML table for each row in "clubs" array
function appendTableRows() {
	// select the HTML table <tbody> element
	let tblbody = document.getElementById('clubTable').children[0]; 
	// append one row to HTML table for each row in "clubs" array
	for (let i = 0; i < clubs.length; i++) {
		// create an empty row
		let row = tblbody.insertRow(i+1); // skip first row (column headings)
		// create an empty cell for each column to appear in HTML table
		let cell0 = row.insertCell(0); // clubAbbrev
		let cell1 = row.insertCell(1); // avgDist
		let cell2 = row.insertCell(2); // minDist
		let cell3 = row.insertCell(3); // maxDist
		let cell4 = row.insertCell(4); // numOfShots
		let cell5 = row.insertCell(5); // ("+" button)
		let cell6 = row.insertCell(6); // clubName
		// right align only the cells that need to be right aligned
		cell0.className = "cmn_hidden"; // clubAbbrev
		cell1.className = "cmn_alignRight cmn_fullHeight"; // avgDist
		cell2.className = "cmn_alignRight cmn_hidden"; // minDist
		cell3.className = "cmn_alignRight cmn_fullHeight"; // maxDist
		cell4.className = "cmn_alignRight cmn_hidden"; // numOfShots
		cell5.className = ""; // ("+" button)
		cell6.className = "cmn_fullHeight";
		// populate HTML table with data from "clubs" array
		cell0.innerHTML = clubs[i][1]; // clubAbbrev
		cell1.innerHTML = Math.round(clubs[i][3]); // avgDist
		cell2.innerHTML = Math.round(clubs[i][4]); // minDist
		cell3.innerHTML = Math.round(clubs[i][5]); // maxDist
		cell4.innerHTML = Math.round(clubs[i][6]); // numOfShots
		cell5.innerHTML = "<button class='btn btn-success cmn_noPadding cmn_fullHeight' onclick='displayClubDistanceEntryForm(" + i + ");'>&nbsp;&nbsp;+&nbsp;&nbsp;</button>";
		cell6.innerHTML = clubs[i][2]; // clubName
		// cell6.innerHTML = clubs[i][2] + ", " + clubs[i][7] + "&deg;"; 
	}
}

// navigate to "club ENTRY" screen (enter a new club, not a distance)
function displayClubEntry() {
	window.location.href = "clubEntry.html"; 
}

// navigate to "Distance Entry" screen (from one of the club "+" buttons)
function displayClubDistanceEntryForm(c) {
	localStorage.setItem("club", c); // save chosen club
	window.location.href = "clubDistanceEntry.html"; // redirect to entry form
}

// replace the current "clubs" array with the previous one
function undoLastShot() {
        // your code here !
	let cu;
	if (localStorage.getItem("clubsUndo")) {	
		cu = JSON.parse(localStorage.getItem("clubsUndo"));
		let str = JSON.stringify(cu);
		
		localStorage.setItem("clubs", str);		
	}
	
	window.location.href = "clubDistanceList.html"; 
}

// create a new (default) "clubs" array
function resetAllClubDistances() {
	// create 2d global array, called "clubs" throughout app
	// columns - 0: sortPosition, 1: clubAbbrev, 2: clubName, 
	// 3: avgDist, 4: minDist, 5: maxDist, 6: numOfShots, 
	// 7: loft/degrees, 8: typical/men, 9: typical/women
	let clubs = [
		[ 199, "Dr",  "Driver",   0, 0, 0, 0, 10.5, 230, 200],
		[ 300, "3+w", "3+ wood",  0, 0, 0, 0, 13.5, 210, 180],
		[ 350, "3h",  "3 hybrid", 0, 0, 0, 0, 18.0, 180, 160],
		// [ 399, "3i",  "3 iron",   0, 0, 0, 0, 18.5, 180, 160],
		// [ 499, "4i",  "4 iron",   0, 0, 0, 0, 18.5, 170, 150],
		[ 599, "5i",  "5 iron",   0, 0, 0, 0, 21.0, 160, 140],
		[ 699, "6i",  "6 iron",   0, 0, 0, 0, 24.0, 150, 130],
		[ 799, "7i",  "7 iron",   0, 0, 0, 0, 27.0, 140, 120],
		[ 899, "8i",  "8 iron",   0, 0, 0, 0, 31.5, 130, 110],
		[ 999, "9i",  "9 iron",   0, 0, 0, 0, 36.0, 120, 100],
		[1099, "Pw",  "Pitching", 0, 0, 0, 0, 41.0, 110,  90],
		[1199, "Aw",  "Approach", 0, 0, 0, 0, 46.0, 100,  80],
		[1299, "Gw",  "Gap",      0, 0, 0, 0, 51.0,  90,  70],
		[1399, "Sw",  "Sand",     0, 0, 0, 0, 56.0,  80,  60],
		[1499, "Lw",  "Lob",      0, 0, 0, 0, 60.0,  60,  40],
		[1599, "Ptr", "Putter",   0, 0, 0, 0, 60.0,   3,   3],
	];
	// store the array in local storage
	let str = JSON.stringify(clubs);
	localStorage.setItem("clubs", str);
	// and refresh screen
	window.location.href = "clubDistanceList.html"; 
}

// navigate to "About" screen
function displayAbout() {
	// your code here
	window.location.href = "clubAbout.html";
}

// navigate to "Penalty Info" screen
function displayPenaltyInfo() {
	window.location.href = "clubPenaltyInfo.html";
}

function addClub(newClub="") {
	if (newClub = "")
		newClub = document.getElementById('clubName').value;
	
	let clubAbbr, deg, mType, fType;
	
	if (newClub = "Driver") {
		clubAbbr = "Dr";
		deg = 10.5;
		mType = 230;
		fType = 200;
	} else if (newClub = "3+ wood") {
		clubAbbr = "3+w";
		deg = 13.5;
		mType = 210;
		fType = 180;
	} else if (newClub = "3 hybrid") {
		clubAbbr = "3h";
		deg = 18.0;
		mType = 180;
		fType = 160;
	} else if (newClub = "3 iron") {
		clubAbbr = "3i";
		deg = 18.5;
		mType = 180;
		fType = 160;
	} else if (newClub = "4 iron") {
		clubAbbr = "4i";
		deg = 18.5;
		mType = 170;
		fType = 150;
	} else if (newClub = "5 iron") {
		clubAbbr = "5i";
		deg = 21.0;
		mType = 160;
		fType = 140;
	} else if (newClub = "6 iron") {
		clubAbbr = "6i";
		deg = 24.0;
		mType = 150;
		fType = 130;
	} else if (newClub = "7 iron") {
		clubAbbr = "7i";
		deg = 27.0;
		mType = 140;
		fType = 120;
	} else if (newClub = "8 iron") {
		clubAbbr = "8i";
		deg = 31.5;
		mType = 130;
		fType = 110;
	} else if (newClub = "9 iron") {
		clubAbbr = "9i";
		deg = 36.0;
		mType = 120;
		fType = 100;
	} else if (newClub = "Pitching") {
		clubAbbr = "Pw";
		deg = 41.0;
		mType = 110;
		fType = 90;
	} else if (newClub = "Approach") {
		clubAbbr = "Aw";
		deg = 46.0;
		mType = 100;
		fType = 80;
	} else if (newClub = "Gap") {
		clubAbbr = "Gw";
		deg = 51.0;
		mType = 90;
		fType = 70;
	} else if (newClub = "Sand") {
		clubAbbr = "Sw";
		deg = 56.0;
		mType = 80;
		fType = 60;
	} else if (newClub = "Lob") {
		clubAbbr = "Lw";
		deg = 60.0;,
		mType = 60;
		fType = 40;
	} else if (newClub = "Putter") {
		clubAbbr = "Ptr";
		deg = 60.0;
		mType = 3;
		fType = 3;
	}
		
	debugger;
	let arrNewClub = [(clubs[clubs.length-1][0]) + 100, clubAbbr, newClub, 0, 0, 0, 0, deg, mType, fType];
	clubs.concat(arrNewClub);
	let str = JSON.stringify(clubs);
	localStorage.setItem("clubs", str);
	window.location.href = "clubDistanceList.html"; 
}

// ----- Functions (clubDistanceEntry.html) -----

// put precise numbers (not rounded) in stats HTML table
function populateStatsTable() {
	document.getElementById('cmn_club').innerHTML = '<strong>' + clubs[clubRow][1] + '</strong>'; 
	document.getElementById('cmn_min').innerHTML = Math.round(clubs[clubRow][4]); 
	document.getElementById('cmn_avg').innerHTML = '<strong>' + Math.round(clubs[clubRow][3]) + '</strong>'; 
	document.getElementById('cmn_max').innerHTML = Math.round(clubs[clubRow][5]); 
	document.getElementById('cmn_num').innerHTML = Math.round(clubs[clubRow][6]);  
}

// show fast-entry buttons in decrements of 5 yards
function appendTapEntryButtons() {
	// select whole cmn_tapEntry div
	let teDiv = document.getElementById('cmn_tapEntryButtons'); 
	// set reasonable range for tapEntry buttons
	let variation = 30;
	let avgDistPlusSome = Math.round(clubs[clubRow][3] + variation);
	let avgDistMinusSome = Math.max(avgDistPlusSome - 2 * variation, 0);
	// if club has average of zero, include many buttons
	if (0==Math.round(clubs[clubRow][3])) {
		avgDistPlusSome = 320;
		avgDistMinusSome = 0;
	}
	// append buttons to div in decrements of 5 yards
	for (let i = avgDistPlusSome; i > avgDistMinusSome; i -= 5) {
		let btn = document.createElement("span");
		btn.innerHTML = "<button class='cmn_noPadding cmn_fullHeight cmn_tapEntry' onclick='updateStats(" + i + ");'>" + i + "</button> ";
		if(i==Math.round(clubs[clubRow][3])) { 
			btn.innerHTML = "<button class='cmn_noPadding cmn_fullHeight cmn_tapEntry' onclick='updateStats(" + i + ");'><b>" + i + "</b></button> ";
			btn.className = 'cmn_green';
		}
		teDiv.appendChild(btn); 
	}
}

// update distances based on user-entered value, "shotDistance"
function updateStats(shotDistance=0) {
	// shotDistance can be user-entered by fast-entry button or by typed input
	// if shotDistance==0 then shotDistance was entered by typed input,
	// so must pull shotValue from getElementById('clubVal')
	if(shotDistance==0)
		shotDistance = parseInt(document.getElementById('clubVal').value);
	if(parseInt(shotDistance) > 0) {
		// save current clubs array for "Undo" functionality
		let str = JSON.stringify(clubs);
		localStorage.setItem("clubsUndo", str);
		// update average
		currentAverage = clubs[clubRow][3];
		currentNumShots = clubs[clubRow][6];
		newAverage = (currentAverage * currentNumShots + shotDistance) 
			/ (currentNumShots + 1);
		clubs[clubRow][3] = newAverage;
		// update shot count
		clubs[clubRow][6] += 1;
		// update min
		if (clubs[clubRow][4]==0 
			|| shotDistance < clubs[clubRow][4]) clubs[clubRow][4] = shotDistance;
		// update max
		if (clubs[clubRow][5]==0 
			|| shotDistance > clubs[clubRow][5]) clubs[clubRow][5] = shotDistance;
		// save updated stats in local storage
		str = JSON.stringify(clubs);
		localStorage.setItem("clubs", str);
		// return to list screen
		window.location.href = "clubDistanceList.html"; 
	}
}
