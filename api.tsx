import axios from "axios";

export async function fetchCountries() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/all`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchSearchResult(q: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_KEY}/search?q=${q}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchCountry(code: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_KEY}/code/${code}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
