import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const response = await axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '57593792-7eb08ac6b23e15d152ead06e9',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
  return response.data;
}
