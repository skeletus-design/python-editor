import React, { useEffect, useState } from 'react';
import logoLarge from './images/vshp_title.png';
import logoSmall from './images/logo.png';
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ activeTab}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Главная", tab: "home" },
    { path: "/editor", label: "Python", tab: "editor" },
    { path: "/lectures", label: "Лекции", tab: "lectures" },
    { path: "/tasks", label: "Задачи", tab: "tasks" }
  ];

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img 
          src={isMobile ? logoSmall : logoLarge} 
          alt="Logo" 
          style={styles.logo}
          onClick={() => navigateTo('/')}
        />
      </div>

      {/* Десктопное меню */}
      {!isMobile && (
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              style={{
                ...styles.navButton,
                ...(activeTab === item.tab ? styles.activeNavButton : {})
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}

      {/* Кнопка выхода (десктоп) */}
      {!isMobile && isAuthenticated && (
        <div style={styles.authContainer}>
          <button 
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Выйти
          </button>
        </div>
      )}

      {/* Мобильное меню */}
      {isMobile && (
        <>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={styles.menuButton}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {isMenuOpen && (
            <div style={styles.mobileMenu}>
              <div style={styles.mobileMenuContent}>
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigateTo(item.path)}
                    style={{
                      ...styles.mobileNavButton,
                      ...(activeTab === item.tab ? styles.activeMobileNavButton : {})
                    }}
                  >
                    {item.label}
                  </button>
                ))}

                {isAuthenticated && (
                  <button 
                    onClick={handleLogout}
                    style={styles.mobileLogoutButton}
                  >
                    Выйти
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </header>
  );
};

const styles = {
  header: {
    padding: "15px 20px",
    background: "#801924",
    color: "white",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "60px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 1000,
  },
  logoContainer: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "auto",
    height: "40px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  nav: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    transition: "all 0.3s ease",
    flex: "1 1 auto",
    justifyContent: "center",
    margin: "0 15px",
  },
  navButton: {
    background: "transparent",
    border: "none",
    color: "white",
    padding: "8px 15px",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.3s",
    minWidth: "90px",
    whiteSpace: "nowrap",
  },
  activeNavButton: {
    background: "linear-gradient(to bottom, #ff416c, #ff4b2b)",
  },
  authContainer: {
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "flex-end",
  },
  logoutButton: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "8px 15px",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.3s",
    minWidth: "90px",
    whiteSpace: "nowrap",
  },
  menuButton: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileMenu: {
    position: "fixed",
    top: "60px",
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.9)",
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  mobileMenuContent: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  mobileNavButton: {
    background: "transparent",
    border: "none",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s",
    textAlign: "left",
  },
  activeMobileNavButton: {
    background: "rgba(255, 65, 108, 0.7)",
  },
  mobileLogoutButton: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s",
    marginTop: "20px",
  },
};

export default Header;