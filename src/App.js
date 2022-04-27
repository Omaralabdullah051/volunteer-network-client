import { Route, Routes } from 'react-router-dom';
import './App.css';
import Blog from './pages/Blog/Blog';
import BookDetails from './pages/BookDetails/BookDetails';
import BookedEvents from './pages/BookedEvents/BookedEvents';
import Donation from './pages/Donation/Donation';
import Events from './pages/Events/Events';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Footer from './pages/shared/Header/Footer/Footer';
import Header from './pages/shared/Header/Header';
import RequireAuth from './pages/shared/RequireAuth/RequireAuth';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book/:id' element={<RequireAuth><BookDetails /></RequireAuth>} />
        <Route path='/events' element={<Events />} />
        <Route path='/bookedevents' element={<RequireAuth><BookedEvents /></RequireAuth>} />
        <Route path='/donation' element={<Donation />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
