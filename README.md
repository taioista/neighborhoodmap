# Udacity My Neighborhood Map

This is the final project for the Udacity Front End Nanodegree program. The goal of the project was to implement the Google maps api with React to display a list of locations in a certain area and use a third party api to display details about each location.


## Development Tools

  - React by [Create React App](https://github.com/facebookincubator/create-react-app)
  - Google Maps was implement using [google-maps-react](https://www.npmjs.com/package/google-maps-react)
  - The third party library was Yelp [Yelp Fusion Api](https://www.yelp.com/developers/documentation/v3)
  - The menu was built using react-burger-menu [react-burger-menu](https://github.com/negomi/react-burger-menu)

## Development

To run this app follow these instructions:

  - Unzip the files and cd into the project folder
  - Run `npm install`
  - Once done run `npm start`

## Deployment

To get production build and service worker works follow these instructions:

- Configure your [Github Pages](https://pages.github.com/)
- `npm run build`: builds the app for production to the build folder
- `npm run deploy`: deploys the app to GitHub Pages
- Configure `package.json` informing your `homepage`
- Run `npm run deploy`

## Usage

In this project you may choose one point of interest in Tijuca neighborhood (Rio de Janeiro, Brazil) through two options:

  - Filter the point by the text filter on the side menu
  - Click on the point you want do directly in the map

Then a box with information about the point will be shown powered by Yelp Fusion Api data    
