import axios from 'axios'
const basurl = 'http://161.35.110.11/api'

const client = axios.create({
  baseURL: basurl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default client
