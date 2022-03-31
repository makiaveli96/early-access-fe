import axios from 'axios';

interface RequestI {
  body?: any;
  token?: string | null;
  headers?: any;
}

/**
 *
 * @param endpoint The subroute to call e.g /auth/login
 * @param params Custom parameters e.g request body
 * @param config
 * @returns
 */
const request = async (endpoint: string, params: RequestI, method: string, ...config: any) => {

  const API = 'http://localhost:3009/api'
  // const API = 'https://gradient-pocket-node.herokuapp.com/api'

  const { body, token, headers } = params;

  const res = await axios({
    method: method,
    url: `${API}${endpoint}`,
    data: body,
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...headers
    },
    ...config
  });
  return res.data
};

export default request;
