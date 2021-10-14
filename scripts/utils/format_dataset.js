const fs = require("fs");
const csv = require("csv-parser");

/**
 * 
 * @param {string} url 
 * @returns 
 */
function parseURL(url) {
    return url.split(".").slice(-2).join(".").split("/").join("").split("https:").join("").split("http:").join("").trim();
}

module.exports = function parseData() {
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