import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import React from 'react';
import Loader from './Components/Loader';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profilepopup from './Components/Profilepopup';
import { AuthProvider } from './Components/Auth';
import { CartProvider } from './Components/Cartcontext';
import PrivateRoute from './Components/Privateroute';


const LazyHome=React.lazy(()=>import('./Components/Home'))
const LazyProducts=React.lazy(()=>import('./Components/Products'))
const LazyCart=React.lazy(()=>import('./Components/Cart'))
const LazyOffers=React.lazy(()=>import('./Components/Offers'))
const LazyAbout=React.lazy(()=>import('./Components/About'))
const LazyContact=React.lazy(()=>import('./Components/Contact'))
const LazyAccount=React.lazy(()=>import('./Components/Account'))
const LazyLogin=React.lazy(()=>import('./Components/Login'))
const LazySignup=React.lazy(()=>import('./Components/Signup'))
const LazyBill=React.lazy(()=>import('./Components/Bill'))
const LazyCategory = React.lazy(() => import('./Components//Category'));
const LazyGroup = React.lazy(() => import('./Components/GroupPage'));

// Admin Lazy Loads
const LazyAdmin=React.lazy(()=>import('./Components/Admin'))
const LazyAdminorders=React.lazy(()=>import('./Components/Orders'))
const LazyOrdersuccess=React.lazy(()=>import('./Components/Ordersuccess'))
const LazyAdminoffers=React.lazy(()=>import('./Components/AdminOffers'))

// DeliveryBoy Lazy Loads
const LazyDeliverBoyorders=React.lazy(()=>import('./Components/Deliveryboy'))


function App() {
  return (
          <div className="App">
    <AuthProvider>
    <CartProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<React.Suspense fallback={<Loader/>}><LazyHome/></React.Suspense>}/>
        <Route path='/products' element={<React.Suspense fallback={<Loader/>}><LazyProducts/></React.Suspense>}/>
        <Route path='/cart' element={<React.Suspense fallback={<Loader/>}><LazyCart/></React.Suspense>}/>
        <Route path='/offers' element={<React.Suspense fallback={<Loader/>}><LazyOffers/></React.Suspense>}/>
        <Route path='/account' element={<React.Suspense fallback={<Loader/>}><LazyAccount/></React.Suspense>}/>
        <Route path='/about' element={<React.Suspense fallback={<Loader/>}><LazyAbout/></React.Suspense>}/>
        <Route path='/contact' element={<React.Suspense fallback={<Loader/>}><LazyContact/></React.Suspense>}/>
        <Route path='/login' element={<React.Suspense fallback={<Loader/>}><LazyLogin/></React.Suspense>}/>
        <Route path='/signup' element={<React.Suspense fallback={<Loader/>}><LazySignup/></React.Suspense>}/>
        <Route path='/bill' element={<React.Suspense fallback={<Loader/>}><LazyBill/></React.Suspense>}/>
        <Route path='/category/:categoryName' element={<React.Suspense fallback={<Loader/>}><LazyCategory/></React.Suspense>}/>
        <Route path='/group/:groupName' element={<React.Suspense fallback={<Loader/>}><LazyGroup/></React.Suspense>}/>


        {/* Admin Side Routes */}
        <Route path='/admin' element={<React.Suspense fallback={<Loader/>}> <PrivateRoute requiredRole="admin"><LazyAdmin /></PrivateRoute></React.Suspense>}/>
        <Route path='/admin' element={<React.Suspense fallback={<Loader/>}> <PrivateRoute requiredRole="admin"><LazyAdminorders /></PrivateRoute></React.Suspense>}/>
        <Route path='/adminorders' element={<React.Suspense fallback={<Loader/>}><LazyAdminorders/></React.Suspense>}/>
        <Route path='/ordersuccess' element={<React.Suspense fallback={<Loader/>}><LazyOrdersuccess/></React.Suspense>}/>
        <Route path='/adminoffers' element={<React.Suspense fallback={<Loader/>}><PrivateRoute requiredRole="admin"><LazyAdminoffers/></PrivateRoute></React.Suspense>}/>

        {/* Delivey Bots Route */}

        <Route path='/orders' element={<React.Suspense fallback={<Loader/>}><PrivateRoute requiredRole="orders"><LazyDeliverBoyorders/></PrivateRoute></React.Suspense>}/>

      </Routes>
      </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
