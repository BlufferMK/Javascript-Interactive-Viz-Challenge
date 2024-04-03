
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// makePanel 1. loads the dataset , 2. drills down to data , 
//     3. filters the data to get demographics , 4. clears the panel , 
//     5. appends data to panel
function makePanel(meta) {
    // Load the dataset
    d3.json(url).then(function (data) {
        let dataArray = data.metadata;
// drill down to the correct sample that's selected by the dropdown
        function selectBelly(id) {
            return id.id == meta;
        };
        let currentBelly = dataArray.filter(selectBelly);

        d3.select(".eth").text(`ethnicity: ${currentBelly[0].ethnicity}`);
        d3.select(".gen").text(`gender: ${currentBelly[0].gender}`);
        d3.select(".age").text(`age: ${currentBelly[0].age}`);
        d3.select(".loc").text(`location: ${currentBelly[0].location}`);
        d3.select(".bbt").text(`bbtype: ${currentBelly[0].bbtype}`);
        d3.select(".freq").text(`wfreq: ${currentBelly[0].wfreq}`);
    });
};

//makeBubbleChart 

function makeBubbleChart(sample) {
// Load the dataset
    d3.json(url).then(function (data) {
        let dataArray = data.samples;
        
// drill down to the correct sample that's selected by the dropdown
        function selectBelly(id) {
            return id.id == sample;
        };
        let currentBelly = dataArray.filter(selectBelly);

// drill down to the individual arrays needed and store them in variables
        let sample_values = currentBelly[0].sample_values;
        let otu_ids = currentBelly[0].otu_ids;
        let otu_labels = currentBelly[0].otu_labels;
     
// setting up the bubble chart
        let bubble1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
            },
        };
        let bubble = [bubble1];
        let layoutBub = {
            title: "Operational Taxonomic Units Found",
            showlegend: false,
            xaxis: {
                title: "OTU - ID"
            },
            yaxis: {
                title: "Abundance"
            }
        };
//Create the bubble chart
        Plotly.newPlot("bubble",bubble,layoutBub);
    });

}
//makeBarChart 
function makeBarChart(sample) {
 //load the dataset
        d3.json(url).then(function (data) {
        let dataArray = data.samples;

// drill down to the correct sample that's selected by the dropdown
        function selectBelly(id) {
            return id.id == sample;
        };
        let currentBelly = dataArray.filter(selectBelly);

        // drill down to the individual arrays for plotting
        let samp_values = currentBelly[0].sample_values;
        let ot_ids = currentBelly[0].otu_ids;
        let ot_labels = currentBelly[0].otu_labels;
       // arrays are already set up sorted in descending order by sample value.  we need the first 10 of each array
        let sample_values = samp_values.slice(0,9);
        let otu_ids = ot_ids.slice(0,9);
        let otu_labels = ot_labels.slice(0,9);

// setting up the horizontal bar chart
        let trace1 = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: "bar",
            orientation: 'h'
        };
        let plot = [trace1];
        let layout = {
            title: "Ten most abundant OTU Ids on Subject",
            xaxis: {
                title: "Abundance"
            },
            yaxis: {
                title: "Operational Taxonomic Unit ID",
                type: 'category',
                tickvals: otu_ids,
                ticktext: otu_ids
            }
        };
// Create the bar chart
        Plotly.newPlot("bar", plot, layout);
       
});
};
// optionChanged function takes the value and passes it to makePanel and makeCharts
function optionChanged(x) {
    makePanel(x);
    makeBarChart(x);
    makeBubbleChart(x)
};
// init function 1. reads in data, 2. drills down to names, 3. selects the dataArray with names, 
//      4. builds the dropdown list in a for loop, 5. takes the 1st item and sends it to other functions
function init() {
    d3.json(url).then(function (data) {
        let dropdownMenu = d3.select("#selDataset");
        let dataArray = data.names;
        for (let i = 0; i < dataArray.length; i++) {
            dropdownMenu.append("option").text(dataArray[i]).property("value", dataArray[i]);
        }
        makePanel(dataArray[0]);
        makeBubbleChart(dataArray[0]);
        makeBarChart(dataArray[0]);
       
    });
}

init();