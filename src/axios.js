import axios from "axios";

const instance = axios.create({
  baseUrl: "https://app-litsoc.herokuapp.com",
});

export default instance;
