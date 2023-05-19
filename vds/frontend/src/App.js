import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import  React, {useState ,useEffect} from 'react';
import VdsServices from './components/API/VdsService';
import Main from './pages/main';
import Navbar from './components/UI/Navbar';
import ProductLists from './pages/productlist';
import ProductDetail from './components/ProductDetail'
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import PersonalAreaPage from './pages/personalcab';
import CartPage from './pages/cart';
import Message from './components/Message';

function App() {
  const [category, setCategory] = useState([]);
  const [chooseCategory, setChooseCategory] = useState();
  const [chooseSubCategory, setChooseSubCategory] = useState();
  const [product_id, setProductId] = useState();
  const [ordercart, setOrdercart] = useState({ items: [] });
  const [message, setMessage] = useState();
  useEffect(() => {
    getCategorys();
  }, [])

  async function checkout(id) {
      const res = await VdsServices.check_product_cart(id)
      setMessage(res)
  };


  async function getCategorys() {
    const cat = await VdsServices.get_category();
    setCategory(cat);
  };

  function ChooseCategory(category_id) {
    setChooseCategory(category_id)
  };

  function chooseSubCategoryf(subCategory_id) {
    setChooseSubCategory(subCategory_id)
  }

  function get_product_det(product_id) {
    setProductId(product_id);
  }

  function deleteOrder(id) {
    setOrdercart({items:ordercart.items.filter(el => el.id !== id)})
  }

  function ordercartitems(items) {
    let isInArray = false;
    ordercart.items.forEach(item => {
      if (item.id === items.id)
        isInArray=true
    })
    if (!isInArray) {
    setOrdercart({ items: [...ordercart.items, items] });      
    }

  }

 useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar cat = {category} chooseCategory = {ChooseCategory} chooseSubCategory = {chooseSubCategoryf}/>
      <Routes>  
        <Route path='/' element={<Main get_product_det={get_product_det}/>} />
        <Route path='*' element={<Navigate to='/' />} />  
        <Route path='/product/' element={<ProductLists cat_id={chooseCategory} sub_id={chooseSubCategory} get_product_det={get_product_det}/>} />
        <Route path='/product/detail' element={<ProductDetail product_id={product_id} addItems={ordercartitems } />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/personalarea' element={<PersonalAreaPage />} />
        <Route path='/cart' element={<CartPage order={ordercart} deleteOrder={deleteOrder} checkout={checkout} />} />
        <Route path='/payment' element={<Message massage={message} />} />
      </Routes> 
      </BrowserRouter>
  );
}

export default App;
