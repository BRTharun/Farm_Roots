import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/store/MainStore/store.jsx'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')!).render(
  
    
      <Provider store={store}>
  <BrowserRouter>
    <App />
        {/* <Vendor/> */}
          <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss = {false}
          draggable
          pauseOnHover = {false}
          theme="light"/>
      </BrowserRouter>
      </Provider>
)
