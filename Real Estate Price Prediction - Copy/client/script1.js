// JavaScript code to fetch data from form and make prediction using trained model

async function onClickedEstimatePrice() {
    const sqft = +document.getElementById("uiSqft").value;
    const bhk = +document.querySelector('input[name="uiBHK"]:checked').value;
    const resale = +document.querySelector('input[name="uiResale"]:checked').value;
    const pool = +document.querySelector('input[name="uiPool"]:checked').value;
    const jog = +document.querySelector('input[name="uiJog"]:checked').value;
    const location = document.getElementById("uiLocations").value;
  
    // Placeholder for your machine learning model's prediction logic
    const estimatedPrice = await predictPrice(sqft, bhk, resale, pool, jog, location);
  
    document.getElementById("uiEstimatedPrice").innerHTML = `<h2>Estimated Price: $ ${estimatedPrice}</h2>`;
  }
  
 
async function predictPrice(sqft, bhk, resale, pool, jog, location) {
        console.log(sqft, bhk, resale, pool, jog, location),
        console.log(JSON.stringify({ sqft, bhk, resale, pool, jog}))

        const response = await fetch(`http://localhost:5000/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sqft, bhk, resale, pool, jog})
        });
        
        const estimatedPrice = await response.json();
        const prediction = estimatedPrice.prediction;
        console.log(prediction);
        return prediction   ;
      }
