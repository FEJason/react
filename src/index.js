import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login/Login'
import Goods from './pages/goods/Goods'
import Home from './pages/home/Home'

moment.locale('zh-cn');

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <HashRouter>
    {/* 相当于之前的 Switch */}
    <Routes>
      {/* 配置路由 */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />}></Route>
        {/* 嵌套路由 */}
        <Route path="goods" element={<Goods />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      {/* 匹配404 */}
      <Route path="*" element={<App />} />
    </Routes>
  </HashRouter>
);

// ReactDOM.render(
//   <HashRouter>
//     {/* 相当于之前的 Switch */}
//     <Routes>
//       {/* 配置路由 */}
//       <Route path="/" element={<App />}>
//         <Route index element={<Home />}></Route>
//         {/* 嵌套路由 */}
//         <Route path="goods" element={<Goods />}></Route>
//       </Route>
//       <Route path="/login" element={<Login />}></Route>
//       {/* 匹配404 */}
//       <Route path="*" element={<App />} />
//     </Routes>
//   </HashRouter>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
