import axios from "axios";


const productionBackend = "https://gcci-backend.vercel.app/"
const devBackend = "http://localhost:5000/"

const apiClient = axios.create({
  baseURL: devBackend

});

export default apiClient;
