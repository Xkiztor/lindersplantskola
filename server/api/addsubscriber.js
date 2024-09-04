import { defineEventHandler } from 'h3'; // h3 is a framework used internally by Nuxt 3 for server handling.
import mailchimp from '@mailchimp/mailchimp_marketing';

export default defineEventHandler(async (event) => {
  // const mailchimp = require('./mailchimp/mailchimp_marketing');

  mailchimp.setConfig({
    apiKey: '38a433504c88970becb68febabb1f403-us7',
    server: 'us7',
  });

  async function run() {
    const response = await mailchimp.ping.get();
    console.log(response);
    return response;
  }

  return run();
});
