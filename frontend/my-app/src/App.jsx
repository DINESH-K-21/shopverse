import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./router/PrivateRoute";
import Home from "./pages/Home";
import ProductPost from "./pages/ProductPost";
import ProfilePage from "./pages/ProfilePage";
import Cart from "./pages/Cart";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/add" element={<ProductPost />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
