import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/signup';
import Send from './components/send';
import Sigin from './components/signin';
import Mainpage from './components/mainpage';
import { Provider } from 'react-redux';
import appstore from './utility/appstore';


function App() {
  return (
    <Provider store={appstore}>
    <div className="App">
     
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/send" element={<Send />} />
            <Route path="/signin" element={<Sigin />} />
            <Route path="/" element={<Mainpage />} />
          </Routes>
        </BrowserRouter>
     
    </div>
    </Provider>
  );
}

export default App;
