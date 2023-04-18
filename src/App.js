import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom'
import urlPages from './urlPages/urlPages';
import { useState } from 'react';
function App() {
  let [state, setState] = useState('')
  let funcLogin = (logginName) => {
    setState(logginName)
    window.location.href = "http://localhost:3000/";
    console.log(logginName)

  }
  function processAjaxData(response) {
    document.getElementById("root").innerHTML = response.html;
    document.title = response.pageTitle;
    window.history.pushState({ "html": response.html, "pageTitle": response.pageTitle }, "", '/');
  }
  return (
    <Routes>
      {
        urlPages.map(item => {
          const Layout = item.layout
          return <Route path={item.path} element={
            <Layout loginName={state} func={funcLogin} Element={item.element}>
              {/* {item.element} */}
            </Layout>}
          />
        })
      }
    </Routes >
  );
}

export default App;
