import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
import UserStore from "./store/UserStore";
import GoodStore from "./store/GoodStore";
import AdminStore from "./store/AdminStore";
import SellerStore from "./store/SellerStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
      user: new UserStore(),
      good: new GoodStore(),
      admin: new AdminStore(),
      seller: new SellerStore(),
  }}>
      <App />
  </Context.Provider>
);