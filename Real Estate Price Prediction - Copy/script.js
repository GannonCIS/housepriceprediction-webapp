function getBHKValue() {
  // Get no of BHK's
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
    if (uiBHK[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getResaleValue() {
    // Get resale value
    var uiResale = document.getElementsByName("uiResale");
    for (var i in uiResale) {
    if (uiResale[i].checked) {
    return parseInt(i);
    }
    }
    return -1; // Invalid Value
    }
    
function getJogValue() {
    // Get jog track value
    var uiJog = document.getElementsByName("uiJog");
    for (var i in uiJog) {
    if (uiJog[i].checked) {
    return parseInt(i);
    }
    }
    return -1; // Invalid Value
    }
    
function getPoolValue() {
    // Get pool value
    var uiPool = document.getElementsByName("uiPool");
    for (var i in uiPool) {
    if (uiPool[i].checked) {
    return parseInt(i);
    }
    }
    return -1; // Invalid Value
    }

function onClickedEstimatePrice() {
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var resale = getResaleValue();
  var jog = getJogValue();
  var pool = getPoolValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price";
  //   var url = "/api/predict_home_price"; // only Deployment

  $.post(
    url,
    {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      resale: resale,
      jog:jog,
      pool:pool,
      location: location.value,
    },
    function (data, status) {
      estPrice.innerHTML =
        "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
    }
  );
}

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

  }
  document.getElementById('titleid').innerHTML=id;


}
function changeArea(val)
{
  document.getElementById('titleid').innerHTML=val;
}