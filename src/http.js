import * as axios from "axios";

const instance = axios.create({
    //withCredentials: true,
    baseURL: '/',
});

export const exampleService = {
  
  async getTags() {
    return instance.get(`/api`)
    .then(response => {
        return response.data;
    });
  }
}

