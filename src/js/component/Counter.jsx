import React, { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0); // estado del contador
    const [isCountingDown, setIsCountingDown] = useState(false); // Estado para saber si está en cuenta regresiva
    const [inputValue, setInputValue] = useState(''); // Estado para el número de inicio de la cuenta regresiva

   // Incrementar o decrementar el contador cada segundo dependiendo del modo (cuenta regresiva o ascendente)
   useEffect(() => {
    let interval;
    
    // Solo iniciar el intervalo si estamos en cuenta regresiva o incremento
    if (isCountingDown && count > 0) {
        interval = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);
    } else if (!isCountingDown) {
        interval = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);
    }

    // Limpiar el intervalo al desmontar el componente o cambiar el modo
    return () => clearInterval(interval);
   }, [isCountingDown, count]);


    // Formatear el contador a 6 dígitos
    const formattedCount = String(count).padStart(6, '0');

    // Función para iniciar la cuenta regresiva
    const startCountdown = () => {
        if (inputValue) {
            setCount(parseInt(inputValue, 10)); // Convertir el input en un número entero
            setIsCountingDown(true); // Cambiar al modo de cuenta regresiva
        }
    };

    // Función para reiniciar el contador
    const reset = () => {
        setIsCountingDown(false); // Detener la cuenta regresiva
        setCount(0);  // Reiniciar el contador a 0
    };

    return (
      <div className="counter-container">
      <span className="clock-icon">🕒</span>
      <div className="counter">
          {formattedCount.split('').map((digit, index) => (
              <span key={index} className="digit">{digit}</span>
          ))}
      </div>

      {/* Input para ingresar el número de inicio para la cuenta regresiva */}
      <input 
          type="number" 
          placeholder="Número inicial" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          className="input-countdown"
      />

      {/* Botón para iniciar la cuenta regresiva */}
      <button onClick={startCountdown} className="start-button">Iniciar Cuenta Regresiva</button>
      
      {/* Botón para reiniciar el contador */}
      <button onClick={reset} className="reset-button">Reiniciar</button>
  </div>
);
    
}

export default Counter;
