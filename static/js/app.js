const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
  console.log(data.names);
  const namesArray = data.names;
  console.log(data.samples);
  const samplesArray = data.samples;
  let mapOtuids = samplesArray.map(function (id) {
    return id.otu_ids;
  });
  let mapOtuSamples = samplesArray.map(function (sample) {
    return sample.sample_values;
  });
  console.log(mapOtuids);
  console.log(mapOtuSamples);
  //namesArray.forEach(name => {
  //  console.log(name);
  //});

  // Select the dropdown menu element by its ID
  const dropdownMenu = document.getElementById("selDataset");

  // Loop through the names array and create an <option> element for each name
  namesArray.forEach(name => {
    // Create a new <option> element
    const option = document.createElement("option");
    // Set the text of the option to the name
    option.text = name;
    // Set the value of the option to the name (optional)
    option.value = name;
    // Append the option to the dropdown menu
    dropdownMenu.appendChild(option);
  });

  // Initializes the page with a default plot
  function init() {
    let trace1 = {
      x: mapOtuids[0],
      y: mapOtuSamples[0]
    };
    let data = [trace1];
    Plotly.newPlot("plot", data);
  };
});

// Call optionChanged() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);

// This function is called when a dropdown menu item is selected
function optionChanged() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");

  // Initialize x and y arrays
  let x = [];
  let y = [];

  if (dataset === 'dataset1') {
    x = [1, 2, 3, 4, 5];
    y = [1, 2, 4, 8, 16];
  }

  else if (dataset === 'dataset2') {
    x = [10, 20, 30, 40, 50];
    y = [1, 10, 100, 1000, 10000];
  }

  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle("plot", "x", [x]);
  Plotly.restyle("plot", "y", [y]);
}

init();
