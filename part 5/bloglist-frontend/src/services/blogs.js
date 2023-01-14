import axios from 'axios'
const baseUrl = '/api/blog'

const getAll = () => {
  const request = axios.get("http://localhost:3003/api/blogs" )
  console.log(request.data)
  return request.then(response => response.data)

}

export default { getAll }