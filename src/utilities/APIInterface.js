import axios from "axios";

const api_url = "https://swapi.dev/api";

export const getAxios = (actionName) => {
    return axios.get(api_url + "" + actionName);
}