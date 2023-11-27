import axios from 'axios';

const API_KEY = '39765109-40001bca1fc18e8827b3c5878';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchRandomImages = async () => {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&per_page=10&image_type=photo&orientation=horizontal`;
    const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchImages = async (query) => {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo`;
    const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
