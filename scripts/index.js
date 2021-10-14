const authorizedFunction = require("./auth");
const getAllEmails = require("./get_emails");
const parseEmails = require("./parse_emails");

require('dotenv').config();

authorizedFunction()
    .then(auth => getAllEmails(auth)
        .then(urls => parseEmails(urls))
    )
    .catch(err => console.log(err))