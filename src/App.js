import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginRegister/>}></Route>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/register' element={<LoginRegister/>}></Route>
      <Route path='/login' element={<LoginRegister/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
