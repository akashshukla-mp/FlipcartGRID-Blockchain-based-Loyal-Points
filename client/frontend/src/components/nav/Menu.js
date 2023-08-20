import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { BiCategory, BiLogIn, BiSearch } from "react-icons/bi";
import { AiOutlineShop } from "react-icons/ai";
import "./Menu.css";

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // hooks
  const navigate = useNavigate();
  const categories = useCategory();

  // console.log("Categories in menu  ", categories);
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light myMenu">
        <div className="left-menu">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">
              {/* <FaHome HOME>HOME</FaHome> */}
              <FaHome /> Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/shop">
              <AiOutlineShop /> SHOP
            </NavLink>
          </li>

          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <BiCategory /> CATEGORIES
              </a>

              <ul
                className="dropdown-menu"
                style={{ height: "300px", overflow: "scroll" }}
              >
                <li>
                  <NavLink className="nav-link" to="/categories">
                    <BiCategory /> All Categories
                  </NavLink>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <NavLink className="nav-link" to={`/category/${c.slug}`}>
                      {c.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </div>
        </div>

        <Search />
        <div className="left-menu">
        <li className="nav-item mt-1">
          <Badge
            count={cart?.length >= 1 ? cart?.length : 0}
            offset={[-5, 11]}
            showZero="true"
          >
            <NavLink className="nav-link" aria-current="page" to="/cart">
              <FaShoppingCart /> CART
            </NavLink>
          </Badge>
        </li>
        {!auth?.user ? (
            <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <BiLogIn /> LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                <BiLogIn /> REGISTER
              </NavLink>
            </li>
          </>
        ) : (
            <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
                >
                <FaUserAlt /> {auth?.user?.name?.toUpperCase()}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link pointer"
                    to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                    >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">
                    Logout
                  </a>
                </li>
               
              </ul>
            </li>
            
          </div>
        )}
        </div>
        
      </ul>
    </>
  );
}
