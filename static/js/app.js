// var eyeColor = ["Brown", "Brown", "Brown", "Brown", "Brown",
//   "Brown", "Brown", "Brown", "Green", "Green",
//   "Green", "Green", "Green", "Blue", "Blue",
//   "Blue", "Blue", "Blue", "Blue"];
// var eyeFlicker = [26.8, 27.9, 23.7, 25, 26.3, 24.8,
//   25.7, 24.5, 26.4, 24.2, 28, 26.9,
//   29.1, 25.7, 27.2, 29.9, 28.5, 29.4, 28.3];

const samples = "samples.json"

// Fetch the JSON data and console log it
d3.json(samples).then((data) => {

  console.log(data);

  //// define variables for each data section
  //var listDDVals = [[data].map(name => name.names)];
  var listDDVals = data.names;
  console.log(listDDVals);

  populateDropDown(listDDVals);
});


///////////////////////////////////////////////////
//   //CREATE BAR
//   //  Create the Traces
//   var trace1 = {
//     x: data.sample_values,
//     y: data.otu_ids,
//     type: "bar",
//     orientation: "h",
//     name: "HEEEEEEEEEERRRRRREEEEEEEE",
//   };

//   // Create the data array for the plot
//   var data = [trace1];

//   // Define the plot layout
//   var layout = {
//     title: "TITLE",
//     xaxis: { title: "XAXIS" },
//     yaxis: { title: "YAXIS" }
//   };

//   // Plot the chart to a div tag with id "plot"
//   Plotly.newPlot("bar", data, layout);
// });

// // Create the Trace
// var trace1 = {
//     x: eyeColor,
//     y:eyeFlicker,
//     type:"bar",
//     orientation: "h"
// };

// // Create the data array for our plot
// var data = [trace1];

// // Define our plot layout
// var layout={
//     title:"Eye Flicker Tracker"
// };

// // Plot the chart to a div tag with id "bar-plot"
// Plotly.newPlot("bar-plot", data, layout);


/////////////////////////////////////////////
////Functions
function populateDropDown(list) {
  var dropdownTag = document.getElementById("selDataset");
  console.log(dropdownTag);
  console.log(list.length);
  console.log(list);

  for (var i = 0; i < list.length; i++) {
    var newOption = list[i];

    var el = document.createElement("option");
    el.textContent = newOption;
    el.value = newOption;

    dropdownTag.append(el);
  }
};