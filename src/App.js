import { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import urlPages from './urlPages/urlPages';
function App() {
  return (
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
  );
}

export default App;
