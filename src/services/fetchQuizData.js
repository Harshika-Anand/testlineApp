import mockQuizData from "./mockQuizData";

export const fetchQuizData = async () => {
  try {
    const response = await fetch("https://api.jsonserve.com/Uw5CrX");

    if (!response.ok) {
      throw new Error("API request failed, using mock data.");
    }

    return await response.json();
  } catch (error) {
    console.warn("Using mock data due to API failure.");
    return mockQuizData;
  }
};
