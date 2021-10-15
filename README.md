# college-emails

Colleges love to send email advertisements, so much so that it becomes inbox clutter. This project serves to analyze this spam, and look at some interesting trends in the emails I've received in the past year regarding college.

## [`/clients`](/clients): a Svelte frontend of statistics hosted on Netlify.

## [`/scripts`](/scripts): a number of Node JS scripts to parse emails and get college data. These are designed to be used through [Github Actions](/.github/workflows/main.yml), but can also be run locally.

### [`/scripts/index.js`](/scripts/index.js)
Run all scripts, including downloading emails and generating statistics

### [`/scripts/utils`](/scripts/utils)
A set of utilities used to download and parse the data found in [`data`](/scripts/data).


## Data Credits

The dataset used containing college websites, names, locations, etc. was found [here](https://data.ed.gov/dataset/college-scorecard-all-data-files-through-6-2020/resources).

## * Note

Because of the way emails are linked to their respective college (via the domain name of the sender), there are some emails that are unable to be linked to a college and are thus not included in the final statistics. This, however, only accounts for ~3% of all the emails parsed per run.