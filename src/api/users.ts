import axios from '../axios';

export async function getMe(): Promise<any>{
  try {
    const response = await axios.get<any>("/auth/me");

    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}