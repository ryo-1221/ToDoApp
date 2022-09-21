import axios from 'axios';

export const request = async (conf) => {
  try {
    console.log('process.env.NODE_ENV:' + process.env.NODE_ENV);
    const { method, path, data, token } = { ...conf };

    const baseUrl = process.env.REACT_APP_API_URL;

    const url = baseUrl + path;

    if (method === 'get') {
      //  GETメソッド
      const res = await axios(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: token.jwt,
          username: token.username,
        },
      });
      console.log(`HTTP GET:${url}`);
      console.log('response', res.data);
      return res.data;
    } else if (method === 'put') {
      // PUTメソッド
      console.log(`HTTP PUT:${url}`);
      const res = await axios.put(url, data, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: token.jwt,
          username: token.username,
        },
      });
      console.log('response', res.data);
      return res.data;
    } else if (method === 'post') {
      // POSTメソッド
      console.log(`HTTP POST:${url}`);
      const res = await axios.post(url, data, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: token.jwt,
          username: token.username,
        },
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
          Authorization: token.jwt,
          username: token.username,
        },
      });
      console.log('response', res.data);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
