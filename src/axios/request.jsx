import axios from 'axios';

export const request = async (conf) => {
  try {
    const { method, path, data } = { ...conf };

    const baseUrl = 'http://localhost:3001/';
    const url = baseUrl + path;

    if (method === 'get') {
      //  GETメソッド
      const res = await axios(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        data: data,
      });
      console.log(`HTTP GET:${url}`);
      console.log('response', res.data);
      return res.data;
    } else if (method === 'put') {
      // PUTメソッド
      console.log(`HTTP PUT:${url}`);
      const res = await axios.put(url, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        data: data,
      });
      console.log('response', res.data);
      return res.data;
    } else if (method === 'post') {
      // POSTメソッド
      console.log(`HTTP POST:${url}`);
      const res = await axios.post(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: data,
      });
      console.log('response', res.data);
      return res.data;
    } else if (method === 'delete') {
      // DELETEメソッド
      console.log(`HTTP DELETE:${url}`);
      const res = await axios.delete(url, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          data: data,
        },
      });
      console.log('response', res.data);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
