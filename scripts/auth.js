const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

/**
 * Returns one of passed arguments based on run environment
 * @returns {boolean}
 */
function isProduction() {
  return process.env.GITHUB_ACTIONS;
}

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'scripts/token.json';

/**
 * Authenticates with Google and passed auth object to callback
 * @param {function} callback 
 */
function authorizedFunction() {
  return new Promise((res, rej) => {
    isProduction() 
      ? res(authorize(JSON.parse(process.env.CREDENTIALS)))
      : fs.readFile ('./scripts/credentials.json', (err, content) => {
        if (err) rej(err);
          res(authorize(JSON.parse(content)));
        });    
  })   
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  return new Promise((res, rej) => {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
      if (isProduction()) {
        oAuth2Client.setCredentials(JSON.parse(process.env.ACCESS_TOKEN));
        res(oAuth2Client)
      } else {
        fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return getNewToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token));
          res(oAuth2Client);
        });   
      }
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client) {
  return new Promise((res, rej) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) rej(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        res(oAuth2Client);
      });
    });
  })  
}

module.exports = authorizedFunction;