import React from 'react'
import Logo from '../nav-bar/logo'

const Footer = () => {
    
  const footerStyle = {
    backgroundColor: '#5790AB',
    color: 'white',
    padding: '2em 8em',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

  const sectionStyle = {
    margin: '10 px',
    borderColor: 'white',
    borderSize: '1px',
  }

  const titleStyle = {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left' as 'left',
    marginBottom: '8px',
  }

  const linkStyle = {
    color: '#f3f3f3',
    display: 'block',
    marginBottom: '5px',
    fontSize: 14,
  }

  const logoText = { 
    color: "#ffffff", 
    fontFamily: "Poppins", 
    fontSize: 28,
    fontWeight: "bold",
}

  return (
    <footer style={footerStyle}>
      <div className="flex items-center">
				<Logo />
				<div style={logoText} className="ml-2">
					TutorConnect
				</div>
			</div>
      <div style={sectionStyle} >
        <h3 style={titleStyle}>Quick Links</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '50%' }}>
                <a href="#" style={linkStyle}>Tuition Rates</a>
            </div>
            <div style={{ width: '50%' }}>
                <a href="#" style={linkStyle}>FAQ</a>
            </div>
            <div style={{ width: '50%' }}>
                <a href="#" style={linkStyle}>Terms & Conditions</a>
            </div>
            <div style={{ width: '50%' }}>
                <a href="#" style={linkStyle}>Privacy Policy</a>
            </div>
            </div>
      </div>
      <div style={sectionStyle}>
        <h3 style={titleStyle}>Contact Us</h3>
        <p style={linkStyle}>Phone: +1234567890</p>
        <p style={linkStyle}>Email: info@tutorconnect.com</p>
      </div>
    </footer>
  )
}

export default Footer
