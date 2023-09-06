import axios from "axios";

export async function fetchCountries() {
  try {
    const res = await axios.get("https://naras-api.vercel.app/all");
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchSearchResult(q: string) {
  try {
    const res = await axios.get(`https://naras-api.vercel.app/search?q=${q}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchCountry(code: string) {
  try {
    const res = await axios.get(`https://naras-api.vercel.app/code/${code}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
