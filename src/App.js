import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import urlPages from './urlPages/urlPages';
import Authentication from './authentication';
import Authorization from './authorization';
import { useSelector } from 'react-redux';
function App() {
  Authentication();
  let iscollab = useSelector((data) => {
    return data.dataLogged.iscollab;
  })
  const isAdmin = Authorization();
  return (
    <div>
      <Routes>
        {
          urlPages.map((item, idx) => {
            const Layout = item.layout
            // if (item.path == '/Admin' && !isAdmin) item.path = '/a';
            return <Route
              key={idx}
              path={(item.path == '/Admin' && !isAdmin) ? '/a' : item.path}
              element={
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
