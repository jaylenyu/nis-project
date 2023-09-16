import axios from "axios";
const API = "https://naras-api.vercel.app";

export async function fetchCountries() {
  try {
    const res = await axios.get(`${API}/all`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchSearchResult(q: string) {
  try {
    const res = await axios.get(`${API}/search?q=${q}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchCountry(code: string) {
  try {
    const res = await axios.get(`${API}/code/${code}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
