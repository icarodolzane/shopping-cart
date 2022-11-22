import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    const correctEndpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenLastCalledWith(correctEndpoint);
  });

  it('Testa se o retorno da função fetchProductsList com o argumento `computador` é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const expectedValue = await fetchProductsList('computador');
    expect(expectedValue).toEqual(computadorSearch);
  });

  it('Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: `Termo de busca não informado', async () => {
    await expect(fetchProductsList()).rejects.toThrow(/^Termo de busca não informado/)
  });

});
  