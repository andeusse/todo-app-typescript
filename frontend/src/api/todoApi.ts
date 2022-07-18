import axios from 'axios';
import Config from '../config/Config';

export const todoApi = axios.create({
	baseURL: Config.getInstance().params.ApiUrl,
});
