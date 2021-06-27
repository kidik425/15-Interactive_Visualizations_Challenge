
const samples = "samples.json"

d3.json(samples).then((data) => {
  var listDDVals = data.names; //filter the json by getting just the names tag info

  populateDropDown(listDDVals);

});

optionChanged(940);

/////////////////////////////////////////////
////Functions
//Main function to call child functions
function optionChanged(val) {
  // Fetch the JSON data and console log it
  d3.json(samples).then((data) => {
    var listMetaData = data.metadata.filter(equalsVal(val)); //create metadata based on val
    var listOTU = data.samples.filter(equalsVal(val)); //create otu info based on val
    // console.log(listMetaData); //sanity check
    // console.log(listOTU); //sanity check

    //Populate the dashboard 
    populateDemoInfo(listMetaData, val); //the Demo Info
    populateBar(listOTU); //OTU Bar
    populateBubble(listOTU); //OTU Bubble
    populateGauge(listMetaData);

  });
};

//Populates the dropdown list
function populateDropDown(list) {
  var initialVal = 0
  var dropdownTag = document.getElementById("selDataset");
  // console.log(dropdownTag);  //sanity check
  // console.log(list.length);  //sanity check
  // console.log(list);  //sanity check

  for (var i = 0; i < list.length; i++) {
    var newOption = list[i];

    var el = document.createElement("option");
    el.textContent = newOption;
    el.value = newOption;

    dropdownTag.append(el);
  }
};

//Populate the demo information
function populateDemoInfo(list) {
  var meta = d3.select("#sample-metadata");  //select the html tag to encapsilate the information
  //console.log(meta); //sanity check

  meta.html(""); //clears previous metadata information

  var ul = meta.append("ul"); //create unstruct list

  list.forEach((pair) => { //create the list for each KVP
    Object.entries(pair).forEach(([key, value]) => {
      var entry = ul.append("li");
      entry.text(`${key.toUpperCase()}: ${value}`);
    });
  });
};

//creates filter to be used across site
function equalsVal(val) {
  return function (list) {
    return list.id == val;
  }
}

//create bar
function populateBar(list) {
  //Create the Traces
  const n = 10
  var otuIds = list.map(rec => rec.otu_ids);
  var sampleVals = list.map(rec => rec.sample_values);
  var otuLabels = list.map(rec => rec.otu_labels);

  var xaxis = sampleVals.flat().slice(0, n) //adding flat() since there is a nested array
  var yaxis = otuIds.flat().map(id => `OTU ${id}`).slice(0, n) //appending a literal
  var text = otuLabels.flat().slice(0, n)

  // console.log(xaxis); //sanity check
  // console.log(yaxis); //sanity check
  // console.log(text) //sanity check

  var trace = {
    x: xaxis,
    y: yaxis,
    text: text,
    type: "bar",
    orientation: "h",
  };

  // Create the data array for the plot
  var data = [trace];

  // Define the plot layout
  var layout = {
    title: "Top Ten Bacteria Cultures Found",
    barmode: "stack",
    yaxis: { autorange: 'reversed' }
  };

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("bar", data, layout);
}


//Create Bubble
function populateBubble(list) {
  //Create the Traces
  var otuIds = list.map(rec => rec.otu_ids).flat();
  var sampleVals = list.map(rec => rec.sample_values).flat();
  var otuLabels = list.map(rec => rec.otu_labels).flat();

  // console.log(otuIds); //sanity check
  // console.log(sampleVals); //sanity check
  // console.log(otuLabels) //sanity check

  var trace = {
    x: otuIds, //xaxis,
    y: sampleVals, //yaxis,
    mode: 'markers',
    text: otuLabels,
    marker: {
      size: sampleVals,
      color: otuIds
    },
  };

  // Create the data array for the plot
  var data = [trace];

  // Define the plot layout
  var layout = {
    title: "Bacteria Cultures Per Sample"
  };

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("bubble", data, layout);
}

//Create gauge
function populateGauge(list) {
  //Create the Traces
  var wfreq = list.map(rec => rec.wfreq).flat();

  console.log(wfreq); //sanity check

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: parseInt(wfreq),
      title: {text: "Scrubs per Week" },
      type: "indicator",
      mode: "gauge",
      nticks: 9,
      gauge: {
        axis: { range: [null, 9],tickvals:[0,1,2,3,4,5,6,7,8,9] },
        steps: [
          { range: [0, 1], color: "#d6ecd2" },
          { range: [1, 2], color: "#b7ddb0" },
          { range: [2, 3], color: "#99d18f" },
          { range: [3, 4], color: "#7bc86c" },
          { range: [4, 5], color: "#61bd4f" },
          { range: [5, 6], color: "#5aac44" },
          { range: [6, 7], color: "#519839" },
          { range: [7, 8], color: "#49852e" },
          { range: [8, 9], color: "#3f6f21" }
        ],
        threshold: {
          line: { color: "4e2f61", width: 4 },
          thickness: 0.75,
          value: parseInt(wfreq)
        }
      }
    }
  ];

  var layout = {width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);
}