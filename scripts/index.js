const authorizedFunction = require("./auth");
const getAllEmails = require("./get_emails");
const parseEmails = require("./parse_emails");
const fs = require("fs");

require('dotenv').config();

authorizedFunction()
    .then(auth => getAllEmails(auth)
        .then(urls => {
            fs.writeFile("./client/src/dates.json", JSON.stringify(urls.dates), (err)=>{if (err) throw err; else {console.log("Successfully wrote file")}});
            parseEmails(urls.urls);
        })
    )
    .catch(err => console.log(err))