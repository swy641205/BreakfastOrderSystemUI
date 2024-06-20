import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import OrderHistory from "./Pages/OrderHistory";
import User from "./Pages/User";
import BreakfastDetail from "./Pages/BreakfastDetail";
import AdminLogin from "./Pages/AdminLogin";
import ShopLogin from "./Pages/ShopLogin";
import OrderConfirm from "./Pages/OrderConfirm";
import AdminBackstage from "./Pages/AdminBackstage";
import ShopRegister from "./Pages/ShopRegister";
import ProtectedRoute from './Components/ProtectedRoute';



function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route index path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<ProtectedRoute component={Home} />} />
                    {/* TODO add protectedroute to all page */}
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/history" element={<OrderHistory />} />
                    <Route path="/user" element={<ProtectedRoute component={User} />} />
                    <Route path="/order/detail/:id" element={<BreakfastDetail />} />
                    <Route path="/auth/admin" element={<AdminLogin />} />
                    <Route
                        path="/auth/admin/backstage"
                        element={<AdminBackstage />}
                    />
                    <Route path="/auth/shop" element={<ShopLogin />} />
                    <Route path="/auth/shop/order" element={<OrderConfirm />} />
                    <Route path="/shop/register" element={<ShopRegister />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
