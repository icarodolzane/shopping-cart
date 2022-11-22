export const getAddress = async (cep) => {
  const endpoint1 = `https://cep.awesomeapi.com.br/json/${cep}`;
  const endpoint2 = `https://brasilapi.com.br/api/cep/v2/${cep}`;
  const firstRequest = await fetch(endpoint1);
  const secondRequest = await fetch(endpoint2);
  const response = await Promise.any([firstRequest, secondRequest]);
  const data = await response.json();
  return data;
};

export const searchCep = async () => {
  const inputCep = document.querySelector('.cep-input');
  const spanAddress = document.querySelector('.cart__address');
  try {
    const address = await getAddress(inputCep.value);
    const street = address.street || address.address;
    const neighborhood = address.district || address.neighborhood;
    const { city } = address;
    const { state } = address;
    spanAddress.innerHTML = `${street} - ${neighborhood} - ${city} - ${state}`;
  } catch (error) {
    spanAddress.innerHTML = 'CEP não encontrado';
  }
};
