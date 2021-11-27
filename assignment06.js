// --- global variables ---

var loans = [
  { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
]; 

// --- function: loadDoc() ---

function loadDoc() {
  
  // pre-fill defaults for first loan year
  var defaultYear = loans[0].loan_year;
  $("#loan_year0" + 1).val(defaultYear++);
  var defaultLoanAmount = loans[0].loan_amount;
  $("#loan_amt0" + 1).val(defaultLoanAmount.toFixed(2));
  var defaultInterestRate = loans[0].loan_int_rate;
  $("#loan_int0" + 1).val(defaultInterestRate);
  var loanWithInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
  $("#loan_bal0" + 1).html(toComma(loanWithInterest.toFixed(2)));
  
  // pre-fill defaults for other loan years
  for(var i=2; i<6; i++) {
    $("#loan_year0" + i).val(defaultYear++);
    $("#loan_year0" + i).prop( "disabled", true );
    $("#loan_year0" + i).css("background-color", "gray");
    $("#loan_year0" + i).css("color", "white");
    $("#loan_amt0" + i).val(defaultLoanAmount.toFixed(2));
    $("#loan_int0" + i).val(defaultInterestRate);
    $("#loan_int0" + i).prop( "disabled", true );
    $("#loan_int0" + i).css("background-color", "gray");
    $("#loan_int0" + i).css("color", "white");
   loanWithInterest = (loanWithInterest + defaultLoanAmount) * (1 + defaultInterestRate);
   $("#loan_bal0" + i).html(toComma(loanWithInterest.toFixed(2)));
    } // end: "for" loop
  
  // all input fields: select contents on focus
  $("input[type=text]").focus(function() {
    $(this).select();
    $(this).css("background-color", "yellow");
  }); 
  $("input[type=text]").blur(function() {
    $(this).css("background-color", "white");
  });
  
  // set focus to first year: messes up codepen
  // $("#loan_year01").focus();
  $("#loan_year01").blur( function() {
    for(var i=0; i<5; i++) {
		let boxValue = $("#loan_year0"+ (i+1)).val();
		var numbers = /^[0-9]+$/;
		if(boxValue.match(numbers))
		{
			updateLoansArrayYear();
		}else{
			alert("Input not valid");
        }
	}
	
  });
  //$("#loan_amount01").blur( function() {
    //updateLoansArrayAmount();
  //});
  $("#loan_int01").blur( function() {
    for(var i=0; i<5; i++) {
		let boxValue = $("#loan_int0"+ (i+1)).val();
		boxValue = boxValue.replace(",","");
		var numbers = /^[0-9|.]+$/;
		if(boxValue.match(numbers))
		{
			updateLoansArrayYear();
		}else{
			alert("Input not valid");
        }
	}
  });
  
} // end: function loadDoc()


function toComma(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateLoansArrayYear() {
  loans[0].loan_year = parseInt($("#loan_year01").val());
  for(var i=1; i<5; i++) {
    loans[i].loan_year = loans[0].loan_year + i;
    $("#loan_year0"+ (i+1) ).val(loans[i].loan_year);
  }
}

//function updateLoansArrayAmount() {
	//loans[0].loan_amount = parseInt($("#loan_amount01").val());
	//for(var i=1; i=5; i++) {
		//loans[i].loan_amount = loans[0].loan_amount + i;
		//$("#loan_amount0"+ (i+1) ).val(loans[i].loan_amount);
	//}
//}

function updateLoansArrayInt() {
	loans[0].loan_int_rate = parseFloat($("#loan_int01").val());
	for(var i=1; i<5; i++) {
		loans[i].loan_int_rate = loans[0].loan_int_rate;
		$("#loan_int0"+ (i+1) ).val(loans[i].loan_int_rate);
	}
}