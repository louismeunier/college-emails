const request = require("request");
const fs = require("fs");
const unzipper = require("unzipper");

const downloadData = async () => {
    const directory = await unzipper.Open.url(request,'https://ed-public-download.app.cloud.gov/downloads/CollegeScorecard_Raw_Data_08032021.zip');
    const file = directory.files.find(d => d.path === 'MERGED2019_20_PP.csv');
    const content = await file.buffer();

    fs.writeFile("constants/colleges_raw.csv", content.toString(), {flag: "w"}, (err) => {
        if (err) throw err;
        console.log("Wrote raw file")        
    })
}

downloadData();