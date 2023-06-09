import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import urlPages from './urlPages/urlPages';
import jwt_decode from 'jwt-decode'
import Authentication from './authentication';
function App() {
  Authentication()
  return (
    <div>
      <Routes>
        {
          urlPages.map(item => {
            const Layout = item.layout
            return <Route key={item.path} path={item.path} element={
              <Layout>
                {item.element}
              </Layout>
            }
            />
          })
        }
      </Routes >
    </div>
  );
}
export default (App);
