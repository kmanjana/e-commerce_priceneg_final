import React from 'react'
import Navbar from "./components/Navbar";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from './pages/Home'
// import Form from './components/Form'
// import Login from './components/Login'
import Single_Shop_Prods from './components/Single_Shop_Prods'
import AddProduct from './components/AddProduct';
import Logout from './components/Logout';
import EditProduct from './components/EditProduct';
import ProductDetail from './components/ProductDetail';
import Prod_By_Catg from './components/Prod_By_Catg';
import Prod_By_Brand from './components/Prod_By_Brand';
import Logshop from './components/Logshop';
import Loguser from './components/Loguser';
import Regisuser from './components/Regisuser';
import Regisshop from './components/Regisshop';
import Chatbot from "./components/Chatbot";
import DisplayProduct from './components/DisplayProduct';
import Footer from './components/Footer';
// import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart2 from './components/Cart2';
import UserProfile from './components/UserProfile';
import ShopProfile from './components/ShopProfile';
import AllShops from './components/AllShops';
import Newloginshop from './components/Newloginshop';
import Forgotpassword from './components/Forgotpassword';
import Forgotpasswordshop from './components/Forgotpasswordshop';
import Newlogin from './components/Newlogin';
import BuyNow from './components/BuyNow';
import Bill from './components/Bill';

function App() {
  return (
    // <div>
    //   <Form />
    //   <Login />
    // </div>
    <div>
      
     <Router>
     <Navbar />
     {/* <Logout /> */}
     
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Regisshop />} />
        <Route exact path="/logshop" element={<Logshop />} />
        <Route exact path="/loguser" element={<Loguser />} />
        <Route exact path="/Regisuser" element={<Regisuser />} />
        <Route exact path="/single_shop_prods" element={<Single_Shop_Prods />} />
        <Route exact path="/addproduct" element={<AddProduct />} />
        <Route exact path="/editproduct" element={<EditProduct />} />
        <Route exact path="/productdetail" element={<ProductDetail />} />
        <Route exact path="/prodbycatg" element={<Prod_By_Catg />} />
        <Route exact path="/prodbybrand" element={<Prod_By_Brand />} />
        <Route exact path="/products" element={<DisplayProduct/>} />
        <Route path="/about" exact element={<About/>} />
        <Route path="/contact" exact element={<Contact/>} />
        <Route exact path="/cart2" element={<Cart2 />} />
        <Route exact path="/userprofile" element={<UserProfile/>} />
          <Route exact path="/shopprofile" element={<ShopProfile />} />
          <Route exact path="allshops" element = {<AllShops/>}/>
          <Route path="/newloginshop" exact element={<Newloginshop/>} />
        <Route path="/forgotpassword" exact element={<Forgotpassword/>} />
        <Route path="/forgotpasswordshop" exact element={<Forgotpasswordshop/>} />
        <Route path="/newlogin" exact element={<Newlogin/>} />
        <Route exact path="/buy" element={<BuyNow />} />
        <Route exact path="/bill" element={<Bill />} />
      </Routes>
      <Chatbot />
      <Footer />
    </Router>
    </div>
    
  );
}

export default App
