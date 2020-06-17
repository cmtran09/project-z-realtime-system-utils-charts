# project-z-realtime-system-utils-charts

## Overview
I enjoyed using socket.io in a previous project which inspired me to recreate a system monitor that I always have running on my computer. Using socket.io and recharts this project sends data from an express server to the client where it is visualised in real-time.

It wasn't possible to deploy this online due to the nature of the packages, it needs to be run locally. To do this follow following instructions:

First download this repository by running this in the terminal:

```
git clone https://github.com/cmtran09/project-z-realtime-system-utils-charts.git
```

Next run:
```
yarn
```
Then 

```
yarn serve:back
```
Finally navigate to http://localhost:5000/

See below for a quick demo of the application.
![Demo](https://imgur.com/AXBZ9P3.gif)

## Technologies Used
* HTML
* SCSS
* Semantic ui React
* JavaScript ES6
* React.js
* Node.js
* Express.js