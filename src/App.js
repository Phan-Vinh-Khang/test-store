import { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import urlPages from './urlPages/urlPages';
function App() {
  return (
    <Routes>
      {
        urlPages.map(item => {
          const Layout = item.layout
          Element = item.element
          return <Route path={item.path} element={
            // <WrapContext.Provider value={LoggedIn}>
            <Layout>
              {item.element}
            </Layout>
            // </WrapContext.Provider>
          }
          />
        })
      }
    </Routes >
  );
}

export default App;
