import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <div 
      className="page-container" 
      style={{
        background: 'linear-gradient(to right, #015f5f, #028090, #00a896)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div className="content"> {/* Content goes here */} </div>
      <footer 
        className="footer" 
        style={{
          backgroundColor: '#028090',
          padding: '20px 0',
          color: '#fff',
          textAlign: 'center'
        }}
      >
        <div 
          className="container" 
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
          }}
        >
          <Link 
            to="/" 
            className="link" 
            style={{
              textDecoration: 'none',
              color: '#fff'
            }}
          >
            <span 
              className="span" 
              style={{
                fontSize: '24px',
                fontWeight: 'bold'
              }}
            >
              Taskaflow
            </span>
          </Link>
          <div 
            className="social-icons" 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px 0'
            }}
          >
            <a 
              href="https://facebook.com" 
              className="icon" 
              style={{
                fontSize: '24px',
                margin: '0 10px'
              }}
            >
              <FaFacebook />
            </a>
            <a 
              href="https://twitter.com" 
              className="icon" 
              style={{
                fontSize: '24px',
                margin: '0 10px'
              }}
            >
              <FaTwitter />
            </a>
            <a 
              href="https://instagram.com" 
              className="icon" 
              style={{
                fontSize: '24px',
                margin: '0 10px'
              }}
            >
              <FaInstagram />
            </a>
          </div>
          <p 
            className="copyright" 
            style={{
              fontSize: '14px',
              color: '#ccc'
            }}
          >
            &copy; {new Date().getFullYear()} Taskaflow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}