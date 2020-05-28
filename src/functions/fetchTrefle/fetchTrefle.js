// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch');

exports.handler = async function(event) {
  try {
    const q = event.queryStringParameters.q;
    const response = await fetch(
      `https://trefle.io/api/species?token=${process.env.TREFLE_TOKEN}&q=${q}&page_size=10`,
      { headers: { Accept: 'application/json' } },
    );

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const plants = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(plants),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
