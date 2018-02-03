import Api from './api';

const getEntries = params => Api.get('toshl', params);

export default {
    getEntries
};