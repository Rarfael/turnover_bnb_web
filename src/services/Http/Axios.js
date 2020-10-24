import axios from 'axios'
const basurl = 'http://127.0.0.1:8000/api'

const client = axios.create({
  baseURL: basurl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default client
