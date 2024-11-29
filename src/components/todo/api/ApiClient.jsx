import axios from "axios";

export const apiClient = axios.create(
    {
        // baseURL: 'http://localhost:8080'
        // baseURL: 'http://localhost:5000'
        //deployed AWS backend URL
        baseURL: 'http://todoappbackend-env.eba-7thtpjv3.ap-south-1.elasticbeanstalk.com/'
    }
)