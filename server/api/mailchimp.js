import { defineEventHandler, readBody } from 'h3';
import axios from 'axios';

export default defineEventHandler(async (event) => {
  // Load environment variables
  const apiKey = process.env.MAILCHIMP_API_KEY;
  // const apiKey = '3a617f4f2d939456217f6d585c4c95ef-us7';
  const dataCenter = apiKey?.split('-')[1]; // Extract the data center from the API key
  // const dataCenter = 'us7'; // Extract the data center from the API key
  const listId = process.env.MAILCHIMP_LIST_ID; // The audience ID for your Mailchimp list
  // const listId = '9e50a747e2'; // The audience ID for your Mailchimp list

  if (!apiKey || !dataCenter || !listId) {
    throw new Error('(Eget fel) Mailchimp API key, data center, or list ID is missing.');
  }

  const baseUrl = `https://${dataCenter}.api.mailchimp.com/3.0`;

  try {
    // Determine action based on the request
    const body = await readBody(event);

    if (body?.action === 'ping') {
      // Perform the ping request
      const pingResponse = await axios.get(`${baseUrl}/ping`, {
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        },
      });

      return {
        success: true,
        action: 'ping',
        data: pingResponse.data,
      };
    } else if (body?.action === 'addContact') {
      // Validate input for adding a contact
      const { email } = body;

      if (!email) {
        return {
          success: false,
          error: 'Email is required to add a contact.',
        };
      }

      // Add the contact to the list
      const addContactResponse = await axios.post(
        `${baseUrl}/lists/${listId}/members`,
        {
          email_address: email,
          status: 'subscribed', // Change to 'pending' for double opt-in
          // merge_fields: {
          //   FNAME: firstName || '',
          //   LNAME: lastName || '',
          // },
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
          },
        }
      );

      return {
        success: true,
        action: 'addContact',
        data: addContactResponse.data,
      };
    } else {
      return {
        success: false,
        error: 'Invalid action specified.',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
});
