const fs = require("fs");
const csv = require("csv-parser");

/**
 * 
 * @param {string} url 
 * @returns 
 */
function parseURL(url) {
    // return url.split(".").slice(-2).join(".").split("/").join("").split("https:").join("").split("http:").join("").trim();
    const just_the_url = url.replace(/^http.:\/\//, "")
    console.log(just_the_url);
    const without_www_arr = just_the_url.replace("www.", "")
    console.log(without_www_arr);
    const cleaned_up = without_www_arr.replace("/", "")
    return cleaned_up;
}

function parseData() {
    let fmt = {};

    fs.createReadStream("constants/colleges_raw.csv")
        .pipe(csv())
        .on("data", row => {
            fmt[parseURL(row["INSTURL"])] = {
                name: row.INSTNM,
                state: row.STABBR,
                coords: [row.LONGITUDE, row.LATITUDE]
            }
        })
        .on("end", () => fs.writeFile("./data/colleges_full.json",JSON.stringify(fmt),()=>{}))    
}

parseData()