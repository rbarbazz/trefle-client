/* eslint-disable */
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const q = event.queryStringParameters.q;
    let response = await fetch(
      `https://trefle.io/api/plants?token=${process.env.TREFLE_TOKEN}&q=${q}`,
      { headers: { Accept: 'application/json' } },
    );

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const plants = await response.json();
    response = await fetch(
      `${plants[0].link}?token=${process.env.TREFLE_TOKEN}`,
      { headers: { Accept: 'application/json' } },
    );

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
