import http from '../Http'

const entity = 'products'

export const getProduct = (id) => http(entity).get(id).then(extractBody)

export const createProduct = ({
  name,
  description,
  price,
  currency
}) => http(entity).save({
  name,
  description,
  price,
  currency
})

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
})

export const getProducts = () => http(entity).getAll().then(extractBody)

export const deleteProduct = (productId) => http(entity).delete(productId)

const extractBody = (response) => {
  const { data } = response
  return data
}
