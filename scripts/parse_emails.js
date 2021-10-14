const fs = require("fs");
const colleges = require("./data/colleges_full.json");

/**
 * @param {[]string} urls
 */
function parseEmails(urls) {

    let formatted_statistics = {
        byState: {},
        byCollege: {}
    };

    let failed_arr = [];

    urls.forEach(url => {
        const college_search = colleges[url];

        if (!college_search) {
            failed_arr.push(url);
        }

        else {
            const { name, state, coords } = college_search;

            // add data about state
            if (formatted_statistics.byState[state] !== undefined) {
                formatted_statistics.byState[state]++;
            } else {
                formatted_statistics.byState[state] = 1;
            }

            // add data about college
            if (formatted_statistics.byCollege[name] !== undefined) {
                formatted_statistics.byCollege[name]++;
            } else {
                formatted_statistics.byCollege[name] = 1;
            }
        }
    })

    fs.writeFile("./client/src/data.json", JSON.stringify(formatted_statistics), (err)=>{if (err) throw err});
    console.log("BY COLLEGE");
    console.table(formatted_statistics.byCollege);
    console.log("BY STATE");
    console.table(formatted_statistics.byState);
    console.log(`${Math.round((failed_arr.length/urls.length)*10000) / 100} % loss, due to missing emails. ${[...new Set(failed_arr)].length} unique emails not found.`)
}

module.exports = parseEmails;