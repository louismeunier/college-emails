const fs = require("fs");
const colleges = require("./data/colleges_full.json");
const fetch = require("node-fetch").default;

function parseURL(url) {
    // return url.split(".").slice(-2).join(".").split("/").join("").split("https:").join("").split("http:").join("").trim();
    const just_the_url = url.replace(/^http.:\/\//, "")
    console.log(just_the_url);
    const without_www_arr = just_the_url.replace("www.", "")
    console.log(without_www_arr);
    const cleaned_up = without_www_arr.replace("/", "")
    return cleaned_up;
}

/**
 * Checks if a url redirects, and if it does, returns the redirected url, and if it doesn't, returns null.
 * @param {string} url 
 * @return {Promise<string | null>}
 */
async function checkRedirect(url) {
    const res = await fetch(url).catch(err => console.log(`An error occurred with url ${url}`));
    if (res && res.redirected) {
        return res.url;
    } else {
        return null;
    }
}

/**
 * Parses colleges from urls and counts the number of occurrences, then writes them to a local file
 * @param {string[] | [][]} urls
 * @param {object} dates
 */
async function parseEmails(urls, dates) {

    let formatted_statistics = {
        byState: {},
        byCollege: {}
    };

    let failed_arr = [];

    /**
     * Increment formatted_statistics object
     * @param {string} name 
     * @param {string} state 
     * @param {*} coords 
     */
    function incrementStatistics(name, state, coords) {
        if (formatted_statistics.byState[state] !== undefined) {
            formatted_statistics.byState[state]++;
        } else {
            formatted_statistics.byState[state] = 1;
        }

        // add data about college
        if (formatted_statistics.byCollege[name] !== undefined) {
            formatted_statistics.byCollege[name].value++;
        } else {
            formatted_statistics.byCollege[name] = {
                state: state,
                coords: coords,
                value: 1
            };
        }
    }


    urls.forEach(async url => {
        if (typeof url == "object") {
            // console.log("URL is of type array");
            // when the url has a subdomain, we check each to see if one fits
            let failed_num = 0;
            url.every(async subUrl => {
                const college_search = colleges[subUrl];

                if (!college_search) {
                    failed_num++;
                    return true;
                }
                else {
                    const { name, state, coords } = college_search;
                    // add data about state
                    incrementStatistics(name, state, coords);
                    return false;
                }
            })
            if (failed_num == url.length) {
                failed_arr.push(url[0])
            }
        } else {
            // console.log("URL is normal string")
            // primary loop, when there is just one url to check
            const college_search = colleges[url];

            if (!college_search) {
                failed_arr.push(url);
            }

            else {
                const { name, state, coords } = college_search;
                // add data about state
                incrementStatistics(name, state, coords);
            }
        }}
    )

    // write files
    fs.writeFile(`./client/src/${process.env.GITHUB_ACTIONS ? "data.json" : "dev_data.json"}`, JSON.stringify(formatted_statistics), (err)=>{if (err) throw err});
    fs.writeFile(`./client/src/${process.env.GITHUB_ACTIONS ? "dates.json" : "dev_dates.json"}`, JSON.stringify(dates), (err)=>{if (err) throw err});
    fs.writeFile(`./client/src/${process.env.GITHUB_ACTIONS ? "updated.json" : "dev_updated.json"}`, JSON.stringify({ value: new Date().getTime()}), (err) => {if (err) throw err});

    // log info
    console.log("BY COLLEGE");
    console.table(formatted_statistics.byCollege);
    console.log("BY STATE");
    console.table(formatted_statistics.byState);
    console.log("BY DAY");
    console.table(dates);

    console.log([...new Set(failed_arr)])
    console.log(`${Math.round((failed_arr.length/urls.length)*10000) / 100} % loss, due to missing emails. ${[...new Set(failed_arr)].length} unique emails not found.`)
}

module.exports = parseEmails;