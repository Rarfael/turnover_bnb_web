import axios from 'axios'
const basurl = 'https://api.godoy.dev/api'

const client = axios.create({
  baseURL: basurl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default client
