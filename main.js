// fetch data form server.
airEngine = async (city) => {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=1a38bbe1a56f4e3899e93626232402&q=${city}&aqi=yes`,
    {
      method: "POST",
    }
  );

  let data = await response.json();
  // Alert when location not found.
  if (data.location == undefined) {
    alert("Location Not Found");
  }
  printer(data);
};
//This function will handle all DOM operations.
printer = (data) => {
  // To Save Time and ride from writing more code I named every id to response keys name and looped throw it but conditions need more improvements.
  idArray = [
    "name",
    "country",
    "tz_id",
    "temp_c",
    "localtime",
    "uv",
    "wind_kph",
    "wind_dir",
    "cloud",
    "co",
    "o3",
    "no2",
    "so2",
  ];
  for (let i = 0; i < idArray.length; i++) {
    let output = data["location"][idArray[i]];
    if (output !== undefined) {
      document.getElementById(idArray[i]).innerText = output;
    } else {
      let output = data["current"][idArray[i]];
      document.getElementById(idArray[i]).innerText = output;
      if (output == undefined) {
        let output = data["current"]["air_quality"][idArray[i]];
        document.getElementById(idArray[i]).innerText = parseInt(output);
      }
    }
  }
  // Weather Condition
  document.getElementById("condition").innerHTML = `<img
  src="http:${data.current.condition.icon}"
  alt=""
  height="72px"
  width="72px"
/>
<span class="text-4xl">${data.current.condition.text}</span>`;
  airQ = parseInt(data["current"]["air_quality"]["us-epa-index"]);
  // Air Quality Meatier
  switch (airQ) {
    case 1:
      document.getElementById("us-epa-index").innerText = "Good";
      break;
    case 2:
      document.getElementById("us-epa-index").innerText = "Moderate";
      break;
    case 3:
      document.getElementById("us-epa-index").innerText =
        "Unhealthy for Sensitive";
      break;
    case 4:
      document.getElementById("us-epa-index").innerText = "Unhealthy";
      break;
    case 5:
      document.getElementById("us-epa-index").innerText = "Very Unhealthy";
      break;
    case 6:
      document.getElementById("us-epa-index").innerText = "Hazardous";
      break;
  }
};
// Trigger search button event.
trigu = () => {
  let search = document.getElementById("search").value;
  // Search Validation
  if (search !== undefined && isNaN(search)) {
    airEngine(search);
  } else {
    alert("Valid city should be entered");
  }
};
