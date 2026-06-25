import axios from 'axios';

const API_KEY = '55520229-6b38dd18315a985816c1e4a23';

const serverApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };
  const responce = await serverApi.get('', { params });
  return responce.data;
}
