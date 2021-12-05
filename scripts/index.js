const authorizedFunction = require("./auth");
const getAllEmails = require("./get_emails");
const parseEmails = require("./parse_emails");
const core = require("@actions/core")

require('dotenv').config();

authorizedFunction()
    .then(auth => getAllEmails(auth)
        .then(urls => {
            parseEmails(urls.urls, urls.dates);
        })
        .catch(err => core.setFailed(err))
    )
    .catch(err => core.setFailed(err))