import {BrowserRouter as Router , Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import Header1 from './components/Header1'
import Footer1 from './components/Footer1'
import ContectUsScreen from './screens/ContectUsScreen'
import ImageGallery from './components/ImageGallery'
import ProductDescription from './components/ProductDescription'




const App = () => {
  return (
    <Router>
      <Header1 />
      {/*<Header />>*/ }
      <main className='py-3'>
      <Route  path='/login' component={LoginScreen} />
      <Route  path='/register' component={RegisterScreen} />
      <Route exact path='/contact' component={ContectUsScreen}/>
        <Container>
          <Route  path='/order/:id' component={OrderScreen} />
          <Route  path='/payment' component={PaymentScreen} />
          <Route  path='/placeorder' component={PlaceOrderScreen} />
          <Route  path='/shipping' component={ShippingScreen} />
          <Route  path='/:id/image-gallery' component={ImageGallery} />
          <Route  path='/:id/description' component={ProductDescription} />
          
          
          <Route  path='/profile' component={ProfileScreen} />
          <Route  path='/product/:id' component={ProductScreen} />
          <Route  path='/cart/:id?' component={CartScreen} />
          <Route  path='/admin/userlist' component={UserListScreen} />
          <Route  path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route  path='/admin/productlist' component={ProductListScreen} exact />
          <Route  path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
          <Route  path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route  path='/admin/orderlist' component={OrderListScreen} />
          <Route  path='/search/:keyword' component={HomeScreen} exact />
          <Route  path='/page/:pageNumber' component={HomeScreen} />
          <Route  path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
          <Route exact path='/' component={HomeScreen} />
        </Container>
      </main>
      <Footer1 />
      <Footer />
    </Router>
  );
}

export default App;