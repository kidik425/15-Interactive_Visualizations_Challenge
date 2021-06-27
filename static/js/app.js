
const samples = "samples.json"

d3.json(samples).then((data) => {
  var listDDVals = data.names; //filter the json by getting just the names tag info

  populateDropDown(listDDVals);   //Populate the DropDown list
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
//Main function to call child functions
function optionChanged(val) {
  // Fetch the JSON data and console log it
  d3.json(samples).then((data) => {
    //console.log(data);

    var listMetaData = data.metadata;
    var listOTU = data.samples;
    //console.log(listMetaData);

    //Populate the Demo Info
    populateDemoInfo(listMetaData, val);
  });
};

//Populates the dropdown list
function populateDropDown(list) {
  var dropdownTag = document.getElementById("selDataset");
  // console.log(dropdownTag);
  // console.log(list.length);
  // console.log(list);

  for (var i = 0; i < list.length; i++) {
    var newOption = list[i];

    var el = document.createElement("option");
    el.textContent = newOption;
    el.value = newOption;

    dropdownTag.append(el);
  }
};

//Populate the demo information
function populateDemoInfo(list, val) {
  var meta = d3.select("#sample-metadata");  //select the html tag to encapsilate the information
  console.log(meta);

  var filteredList = list.filter(equalsVal(val)); //filter list to the selected value 
  //console.log(filteredList); //sanity check

  filteredList.forEach((pair) => {
    var ui = meta.append("ui");
    Object.entries(pair).forEach(([key, value]) => {
      var entry = meta.append("li");
      entry.text(`${key}: ${value}`);
    });
  });

  console.log(meta);
};

function equalsVal(val) {
  return function (list) {
    return list.id == val;
  }
}