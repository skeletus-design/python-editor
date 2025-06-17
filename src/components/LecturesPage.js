import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

const LecturesPage = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get('http://localhost:9000/lectures/');
        setLectures(response.data);
      } catch (err) {
        setError('Ошибка при загрузке лекций');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }

  return (
    <div className="lectures-container">
      <div className="lectures-content">
        <h1 className="lectures-title">Лекции по Python</h1>
        
        <div className="lectures-grid">
          {lectures.map((lecture) => (
            <div key={lecture.id} className="lecture-card">
              <div className="card-header">
                <span className={`level-badge ${lecture.level.toLowerCase()}`}>
                  {lecture.level}
                </span>
              </div>
              <div className="card-body">
                <h3 className="lecture-title">{lecture.title}</h3>
                <p className="lecture-author">Автор: {lecture.author}</p>
                <div className="lecture-preview">
                  {lecture.content.length > 150 
                    ? `${lecture.content.substring(0, 150)}...` 
                    : lecture.content}
                </div>
              </div>
              <div className="card-footer">
                <Link to={`/lectures/${lecture.id}`} className="read-more-btn">
                  Читать полностью →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .lectures-container {
          background-color: #f8f9fa;
          min-height: 100vh;
        }
        
        .lectures-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .lectures-title {
          color: #801924;
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 600;
          font-size: 2rem;
        }
        
        .lectures-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        
        .lecture-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .lecture-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
          padding: 1rem 1.5rem;
          background: #f8f9fa;
          border-bottom: 1px solid #eee;
        }
        
        .level-badge {
          padding: 0.35rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .level-badge.beginner {
          background: #e6f7ee;
          color: #28a745;
        }
        
        .level-badge.intermediate {
          background: #fff8e6;
          color: #ffc107;
        }
        
        .level-badge.advanced {
          background: #fee6e6;
          color: #dc3545;
        }
        
        .card-body {
          padding: 1.5rem;
          flex: 1;
        }
        
        .lecture-title {
          color: #2c3e50;
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.3;
        }
        
        .lecture-author {
          color: #6c757d;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          font-style: italic;
        }
        
        .lecture-preview {
          color: #495057;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .card-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #eee;
          background: #f8f9fa;
        }
        
        .read-more-btn {
          color: #801924;
          text-decoration: none;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s ease;
        }
        
        .read-more-btn:hover {
          color: #5a1220;
        }
        
        .read-more-btn::after {
          content: '→';
          margin-left: 0.5rem;
          transition: transform 0.2s ease;
        }
        
        .read-more-btn:hover::after {
          transform: translateX(3px);
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        
        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(128, 25, 36, 0.2);
          border-radius: 50%;
          border-top-color: #801924;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .error-message {
          padding: 2rem;
          text-align: center;
          color: #dc3545;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default LecturesPage;