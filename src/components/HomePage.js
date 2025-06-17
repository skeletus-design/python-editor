import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

const HomePage = () => {
  const features = [
    {
      title: 'Python Editor',
      description: 'Интерактивная среда для написания и выполнения Python-кода прямо в браузере',
      link: '/editor',
      emoji: '🐍'
    },
    {
      title: 'Лекции',
      description: 'Подробные учебные материалы по Python от основ до продвинутых тем',
      link: '/lectures',
      emoji: '📚'
    },
  ];

  return (
    <div className="home-container">
      
      <div className="container py-3 py-md-5 px-3 px-md-4">
        <div className="text-center mb-4 mb-md-5">
          <h1 className="main-title">Добро пожаловать в Practicum</h1>
          <p className="lead-text">Изучайте Python эффективно с нашей платформой</p>
        </div>
        
        <div className="row row-cols-1 row-cols-lg-2 g-3 g-md-4">
          {features.map((feature, index) => (
            <div key={index} className="col">
              <div className="feature-card">
                <div className="card-body">
                  <div className="feature-emoji">
                    {feature.emoji}
                  </div>
                  <h3 className="feature-title">
                    {feature.title}
                  </h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
                <div className="card-footer">
                  <Link 
                    to={feature.link} 
                    className="feature-link"
                  >
                    Перейти →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .home-container {
          background-color: #f8f9fa;
          min-height: 100vh;
          padding-bottom: 2rem;
        }
        
        .main-title {
          color: #801924;
          font-weight: 600;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .lead-text {
          color: #6c757d;
          font-size: 1rem;
        }
        
        .feature-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .feature-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .card-body {
          padding: 1.5rem;
          text-align: center;
          flex: 1;
        }
        
        .feature-emoji {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .feature-title {
          color: #801924;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }
        
        .feature-description {
          color: #495057;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .card-footer {
          padding: 0 1.5rem 1.5rem;
          border: none;
          background: transparent;
          text-align: center;
        }
        
        .feature-link {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          border: 2px solid #801924;
          border-radius: 50px;
          color: #801924;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }
        
        .feature-link:hover {
          background-color: #801924;
          color: white;
        }
        
        /* Адаптивные стили */
        @media (min-width: 576px) {
          .main-title {
            font-size: 1.75rem;
          }
          
          .lead-text {
            font-size: 1.1rem;
          }
        }
        
        @media (min-width: 768px) {
          .main-title {
            font-size: 2rem;
          }
          
          .feature-title {
            font-size: 1.5rem;
          }
          
          .feature-description {
            font-size: 1rem;
          }
          
          .feature-link {
            padding: 0.5rem 1.5rem;
            font-size: 1rem;
          }
        }
        
        @media (min-width: 992px) {
          .main-title {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;