import './css/Navbar.css';
import './css/App.css';
import './css/Home.css';
import './css/Showcase.css';
import './css/Footer.css';
import './css/SignUp.css';
import './css/Home-lf.css';
import './css/report-form.css';
import './css/showcase-lf.css';
import './css/review.css';
import './css/Blog.css';
import './css/finder.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import Blog from './components/Blog';
import BlacktoBlue from './components/BlacktoBlue';
import BluetoBlack from './components/BluetoBlack';
import Showcase from './components/Showcase';
import Footer from './components/Footer';
import GoTop from './components/GoTop';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Homelf from './components/Homelf';
import Showcaselostandfound from './components/Showcaselostandfound';
import Review from './components/Review';
import Toblue from './components/Toblue';
import Tofinderblue from './components/FadeToFinderBlue';
import LostAndFoundReport from './components/LostAndFoundReport'; // Import the new component
import Finder from './components/finder'; // Import the new component
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <Router>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className='home'>
                  <Home />
                </section>
                <BlacktoBlue />
                <Showcase />
                <Footer />
                <GoTop />
              </>
            }
          />
          <Route
            path="/lost-found"
            element={
              <>
                <section className='home'>
                  <Homelf />
                </section>
                <BlacktoBlue />
                <Showcaselostandfound />
                <BluetoBlack />
                <Review />
                <Toblue />
                <Footer />
                <GoTop />
              </>
            }
          />
          <Route
            path="/report"
            element={
              <div className="nav-body">
                <LostAndFoundReport />
                <Footer />
              </div>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <>
                <Blog/>
                <BluetoBlack />
                <Review />
                <Toblue />
                <Footer />
                <GoTop />
                </>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="nav-body">
                <SignUp />
                <Footer />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="nav-body">
                <Login />
                <Footer />
              </div>
            }
          />
          <Route
            path="/forget-password"
            element={
              <div className="nav-body">
                <ResetPassword />
                <Footer />
              </div>
            }
          />
          <Route
            path="/finder"
            element={
              <>
                <Finder />
                <Tofinderblue />
                <Footer />
                <GoTop />
              </>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
