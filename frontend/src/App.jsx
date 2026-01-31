import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Cravings from "./components/Cravings";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SearchResult from "./Pages/SearchResult";
import Cart from "./Pages/Cart";
import PrivateRoute from "./Pages/PrivateRoute";
import About from "./Pages/About";
import OrderSuccess from "./Pages/OrderSuccess";
import Chat from "./Pages/Chat";
import Contact from './Pages/Contact';

function App() {
  return (
    <>
   

   
   <div> 
      <Navbar />
      </div>
      <div style={{ paddingTop: "110px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/chat" element={<Chat />} />

      </Routes>
      <Footer/>
      </div>
    </>
  );
}

export default App;
