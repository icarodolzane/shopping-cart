function createFetch(url) {
  return fetch(url);
}

export const fetchProduct = async (idProduct) => {
  // seu código aqui
  const endpoint = 'https://api.mercadolibre.com/items/';
  const $ProductID = idProduct;
  if (!idProduct) {
    throw new Error('ID não informado');
  }
  const response = await createFetch(`${endpoint}${$ProductID}`);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (product) => {
  // seu código aqui
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=';
  if (!product) {
    throw new Error('Termo de busca não informado');
  }
  const $QUERY = product.toLowerCase();
  const response = await createFetch(`${endpoint}${$QUERY}`);
  const data = await response.json();
  return data.results;
};
