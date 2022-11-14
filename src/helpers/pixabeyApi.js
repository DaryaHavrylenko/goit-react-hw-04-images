import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/'
const KEY = '30087665-92eb3edde2a629aded169ee28'

export const fetchImages = async (query, page) => {
    const {data} = await axios.get(`?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return data;
 
}
