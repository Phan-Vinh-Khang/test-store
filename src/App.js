import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import urlPages from './urlPages/urlPages';
import Authentication from './authentication';
import Authorization from './authorization';
function App() {
  Authentication()
  const isAdmin = Authorization();
  return (
    <div>
      <Routes>
        {
          urlPages.map(item => {
            const Layout = item.layout
            // if (item.path == '/Admin' && !isAdmin) item.path = '/a';
            return <Route key={item.path} path={(item.path == '/Admin' && !isAdmin) ? '/a' : item.path} element={
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
