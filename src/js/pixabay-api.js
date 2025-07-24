import axios from 'axios';

export default async function getImagesByQuery(query, page) {
  const API_KEY = '44822574-4b43621c9303530917b2f490d';
  const params = new URLSearchParams({
    per_page: 15,
    page: page,
  });
  const response = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&${params}`
  );
  return response.data;
}
