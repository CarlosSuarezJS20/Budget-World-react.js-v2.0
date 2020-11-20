import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://budget-world-reactjs.firebaseio.com/',
});

export default instance;
