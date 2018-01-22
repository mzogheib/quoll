import axios from 'axios';

const getToshlLocations = () => axios.get('/api/toshl');

export default {
    getToshlLocations
};