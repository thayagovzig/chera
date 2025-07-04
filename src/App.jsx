import './App.css';
import { useEffect, useState } from 'react';
import man from './assets/man_compressed.png';
import building from './assets/chera_building_cropped.png';
import cheraLogo from './assets/chera_logo.png';

import AutoScrollingOffers from './components/AutoScrollingOffers';

function App() {
  const [step, setStep] = useState('login');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: mobile })
      });
      const data = await res.json();
      if (data.success) {
        setStep('otp');
        setSuccess('OTP sent to your mobile number');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: mobile, otp })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Login successful!');
        // Optionally store token: localStorage.setItem('token', data.token);
        // Open WhatsApp chat (replace with your desired number)
        window.open('https://wa.me/917339125472', '_blank');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="chera-root">
      {initialLoading && (
        <div className="chera-loader-bg">
          <div className="chera-loader"></div>
        </div>
      )}
      {!initialLoading && (
        <>
          {/* Desktop only: Human and yellow background */}
          <div className='man-img-container'>
            <div className="man-yellow-bg"></div>
            <img src={man} alt="Chera Man" className='man-img' />
          </div>
          <div className='background-building'>
            <img src={building} alt="Chera Building" className='building-img' />
          </div>
          {/* Login Form - always centered on mobile, original on desktop */}
          <div className="chera-login-form-container">
            <form className="chera-login-form" onSubmit={step === 'login' ? handleLogin : handleVerify}>
              <div className="chera-login-title">Login</div>
              {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
              {success && <div style={{color: 'green', marginBottom: 8}}>{success}</div>}
              {step === 'login' ? (
                <div className="chera-login-input-group">
                  <span className="chera-login-prefix">+91</span>
                  <input
                    type="tel"
                    className="chera-login-input"
                    placeholder="Phone Number"
                    value={mobile}
                    onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    required
                    disabled={loading}
                  />
                </div>
              ) : (
                <div className="chera-login-input-group">
                  <input
                    type="password"
                    className="chera-login-input"
                    placeholder="OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                    required
                    disabled={loading}
                  />
                </div>
              )}
              <button className="chera-login-btn" type="submit" disabled={loading}>
                {loading ? <div className="chera-btn-loader"></div> : (step === 'login' ? 'Grab your Deals!' : 'Verify')}
              </button>
            </form>
          </div>
          {/* Chera logo at top-right above offers */}
          <img src={cheraLogo} alt="Chera Home Junction Logo" className="chera-logo-topright" />
          <AutoScrollingOffers />
          <footer className="chera-footer">
            <div className="chera-footer-text">
              அனலைன்ஸ் | மின் சாதனங்கள் | வீட்டு உபகரணங்கள் | டைல்ஸ் மற்றும் சானிடரி வேர்
            </div>
            <div className="chera-footer-contact">
              <a href="https://cherahomejunction.com" target="_blank" rel="noopener noreferrer">www.cherahomejunction.com</a>
              <span> | </span>
              <a href="tel:+919996899968">+91 999 68 999 68</a>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
