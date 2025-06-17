import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

const LectureDetail = () => {
  const { id } = useParams();
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/lectures/${id}`);
        setLecture(response.data);
      } catch (err) {
        setError('Лекция не найдена');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [id]);

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
    <div className="lecture-detail-container">
      <div className="lecture-detail-content">
        <Link to="/lectures" className="back-button">
          ← Назад к списку лекций
        </Link>
        
        <div className="lecture-card">
          <div className="card-header">
            <span className={`level-badge ${lecture.level.toLowerCase()}`}>
              {lecture.level}
            </span>
          </div>
          <div className="card-body">
            <h1 className="lecture-title">{lecture.title}</h1>
            <p className="lecture-author">Автор: {lecture.author}</p>
            
            <div className="lecture-content">
              {lecture.content.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lecture-detail-container {
          background-color: #f8f9fa;
          min-height: 100vh;
        }
        
        .lecture-detail-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .back-button {
          display: inline-block;
          margin-bottom: 2rem;
          color: #801924;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          border: 2px solid #801924;
        }
        
        .back-button:hover {
          background-color: #801924;
          color: white;
        }
        
        .lecture-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .card-header {
          padding: 1rem 2rem;
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
          padding: 2rem;
        }
        
        .lecture-title {
          color: #2c3e50;
          margin-bottom: 1rem;
          font-size: 1.75rem;
          font-weight: 600;
          line-height: 1.3;
        }
        
        .lecture-author {
          color: #6c757d;
          font-size: 1rem;
          margin-bottom: 2rem;
          font-style: italic;
        }
        
        .lecture-content {
          color: #495057;
          line-height: 1.8;
          font-size: 1.05rem;
        }
        
        .lecture-content p {
          margin-bottom: 1.5rem;
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
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
};

export default LectureDetail;