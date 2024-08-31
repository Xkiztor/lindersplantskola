import { defineEventHandler } from 'h3'; // h3 is a framework used internally by Nuxt 3 for server handling.

export default defineEventHandler(async (event) => {
  // const { myFunction } = require('./my-node-module'); // Node.js require here
  // const result = await myFunction(); // Call the Node.js function
  let result = 'Hello man';
  return result; // Return the result
});
