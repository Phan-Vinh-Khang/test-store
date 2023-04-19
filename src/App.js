import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { redirect } from 'react-router-dom';
import urlPages from './urlPages/urlPages';
function App() {
  let [state, setState] = useState('')
  return (
    <Routes>
      {
        urlPages.map(item => {
          const Layout = item.layout
          Element = item.element
          return <Route path={item.path} element={
            <Layout>
              {item.element}
            </Layout>}
          />
        })
      }
    </Routes >
  );
}

export default App;
