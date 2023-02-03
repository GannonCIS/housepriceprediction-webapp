let Bengaluru_areas = ["Abc", "Def"]
let Hydrabad_areas = ["Ghi", "Jkl"]
let Chennai_areas = ["Mno", "Pqr"]
function change(id)
{
  console.log(id);
  switch(id)
  {
    case "Delhi":
      document.getElementById("opt1").value="Sarojini";
      document.getElementById("opt1").innerHTML="Sarojini";
      document.getElementById("opt2").value="Punjabi Bagh";
      document.getElementById("opt2").innerHTML="Punjabi Bagh";
      document.getElementById("opt3").value="Kashmiri Gate";
      document.getElementById("opt3").innerHTML="Kashmiri Gate";
      document.getElementById('img1').src="delhibar.jpeg";
      document.getElementById('img2').src="delhigraph.jpeg";
      break;
    case "Hydrabad":
      document.getElementById("opt1").value="Jubilee Hills";
      document.getElementById("opt1").innerHTML="Jubilee Hills";
      document.getElementById("opt2").value="Charminar";
      document.getElementById("opt2").innerHTML="Charminar";
      document.getElementById("opt3").value="Secundarabad";
      document.getElementById("opt3").innerHTML="Secundarabad";
      document.getElementById('img1').src="hydrabadbar.jpeg";
      document.getElementById('img2').src="hydrabadgraph.jpeg";
      break;
    case "Mumbai":
      document.getElementById("opt1").value="Borivili";
      document.getElementById("opt1").innerHTML="Borivili";
      document.getElementById("opt2").value="Andheri";
      document.getElementById("opt2").innerHTML="Andheri";
      document.getElementById("opt3").value="Santacruz";
      document.getElementById("opt3").innerHTML="Santacruz";
      document.getElementById('img1').src="mumbaibar.jpeg";
      document.getElementById('img2').src="mumbaigraph.jpeg";
      break;
    case "Bangalore":
      document.getElementById("opt1").value="Kormangala";
      document.getElementById("opt1").innerHTML="Kormangala";
      document.getElementById("opt2").value="Whitefield";
      document.getElementById("opt2").innerHTML="Whitefield";
      document.getElementById("opt3").value="Indiranagar";
      document.getElementById("opt3").innerHTML="Indiranagar";
      document.getElementById('img1').src="first.jpeg";
      document.getElementById('img2').src="second.jpeg";
      break;
}
  document.getElementById('titleid').innerHTML=id;


}
function changeArea(val)
{
  document.getElementById('titleid').innerHTML=val;
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


async function predictPrice(sqft, bhk, resale, pool, jog, location) {
      console.log(sqft, bhk, resale, pool, jog, location),
      console.log(JSON.stringify({ sqft, bhk, resale, pool, jog, location}))

      const response = await fetch(`http://localhost:5000/predict`, {
      //const response = await fetch(`http://localhost:8080/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sqft, bhk, resale, pool, jog, location})
      });
      
      const estimatedPrice = await response.json();
      const prediction = estimatedPrice.prediction;
      console.log(prediction);
      return prediction   ;
    }
