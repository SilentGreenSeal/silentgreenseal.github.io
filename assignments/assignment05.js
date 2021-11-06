// ---------- Global variables ----------

// use "var" keyword so code works in CodePen

// Covid19api variables
var URL = "https://api.covid19api.com/summary";
var covidJson;
var covidJsObj;
var newConfirmedOver1000;

// AJAX variable
var xhttp;

// Chart.js variables

// modified from : https://www.sitepoint.com/introduction-chart-js-2-0-six-examples/
// "ctx" is the canvas HTML element where the chart is rendered in the browser
//var dayjs = require('dayjs')
//import dayjs from 'dayjs'
//dayjs().format();
var today = dayjs().format("YYYY-MM-DD");
var ctx = 
  document.getElementById('myChart').getContext('2d');
// "chartData" includes the graph AND the formatting, including title, legend, axes, etc.
var chartData = {
  type: 'bar',
  data: {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
      label: 'apples',
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: "rgba(255,0,0,0.4)"
    }, {
      label: 'oranges',
      data: [2, 29, 5, 5, 2, 3, 10],
      backgroundColor: "rgba(255,140,0,0.4)"
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Apples and Oranges'
    },
    scales: {
      yAxes: [{
        ticks: {
          // logarithmic scale ignores maxTicksLimit
          maxTicksLimit: 11,
          callback: function(label, index, labels) {
            return (   label/1000 > 9 
                    || label/1000 == 1 
                    || label/1000 == 0.1 
                    || label/1000 == 0.01) 
              ? label/1000+'k' :  "";
          }
        },
        scaleLabel: {
          display: true,
          labelString: '1k = 1000'
        },
        // logarithmic scale ignores maxTicksLimit
        type: "logarithmic"
      }]
    }
  }
};
// var myChart = new Chart(ctx, chartData); 

// ---------- loadContent() function ----------

// Note: you can't execute API data dependent code outside the loadContent() function because the code might execute before the AJAX call responds, that is, it might execute before the variable, covidJson, is initialized with data from the API. Example below.
// console.log(covidJson.Global.NewConfirmed); // error 

// code below modified from: 
// https://www.w3schools.com/js/js_ajax_intro.asp

function loadContent() {
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 
        && this.status == 200) {
      
      covidJson = this.responseText;
      covidJsObj = JSON.parse(covidJson);
      newConfirmedOver1000 = [];
      
	    for (let c of covidJsObj.Countries) {
        if (c.NewConfirmed > 5000) {
          newConfirmedOver1000.push({ 
            "Slug": c.Slug, 
            "NewConfirmed": c.NewConfirmed, 
            "NewDeaths": c.NewDeaths
          });
        }
      }
      newConfirmedOver1000 = _.orderBy(newConfirmedOver1000, "NewDeaths", "desc");

      chartData.data.datasets[0].backgroundColor 
        = "rgba(100,100,100,0.4)"; // gray
      chartData.data.datasets[1].backgroundColor 
        = "rgba(255,0,0,0.4)"; // red
      chartData.data.datasets[0].label  
        = 'new cases';
      chartData.data.datasets[1].label  
        = 'new deaths';
      chartData.data.labels  
        = newConfirmedOver1000.map( (x) => x.Slug );
      chartData.data.datasets[0].data  
        = newConfirmedOver1000.map( 
          (x) => x.NewConfirmed );
      chartData.data.datasets[1].data  
        = newConfirmedOver1000.map( 
          (x) => x.NewDeaths );
      chartData.options.title.text 
        = "Covid 19 Hotspots "+ today;
      myChart = new Chart(ctx, chartData); 
  
	  loadArray();

    } // end if
    
  }; // end xhttp.onreadystatechange = function()
  
  xhttp.open("GET", URL, true);
  xhttp.send();
  
} // end function loadContent() 

// data from: https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population
var populations=[];
populations.push({name:'china',pop: 1405137440});
populations.push({name:'india',pop:1369152434});
populations.push({name:'united-states',pop:330578332});
populations.push({name:'indonesia',pop:269603400});
populations.push({name:'pakistan',pop:220892331});
populations.push({name:'brazil',pop:212281095});
populations.push({name:'nigeria',pop:206139587});
populations.push({name:'bangladesh',pop:169575884});
populations.push({name:'russia',pop:146748590});
populations.push({name:'mexico',pop:127792286});
populations.push({name:'japan',pop:125880000});
populations.push({name:'philippines',pop:109376023});
populations.push({name:'congo',pop:101935800});
populations.push({name:'egypt',pop:101126063});
populations.push({name:'ethiopia',pop:100829000});
populations.push({name:'vietnam',pop:96483981});
populations.push({name:'iran',pop:83914898});
populations.push({name:'turkey',pop:83154997});
populations.push({name:'germany',pop:83122889});
populations.push({name:'france',pop:67146000});
populations.push({name:'united-kingdom',pop:66796807});
populations.push({name:'thailand',pop:66571530});
populations.push({name:'italy',pop:60026546});
populations.push({name:'south-africa',pop:59622350});
populations.push({name:'tanzania',pop:57637628});
populations.push({name:'myanmar',pop:54817919});
populations.push({name:'south-korea',pop:51841786});
populations.push({name:'colombia',pop:50372424});
populations.push({name:'kenya',pop:47564296});
populations.push({name:'spain',pop:47329981});
populations.push({name:'argentina',pop:45376763});
populations.push({name:'algeria',pop:43900000});
populations.push({name:'sudan',pop:42957030});
populations.push({name:'ukraine',pop:41723998});
populations.push({name:'uganda',pop:41583600});
populations.push({name:'iraq',pop:40150200});
populations.push({name:'poland',pop:38352000});
populations.push({name:'canada',pop:38229409});
populations.push({name:'morocco',pop:36063063});
populations.push({name:'uzbekistan',pop:34501586});
populations.push({name:'saudi-arabia',pop:34218169});
populations.push({name:'afghanistan',pop:32890171});
populations.push({name:'malaysia',pop:32703180});
populations.push({name:'peru',pop:32625948});
populations.push({name:'angola',pop:31127674});
populations.push({name:'ghana',pop:30955202});
populations.push({name:'mozambique',pop:30066648});
populations.push({name:'nepal',pop:29996478});
populations.push({name:'yemen',pop:29825968});
populations.push({name:'venezuela',pop:28435943});
populations.push({name:'ivory-coast',pop:26453542});
populations.push({name:'madagascar',pop:26251309});
populations.push({name:'australia',pop:25690614});
populations.push({name:'north-korea',pop:25550000});
populations.push({name:'cameroon',pop:24348251});
populations.push({name:'taiwan',pop:23568378});
populations.push({name:'niger',pop:23196002});
populations.push({name:'sri-lanka',pop:21803000});
populations.push({name:'burkina-faso',pop:21510181});
populations.push({name:'mali',pop:20250833});
populations.push({name:'chile',pop:19458310});
populations.push({name:'romania',pop:19317984});
populations.push({name:'kazakhstan',pop:18806296});
populations.push({name:'malawi',pop:18449828});
populations.push({name:'zambia',pop:17885422});
populations.push({name:'ecuador',pop:17601388});
populations.push({name:'netherlands',pop:17525931});
populations.push({name:'syria',pop:17500657});
populations.push({name:'guatemala',pop:16858333});
populations.push({name:'senegal',pop:16705608});
populations.push({name:'chad',pop:16244513});
populations.push({name:'somalia',pop:15893219});
populations.push({name:'zimbabwe',pop:15473818});
populations.push({name:'cambodia',pop:15288489});
populations.push({name:'south-sudan',pop:13249924});
populations.push({name:'rwanda',pop:12663116});
populations.push({name:'guinea',pop:12559623});
populations.push({name:'burundi',pop:12309600});
populations.push({name:'benin',pop:12114193});
populations.push({name:'haiti',pop:11743017});
populations.push({name:'tunisia',pop:11708370});
populations.push({name:'bolivia',pop:11633371});
populations.push({name:'belgium',pop:11539878});
populations.push({name:'cuba',pop:11193470});
populations.push({name:'jordan',pop:10804332});
populations.push({name:'greece',pop:10724599});
populations.push({name:'czech-republic',pop:10699142});
populations.push({name:'dominican-republic',pop:10448499});
populations.push({name:'sweden',pop:10367232});
populations.push({name:'portugal',pop:10295909});
populations.push({name:'azerbaijan',pop:10095900});
populations.push({name:'hungary',pop:9769526});
populations.push({name:'belarus',pop:9408400});
populations.push({name:'united-arab-emirates',pop:9366829});
populations.push({name:'tajikistan',pop:9313800});
populations.push({name:'honduras',pop:9304380});
populations.push({name:'israel',pop:9272700});
populations.push({name:'papua-new-guinea',pop:8935000});
populations.push({name:'austria',pop:8915382});
populations.push({name:'switzerland',pop:8632703});

// step2 
// new array 
// loop through all covidJsObj.Countries[i] 
// push all info i need
function loadArray() {
	var newArray = [] 
	for (let i=0; i<covidJsObj.Countries.length; i++) {
		var toFind = covidJsObj.Countries[i].Slug;
		for (var j = 0, len = populations.length; j < len; j++) {
			if (populations[j].name.toLowerCase() === toFind.toLowerCase()) {
				break;
			}
		}
		var pop = populations[j][1];
		var td = covidJsObj.Countries[i].TotalDeaths;
	newArray.push({
		"Slug": "\"" + covidJsObj.Countries[i].Slug + "\"",
		"TotalConfirmed": covidJsObj.Countries[i].TotalConfirmed,
		"TotalDeaths": td,
		"Population": pop,
		"TotalConfirmedPer100000": (td/pop)*100000
  })
}
  
}
