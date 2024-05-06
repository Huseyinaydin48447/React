import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import { Route, Routes } from "react-router-dom";
import CartDetails from "../cart/CartDetails";
import Dashboard from "./Dashboard"
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";
function App() {
  return (
    <div>
      <Container>
        <Navi />
        <Routes>
                <Route path="/" exact element={<Dashboard/>}/>
                <Route path="/product"  exact element={<Dashboard/>}  />
                <Route path="/cart" element={<CartDetails/>} />
                <Route path="*" element={<NotFound/>} />
                <Route path="/saveproduct" element={<AddOrUpdateProduct/>} />
                <Route path="/saveproduct/:productId" element={<AddOrUpdateProduct/>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;