import client from './Axios'

export default (resource) => {
  return {
    get: (id) => client.get(`/${resource}/${id}`),
    getAll: () => client.get(`/${resource}`),
    save: (content) => client.post(`/${resource}`, content),
    update: (id, content) => client.put(`/${resource}/${id}`, content),
    remove: (id) => client.delete(`/${resource}/${id}`)
  }
}
