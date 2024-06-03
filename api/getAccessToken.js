import axios from "axios";

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        grant_type: "client_credentials",
        client_id: "2bBn8J9tJ3JKs2iGOZuJfsK3eTRoGGSk",
        client_secret: "IjvenGapOgeHhVaY",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default getAccessToken;
