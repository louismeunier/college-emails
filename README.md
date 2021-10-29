# college-emails

[![.github/workflows/main.yml](https://github.com/louismeunier/college-emails/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/louismeunier/college-emails/actions/workflows/main.yml)  [![Netlify Status](https://api.netlify.com/api/v1/badges/dd371a6d-634c-45fb-aafa-5504f9f01da5/deploy-status)](https://app.netlify.com/sites/college-emails/deploys)  [![wakatime](https://wakatime.com/badge/user/c57db544-da7e-4c2e-b0b7-ff7d3d0a1c37/project/4535d80e-a1e1-45cf-b8cf-993cfde2dc45.svg)](https://wakatime.com/badge/user/c57db544-da7e-4c2e-b0b7-ff7d3d0a1c37/project/4535d80e-a1e1-45cf-b8cf-993cfde2dc45)

Colleges love to send email advertisements, so much so that it becomes inbox clutter. This project serves to analyze this spam, and look at some interesting trends in the emails I've received in the past year regarding college.

## [`/clients`](/clients) 

A Svelte frontend of statistics hosted on Netlify.

## [`/scripts`](/scripts)
A number of Node JS scripts to parse emails and get college data. These are designed to be used through [Github Actions](/.github/workflows/main.yml), but can also be run locally.

### [`/scripts/index.js`](/scripts/index.js)
Run all scripts, including downloading emails and generating statistics.

### [`/scripts/utils`](/scripts/utils)
A set of utilities used to download and parse the data found in [`data`](/scripts/data).

## Run Locally

To create the same type of visualization locally for your own emails, follow these steps.

### Setup
- Clone this repository (`git clone https://github.com/louismeunier/college-emails.git`)
- Delete `client/src/data.json`, `client/src/dates.json`, and `client/src/updated.json`.
- While in the directory containing the repo, run `cd client && yarn && cd ../scripts && yarn` to install dependencies.

### Authentication
- To access your emails, you'll need to authenticate with the GMail API.
- Follow [these steps](https://developers.google.com/workspace/guides/create-project) to create the project.
- Enable the GMail API with the scope 'https://www.googleapis.com/auth/gmail.readonly'
- *IMPORTANT*: Make sure you add your email address as a tester for your application. Otherwise, as your project is unverified, it will not work.
- Download your credentials as JSON, as save it to `scripts/credentials.json`
- Run `node scripts`, and if your setup was done well, it should prompt you to visit a URL and authenticate. This should save a file `scripts/token.json`.

### Generating the data
- Run `node scripts` a second time. It should now actually run the program, and regularly print output to the screen indicating progress. 
- *Note*: it can take quite a while for the scripts to run, around 1.5 minutes per 1000 emails.
- When completed, the scripts should print some tables of output, as well as some statistics of how well the run went.
- It should also have created 3 new files, `client/src/dev_data.json`, `client/src/dev_data.json`, and `client/src/dev_updated.json`. Delete `dev_` from each of these.

### Creating the visuals
- Run `cd client && yarn dev`.

## Data Credits

The dataset used containing college websites, names, locations, etc. was found [here](https://data.ed.gov/dataset/college-scorecard-all-data-files-through-6-2020/resources).

## *Note*

Because of the way emails are linked to their respective college (via the domain name of the sender), there are some emails that are unable to be linked to a college and are thus not included in the final statistics. This, however, only accounts for ~2% of all the emails parsed per run.