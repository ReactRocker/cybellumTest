import axios from 'axios';

export async function login(bodyFormData: FormData) {
  try {
    const res = await axios.post(
      'https://poc.cybellum.com/api/login',
      bodyFormData
    );
    
    return res.data.data;
  } catch (err: any) {
    return err.message;
  }
}
