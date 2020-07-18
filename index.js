// 1 https://www.npmjs.com/package/ansi
const ansi = require("ansi");
const cursor = ansi(process.stdout);
cursor
  .red() // Set font color to red
  .bg.grey() // Set background color to grey
  .write("Hello World!") // Write 'Hello World!' to stdout
  .bg.reset() // Reset the bgcolor before writing the trailing \n,
  //      to avoid Terminal glitches
  .write("\n"); // And a final \n to wrap things up

// 2 https://libraries.io/npm/beepbeep
const beepbeep = require("beepbeep");
beepbeep(3, 1000);

// 3 https://www.npmjs.com/package/cli-color
const clicolor = require("cli-color");
console.log(clicolor.red("Text in red"));
console.log(clicolor.yellow("Text in yellow"));
console.log(clicolor.green("Text in green"));

// 4 https://libraries.io/npm/colors
const colors = require("colors");
console.log("hello".green);
console.log("i like cake and pies".underline.red);
console.log("inverse the color".inverse);
console.log("OMG Rainbows!".rainbow);
console.log("Run the trap".trap);
