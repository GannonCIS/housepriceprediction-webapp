let Bengaluru_areas = ["Abc", "Def"]
let Hydrabad_areas = ["Ghi", "Jkl"]
let Chennai_areas = ["Mno", "Pqr"]
function change(id)
{
  console.log(id);
  switch(id)
  {
    case "Delhi":
      document.getElementById("graphId").value= 1;
      document.getElementById("opt1").value="Sarojini";
      document.getElementById("opt1").innerHTML="Sarojini";
      document.getElementById("opt2").value="Punjabi Bagh";
      document.getElementById("opt2").innerHTML="Punjabi Bagh";
      document.getElementById("opt3").value="Kashmiri Gate";
      document.getElementById("opt3").innerHTML="Kashmiri Gate";
      document.getElementById('img1').src="/static/delhibar.jpeg";
      document.getElementById('img2').src="/static/delhigraph.jpeg";
      break;
    case "Hyderabad":
      document.getElementById("graphId").value= 2;
      document.getElementById("opt1").value="Jubilee Hills";
      document.getElementById("opt1").innerHTML="Jubilee Hills";
      document.getElementById("opt2").value="Charminar";
      document.getElementById("opt2").innerHTML="Charminar";
      document.getElementById("opt3").value="Secundarabad";
      document.getElementById("opt3").innerHTML="Secundarabad";
      document.getElementById('img1').src="/static/hydrabadbar.jpeg";
      document.getElementById('img2').src="/static/hydrabadgraph.jpeg";
      break;
    case "Mumbai":
      document.getElementById("graphId").value= 3;
      document.getElementById("opt1").value="Borivili";
      document.getElementById("opt1").innerHTML="Borivili";
      document.getElementById("opt2").value="Andheri";
      document.getElementById("opt2").innerHTML="Andheri";
      document.getElementById("opt3").value="Santacruz";
      document.getElementById("opt3").innerHTML="Santacruz";
      document.getElementById('img1').src="/static/mumbaibar.jpeg";
      document.getElementById('img2').src="/static/mumbaigraph.jpeg";
      break;
    case "Bangalore":
      document.getElementById("graphId").value= 4;

      document.getElementById("opt1").value="Kormangala";
      document.getElementById("opt1").innerHTML="Kormangala";
      document.getElementById("opt2").value="Whitefield";
      document.getElementById("opt2").innerHTML="Whitefield";
      document.getElementById("opt3").value="Indiranagar";
      document.getElementById("opt3").innerHTML="Indiranagar";
      document.getElementById('img1').src="/static/first.jpg";
      document.getElementById('img2').src="/static/second.jpg";
      break;
}
  document.getElementById('titleid').innerHTML=id + " House Price Prediction"  ;


}
function changeArea(val)
{
  // document.getElementById('titleid').innerHTML=val;
}


async function onClickedEstimatePrice() {
  const sqft = +document.getElementById("uiSqft").value;
  const bhk = +document.querySelector('input[name="uiBHK"]:checked').value;
  const resale = +document.querySelector('input[name="uiResale"]:checked').value;
  const pool = +document.querySelector('input[name="uiPool"]:checked').value;
  const jog = +document.querySelector('input[name="uiJog"]:checked').value;
  //const location = document.getElementById("uiLocations").value;
  let location = 0;
  const selectedCity = document.getElementById("uiLocations").value;
  switch(selectedCity) {
  case "Delhi":
  location = 1;
  break;
  case "Hyderabad":
  location = 2;
  break;
  case "Mumbai":
  location = 3;
  break;
  case "Bangalore":
  location = 4;
  break;
  }

  console.log(location)
  // Placeholder for your machine learning model's prediction logic
  const estimatedPrice = await predictPrice(sqft, bhk, resale, pool, jog, location);
  
  document.getElementById("uiEstimatedPrice").innerHTML = `<h2>Estimated Price: $ ${estimatedPrice}</h2>`;
}

function onShowGraph(location){
	window.location.href = "countplot/" + document.getElementById("graphId").value;
}

function infoAlertFunction() {
  alert(
    'Welcome to our property price prediction tool! This tool is designed to help you estimate the price of a property based on a few key factors.\n\n '
  
    + "Here's how to use it:\n\n"
    
    +"Step 1 : Choose the location The first step is to choose the location of the property you're interested in. You can choose from one of four locations: Bangalore, Hydrabad, Mumbai, or Delhi.\n\n"
  
    +"Step 2 : Enter the property details Next, you'll need to enter some details about the property. Specifically, you'll need to enter the following information:\n\n"
  
    +'Square footage: This is the total area of the property in square feet.\n\n'
  
    +'Number of bedrooms This is the total number of bedrooms in the property.\n\n'
  
    +'Resale status: Is the property new, or is it a resale? Select "New" or "Resale" accordingly.\n\n'
  
    +'Pool: Does the propert have a pool? Select "Yes" or "No" accordingly.\n\n'
  
    +'Jogging track: Does the property have a jogging track? Select "Yes" or "No" accordingly.\n\n'
  
    +'Step 3 : Get your estimate \n'
    +"Once you've entered all the necessary information, simply click 'Get Estimate' to get an estimate of the price of the propert based on the details you provided.\n\n"

  );
}



function infoAlertHiddenFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "block") {
    x.style.display = "none";
    console.log("none")
  } else {
    x.style.display = "block";
    console.log("block")
  }
}

function closeAlert() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "fixed") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}





async function predictPrice(sqft, bhk, resale, pool, jog, location) {
      console.log(sqft, bhk, resale, pool, jog, location),
      console.log(JSON.stringify({ sqft, bhk, resale, pool, jog, location}))

      //const response = await fetch(`http://localhost:5000/predict`, {
      const response = await fetch(`http://ec2-35-78-242-82.ap-northeast-1.compute.amazonaws.com:8080/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sqft, bhk, resale, pool, jog, location})
      });
      
      const estimatedPrice = await response.json();
      const prediction = estimatedPrice.prediction;
      console.log(prediction);
      return prediction   ;
    }

