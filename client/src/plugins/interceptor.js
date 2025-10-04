import axios from 'axios';

let baseURL = 'https://imdb236.p.rapidapi.com/api/';
let backendURL = import.meta.env.VITE_BACKEND_URL;

// add x-rapidapi-host and x-rapidapi-key headers
const headers = {
    'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY
};

const httpClient = axios.create({ baseURL, headers });
const backendClient = axios.create({ baseURL: backendURL });

// print request headers
httpClient.interceptors.request.use(request => {
    return request;
});

const setupInterceptors = (logoutCallback) => {
    // Response interceptor for the backend client
    backendClient.interceptors.response.use(
        // Success case: just return the response.
        response => {
            return response;
        },
        // Error case: check the status code for 401.
        error => {
            if (error.response && error.response.status === 401) {
                // Call the logout function passed in from the store
                logoutCallback();
            }
            return Promise.reject(error);
        }
    );
};

export {
    httpClient,
    backendClient,
    setupInterceptors
}