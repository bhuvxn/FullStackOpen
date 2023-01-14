import axios from 'axios'
const baseUrl = '/api/blog'

const getAll = () => {
  const request = axios.get("http://localhost:3003/api/blogs")

  return request.then(response => response.data)

}

export default { getAll }