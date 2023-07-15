import axios from 'axios'

const api = axios.create({
  baseUrl: "https://catfact.ninja/fact",
});

export default api