# college-emails

Colleges love to send email advertisements, so much so that it becomes inbox clutter. This project serves to analyze this spam, and look at some interesting trends in the emails I've received in the past year regarding college.

## [`/scripts`](/scripts): a number of Node JS scripts to parse emails and get college data.

### [`/scripts/index.js`](/scripts/index.js)
Run all scripts, including downloading emails and generating statistics

### [`/scripts/utils`](/scripts/utils)
A set of utilities used to download and parse the data found in [`data`](/scripts/data).


## Data Credits

The dataset used containing college websites, names, locations, etc. was found [here](https://data.ed.gov/dataset/college-scorecard-all-data-files-through-6-2020/resources).