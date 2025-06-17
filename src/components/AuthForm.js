import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [code, setCode] = useState(Array(6).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  // Фокусировка на поле
  const focusInput = (index) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index].focus();
      setActiveIndex(index);
    }
  };

  // Обработчик ввода цифры
  const handleInput = (e, index) => {
    const value = e.target.value;
    
    if (/^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      if (index < 5) {
        focusInput(index + 1);
      }
    } 
    else if (value.length > 1) {
      const digits = value.replace(/\D/g, '').split('');
      const newCode = [...code];
      
      for (let i = 0; i < digits.length && index + i < 6; i++) {
        newCode[index + i] = digits[i];
      }
      
      setCode(newCode);
      const lastFilledIndex = Math.min(index + digits.length - 1, 5);
      focusInput(lastFilledIndex);
    }
  };

  // Обработчик удаления
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      
      const newCode = [...code];
      
      if (newCode[index]) {
        newCode[index] = '';
      } 
      else if (index > 0) {
        newCode[index - 1] = '';
        focusInput(index - 1);
      }
      
      setCode(newCode);
    }
  };

  // Автофокус на первое поле при загрузке
  useEffect(() => {
    focusInput(0);
  }, []);

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.some(digit => digit === '')) return;
    
    setIsProcessing(true);
    setError('');

    try {
      const response = await axios.post('https://api.vshp.online/api/v1/user/session/otp', {
        code: code.join('')
      });

      if (response.data?.token) {
        localStorage.setItem('authToken', response.data.token);
        setIsSubmitted(true);
        navigate('/');
      }
    } catch (error) {
      setError('Неверный код. Попробуйте снова.');
      setCode(Array(6).fill(''));
      focusInput(0);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        {isSubmitted ? (
          <div>
            <h2 style={{ color: '#4CAF50', marginBottom: '15px' }}>✅ Авторизация успешна!</h2>
            <button
              onClick={() => {
                localStorage.removeItem('authToken');
                setIsSubmitted(false);
                setCode(Array(6).fill(''));
              }}
              style={{
                backgroundColor: '#801924',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Выйти
            </button>
          </div>
        ) : (
          <div>
            <h2 style={{ color: '#801924', marginBottom: '5px' }}>Python Editor</h2>
            <p style={{ color: '#555', marginBottom: '25px' }}>Подтвердите вашу личность</p>
            
            <form onSubmit={handleSubmit}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '25px'
              }}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputsRef.current[index] = el}
                    type="text"
                    value={digit}
                    onChange={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onClick={(e) => {
                      e.target.select();
                      setActiveIndex(index);
                    }}
                    onFocus={() => setActiveIndex(index)}
                    style={{
                      width: '50px',
                      height: '60px',
                      fontSize: '24px',
                      textAlign: 'center',
                      border: `2px solid ${
                        error ? '#f44336' : 
                        activeIndex === index ? '#801924' : '#ddd'
                      }`,
                      borderRadius: '8px',
                      outline: 'none',
                      caretColor: 'transparent',
                      transition: 'border-color 0.2s ease'
                    }}
                    maxLength="1"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                  />
                ))}
              </div>
              
              {error && (
                <p style={{ color: '#f44336', marginBottom: '15px' }}>{error}</p>
              )}
              
              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  width: '100%',
                  backgroundColor: '#801924',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  opacity: isProcessing ? 0.7 : 1
                }}
              >
                {isProcessing ? 'Проверка...' : 'Войти'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;