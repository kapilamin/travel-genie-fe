import axios from "axios";
import amadeusClient from "./amadeusClient";

const getExcursions = async (latitude, longitude, radius = 1) => {
  try {
    const response = await amadeusClient.get("/v1/shopping/activities", {
      params: {
        latitude,
        longitude,
        radius,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching hotels:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getFlights = async (
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults = 1,
  max = 10
) => {
  try {
    const response = await amadeusClient.get("/v2/shopping/flight-offers", {
      params: {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults,
        max,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching hotels:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getHotelsByCity = async (cityCode) => {
  try {
    const response = await amadeusClient.get(
      "/v1/reference-data/locations/hotels/by-city",
      {
        params: {
          cityCode,
          radius: 5,
          radiusUnit: "KM",
        },
      }
    );

    return response.data.data; // List of hotels with their IDs
  } catch (error) {
    console.error(
      "Error fetching hotels:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getHotelOffers = async (hotelIds, checkInDate, checkOutDate) => {
  try {
    const response = await amadeusClient.get("/v3/shopping/hotel-offers", {
      params: {
        hotelIds: hotelIds.join(","),
        checkInDate,
        checkOutDate,
      },
    });

    return response.data.data; // Detailed hotel offers
  } catch (error) {
    console.log(error.response.data.errors);
    throw error;
  }
};

const getHotelsAndDeals = async (cityCode, checkInDate, checkOutDate) => {
  try {
    // Step 1: Get hotels in the specified city
    const hotels = await getHotelsByCity(cityCode);
    const hotelIds = hotels.map((hotel) => hotel.hotelId);

    // Step 2: Get offers for these hotels

    const hotelDeals = await getHotelOffers(
      hotelIds,
      checkInDate,
      checkOutDate
    );

    return hotelDeals;
  } catch (error) {
    throw error;
  }
};

const postBooking = async (newBooking) => {
  try {
    const response = await axios.post(
      "https://travelgenie-be.onrender.com/api/bookings",
      newBooking,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const fetchBookings = async () => {
  const response = await axios.get(
    "https://travelgenie-be.onrender.com/api/bookings"
  );

  return response.data;
};

const postUser = async (newUser) => {
  try {
    const response = await axios.post(
      "https://travelgenie-be.onrender.com/api/users",
      newUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
    throw err;
  }
};

export {
  getExcursions,
  getFlights,
  getHotelOffers,
  getHotelsByCity,
  getHotelsAndDeals,
  postBooking,
  fetchBookings,
  postUser,
};
