import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5NjgzNjA5OCwiZXhwIjoxNjk2OTIyNDk4fQ.ku_k-iNJSjogjxgmahNUOssCzzYoKANPOEMbRvjIgNU'

const SSRRequest = axios.create({
  baseURL: 'http://192.168.1.6:8080/api/v1',
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Content-Type":"application/json",
    Authorization:`Bearer ${token}`
  },
});
export default SSRRequest ;
