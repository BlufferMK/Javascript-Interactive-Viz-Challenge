
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// makePanel 1. loads the dataset , 2. drills down to data , 
//     3. filters the data to get demographics , 4. clears the panel , 
//     5. appends data to panel
function makePanel(meta) {
    d3.json(url).then(function (data) {
        let dataArray = data.metadata;

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

//makeCharts 1. loads the dataset (done), 2. drills down to data (needs work),
//     3. filters the data to get correct data (needs work), 4. creates variables (otu_ids and sample_values) (needs work)
//     5. creates charts (needs work)
function makeCharts(sample) {
    d3.json(url).then(function (data) {
        let dataArray = data.samples;
        console.log(dataArray);
    });
}
// optionChanged function takes the value and passes it to makePanel and makeCharts
function optionChanged(x) {
    makePanel(x);
    makeCharts(x);
}
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
        makeCharts(dataArray[0]);
        console.log(dataArray[0]);
    });
}

init();