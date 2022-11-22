import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Testa se fetchProduct é uma função;', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('Testa se ao chamar a função fetchProduct com o argumento do produto `MLB1405519561` a função fetch é chamada.', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it(' Testa se fetch é chamado com o endpoint correto ao executar fetchProduct com o argumento `MLB1405519561`', async () => {
    const correctEndpoint = 'https://api.mercadolibre.com/items/MLB1405519561'
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenLastCalledWith(correctEndpoint);
  });
  it('Testa se o retorno da função fetchProduct com o argumento `MLB1405519561` é uma estrutura de dados igual ao objeto produto', async () => {
    const expectedValue = await fetchProduct('MLB1405519561');
    expect(expectedValue).toEqual(product);
  });
  it('Testa se, ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: `ID não informado', async () => {
    await expect(fetchProduct()).rejects.toThrow(/^ID não informado/)
  });

  
});
