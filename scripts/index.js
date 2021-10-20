const authorizedFunction = require("./auth");
const getAllEmails = require("./get_emails");
const parseEmails = require("./parse_emails");
const fs = require("fs");

require('dotenv').config();

authorizedFunction()
    .then(auth => getAllEmails(auth)
        .then(urls => {
            parseEmails(urls.urls, urls.dates);
        })
    )
    .catch(err => console.log(err))