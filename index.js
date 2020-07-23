const weather = require('weather-js');
const readlineSync = require('readline-sync');

console.log("Hello! ｡◕‿◕｡\nWhat a lovely day! Let's check weather!\n");
const city = readlineSync.question("Please type in your city\n");
const country = readlineSync.question("\nPlease type in your country\n");
const request = `${city}, ${country}`;

weather.find({search: request, degreeType: 'C'}, function(err, result) {
  if(err) console.log('\nSorry, but you have not typed in your city name.');
 
  console.log(`\nThere is ${result[0].current.temperature}°C in ${city}.\nFeels like ${result[0].current.feelslike}°C, ${result[0].current.skytext.toLowerCase()}.\nTomorrow will be ${result[0].forecast[0].low} - ${result[0].forecast[0].high}.\nHave a nice day!`);
});