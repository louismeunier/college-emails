const { google } = require('googleapis');

/**
 * Parses URL from email address
 * @param {string} email 
 */
function parseURL(email) {
    const domain = email.slice(
        email.lastIndexOf("@")+1, 
        email.includes(">") 
            ? email.lastIndexOf(">")
            : email.length
    )
        .split(".")
        .slice(-2)
        .join(".");
    return domain
}

/**
 * Gets all emails
 * @param {google.auth.OAuth2} auth 
 * @returns {Promise<string[]>}
 */
async function getAllEmails(auth) {
    let urls = [];
    /**
     * Get email content
     * @param {gmail_v1.Params$Resource$Users$Messages$Get.id} id The ID of the message
     * @param {google.auth.OAuth2} auth an authorized OAuth2 client
     */
    async function getMessageContent(id, auth) {
        const gmail = google.gmail({version: "v1", auth});
        gmail.users.messages.get(
            {
                userId: "me",
                id: id
            }
        )
            .then(res => {
                const filterForSender = res.data.payload.headers.filter(e=>e.name=="From");
                const email = filterForSender[0].value;
                const url = parseURL(email);
                urls.push(url);
            })
            .catch(err => {
                console.log(err);
            })
    }

    /**
     * Sleep asynchronously for some time
     * @param {number} ms 
     * @returns 
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Gets college email ids
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client
     * @param {*} npt of the next page of gmail requests
     */
    async function getCollegeMessageIDs(auth, npt) {
        const gmail = google.gmail({version: 'v1', auth});

        let params = {
            userId: "me",
            maxResults: 500,
            q: "from:(.edu) college OR university newer_than:1y",
            includeSpamTrash: true,
        };

        // get next page of results if a token was passed
        if (npt) params["pageToken"] = npt;

        const res = await gmail.users.messages.list(params).catch(err => console.log(err));

        const { messages, nextPageToken, resultSizeEstimate } = res.data;

        for (const m in messages) {
            await sleep(50);
            getMessageContent(messages[m].id, auth);
        }
        
        console.log(`${messages.length} parsed`);
        if (nextPageToken) {
            return getCollegeMessageIDs(auth, nextPageToken);
        } else {
            console.log("all results parsed")
            return urls;
        }
    }

   return await getCollegeMessageIDs(auth);
}

module.exports = getAllEmails;