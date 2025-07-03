import './App.css';
import { useEffect, useState } from 'react';
import logo from './assets/chera_logo.png';
import man from './assets/man_compressed.png';
import building from './assets/chera_building_cropped.png';

function App() {
  const [step, setStep] = useState('login');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1200);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // You can add further logic here
    }, 1200);
  };

  return (
    <div className="chera-root">
      {initialLoading && (
        <div className="chera-loader-bg">
          <div className="chera-loader"></div>
        </div>
      )}
      {/* Login Form */}
      {!initialLoading && (
        <>
        
        <div className='man-img-container'>
        <div className="man-yellow-bg"></div>
        <img src={man} alt="Chera Man" className='man-img' />
      </div>
      <div className='background-building'>
        <img src={building} alt="Chera Building" className='building-img' />
      </div>
        <div className="chera-login-form-container">
          <form className="chera-login-form" onSubmit={step === 'login' ? handleLogin : handleVerify}>
            <div className="chera-login-title">Login</div>
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
        <div className='chera-logo'>
          <img src={logo}/>
        </div>
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
