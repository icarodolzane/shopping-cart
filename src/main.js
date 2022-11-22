import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createCartProductElement,
  createCustomElement, createProductElement }
  from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const addElementInDom = (element, className, message) => {
  const loadingText = createCustomElement(element, className, message);
  const getParent = document.querySelector('.products');
  getParent.appendChild(loadingText);
};
const removeElementInDom = (element) => {
  element.remove();
};

const getListOfProducts = async (productName) => {
  try {
    addElementInDom('span', 'loading', 'carregando');
    const sectionParent = document.querySelector('.products');
    const data = await fetchProductsList(productName);
    const loadingText = document.querySelector('.loading');
    removeElementInDom(loadingText);
    data.forEach((element) => {
      const product = createProductElement(element);
      sectionParent.appendChild(product);
    });
  } catch (error) {
    const message = 'Algum erro ocorreu, recarregue a página e tente novamente';
    addElementInDom('span', 'error', message);
  }
};

const addInShopCart = async (event) => {
  const getParent = event.target.parentNode;
  const productId = getParent.firstChild.innerText;
  saveCartID(productId);
  const data = await fetchProduct(productId);
  const product = createCartProductElement(data);
  const listParent = document.querySelector('.cart__products');
  listParent.appendChild(product);
};

const recoverLocalStorage = () => {
  const productIdInLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));
  productIdInLocalStorage.forEach(async (element) => {
    const data = await fetchProduct(element);
    const product = createCartProductElement(data);
    const listParent = document.querySelector('.cart__products');
    listParent.appendChild(product);
  });
};
const sectionProducts = document.querySelector('.products');

const checkLocalStorage = () => {
  const productIdInLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));
  if (productIdInLocalStorage) {
    recoverLocalStorage();
  }
  sectionProducts.addEventListener('click', addInShopCart);
};

window.onload = () => {
  getListOfProducts('computador');
  checkLocalStorage();
};
