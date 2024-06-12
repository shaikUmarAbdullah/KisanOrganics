import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import ImageUpload from './Pages/ImageUpload';
import DiseaseDisplay from './Components/DiseaseDisplay/DiseaseDisplay';
import Allproducts from './Pages/Allproducts';
import Product from './Pages/Product';
import Aboutus from './Pages/Aboutus';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Category from './Pages/Category';
import Profile from './Components/Profile/Profile';
import CustomerCare from './Components/CustomerCare/CustomerCare';
import Breadcrumb from './Components/Breadcrumb/Breadcrumb';
import BlogCollectionPage from './Components/BlogCollectionPage/BlogCollectionPage';
import BlogPage from './Pages/BlogPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header/>
        <Navbar />
        <Breadcrumb/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/cropcare' element={<ImageUpload />} />
          <Route path='/disease' element={<DiseaseDisplay/>} />
          <Route path='/all' element={<Allproducts />} />
          <Route path='/traps' element={<Category cat="traps" />} />
          <Route path='/neemoil' element={<Category cat="neemoil"/>} />
          <Route path='/mixingoil' element={<Category cat="mixingoil"/>} />
          <Route path='/powder' element={<Category cat="powder"/>} />
          <Route path='/about' element={<Aboutus />} />
          <Route path='/product/:productId' element={<Product />}/>
          <Route path='/blogs/:BlogId' element={<BlogPage/>}/>
          <Route path='/cart' element={<Cart />} />
          <Route path='/customercare' element={<CustomerCare />} />
          <Route path='/login' element={<Login />} />
          <Route path='/blogs' element={<BlogCollectionPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
