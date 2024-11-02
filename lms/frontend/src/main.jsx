
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import Toaster from 'react-hot-toast';
import ContextAPiHeader from './headerContextApi/ContextAPiHeader.jsx';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <ContextAPiHeader>
     <Toaster
  position="bottom-center"
  reverseOrder={false}/>
    <App />
     </ContextAPiHeader>


  </Provider>,
)
