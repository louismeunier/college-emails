# college-emails

[![.github/workflows/main.yml](https://github.com/louismeunier/college-emails/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/louismeunier/college-emails/actions/workflows/main.yml) [![Netlify Status](https://api.netlify.com/api/v1/badges/dd371a6d-634c-45fb-aafa-5504f9f01da5/deploy-status)](https://app.netlify.com/sites/college-emails/deploys)

Colleges love to send email advertisements, so much so that it becomes inbox clutter. This project serves to analyze this spam, and look at some interesting trends in the emails I've received in the past year regarding college.

## [`/clients`](/clients) 

A Svelte frontend of statistics hosted on Netlify.

## [`/scripts`](/scripts)
A number of Node JS scripts to parse emails and get college data. These are designed to be used through [Github Actions](/.github/workflows/main.yml), but can also be run locally.

### [`/scripts/index.js`](/scripts/index.js)
Run all scripts, including downloading emails and generating statistics

### [`/scripts/utils`](/scripts/utils)
A set of utilities used to download and parse the data found in [`data`](/scripts/data).


## Data Credits

The dataset used containing college websites, names, locations, etc. was found [here](https://data.ed.gov/dataset/college-scorecard-all-data-files-through-6-2020/resources).

## * Note

Because of the way emails are linked to their respective college (via the domain name of the sender), there are some emails that are unable to be linked to a college and are thus not included in the final statistics. This, however, only accounts for ~2% of all the emails parsed per run.