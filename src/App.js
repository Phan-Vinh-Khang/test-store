import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import urlPages from './urlPages/urlPages';
import { useSelector } from 'react-redux';
function App() {
  console.log('test')
  return (
    <div>
      <Routes>
        {
          urlPages.map(item => {
            const Layout = item.layout
            return <Route path={item.path} element={
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
