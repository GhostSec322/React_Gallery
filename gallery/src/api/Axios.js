import axios from 'axios';


export const api = axios.create({
    baseURL :  `https://pixabay.com/api/`,
	//쿼리로 넘길 키들을 prams 객체에 키밸류로 순서대로 넣어준다.
	params : {
		key : '39765109-40001bca1fc18e8827b3c5878',
		per_page: 10,
        image_type: 'photo',
        orientation: 'horizontal',
	}
  });

  export default api;