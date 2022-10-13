//api url where data is stored
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Fetch the JSON data 
d3.json(url).then(function (data) {

    selectDropDown = d3.select('#selDataset')
    dataNames = data.names
    console.log(data)
    //push the dataNames variable into dropdown options. "option" is the div, 
    dataNames.map((name) => {
        selectDropDown.append("option").text(name).property("value", name);

    

    })

});

// this allows us to change the data by optionsChange on the onchange in html, line 25
function optionChanged(subjectID) {
    buildmetadata(subjectID);
    buildCharts(subjectID);

}

function buildmetadata(subjectID) {

    d3.json(url).then(function (data) {
        metadatadiv = d3.select('#sample-metadata')
        metadata = data.metadata
        //filtering through data to make subjectID be the dropdown id
        var resultArray = metadata.filter(sampleObj => sampleObj.id == subjectID);
        // console.log(resultArray)
        result = resultArray[0]
        console.log(result)
        //clearing the html from the page
        metadatadiv.html("")
        //setting the key value pairs from result variable
        Object.entries(result).map(([key, value]) => {
            metadatadiv.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });
}

function buildCharts(subjectID) {
    d3.json(url).then(function (data) {

        datasamples = data.samples

        var resultArray = datasamples.filter(sampleObj => sampleObj.id == subjectID);
        result = resultArray[0]

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);



    })
}




