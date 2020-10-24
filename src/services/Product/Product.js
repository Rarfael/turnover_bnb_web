import http from '../Http'

const entity = 'products'

export const getProduct = (id) => http(entity).get(id).then(extractBody)

export const createProduct = ({
  name,
  description,
  price,
  currency
}) => {
  const body = {
    name,
    description,
    price,
    currency
  }
  return http(entity).save([body]).then(extractBody)
}

export const updateProduct = ({
  id,
  name,
  description,
  price,
  currency
}) => http(entity).update(id, {
  name,
  description,
  price,
  currency
}).then(() => ({
  id,
  name,
  description,
  price,
  currency
}))

export const getProducts = () => http(entity).getAll().then(extractBody)

export const deleteProduct = (productId) => http(entity).delete(productId)

const extractBody = (response) => {
  const { data } = response
  return data
}
