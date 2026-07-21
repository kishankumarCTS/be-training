function greeting(name) {
  // Using __dir due to cjs
  const directory = __dirname;
  // //   Using import.meta.url due to ES6
  // const directory = import.meta.url;
  return `Hello  ${name} from directory ${directory}`;
}

// Exporting module in common js
module.exports = {
  greeting,
};

// // Exporting function in ES6 module
// export default greeting;
