import axios from 'axios';
import { getToken } from './token';

export default api = async () => {
    return axios.create({
        baseURL: 'localhost:5000',
        headers: {
            authorization: await getToken()
        }
    })
}
