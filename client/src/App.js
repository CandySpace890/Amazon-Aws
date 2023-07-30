import Navbar from './components/pages/Navbar';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import './App.css';
import RegisterForm from './components/pages/Register';
import LoginForm from './components/pages/Login';
import Profile from './components/pages/Profile';
import { UserProvider } from './context/userContext';
function App() {
  return (

    <div className="App">
       <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;