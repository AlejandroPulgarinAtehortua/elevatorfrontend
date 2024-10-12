import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../elevator/store';
import { callElevator, getStatus } from '../elevator/elevator';
import './elevator.css';

const ElevatorControl: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const elevatorState = useSelector((state: RootState) => state.elevator);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleCallElevator = (floor: number) => {
    dispatch(callElevator(floor));
  };

  return (
    <div className="container">
      <h1 className="title">Controles</h1>
      <div className="status">
        <div className="statusItem">
          <span className="statusLabel">Piso:</span>
          <span className="statusValue">{elevatorState.currentFloor}</span>
        </div>
        <div className="statusItem">
          <span className="statusLabel">Estado</span>
          <span className="statusValue">{elevatorState.isMoving ? 'en movimiento' : 'detenido'}</span>
        </div>
        <div className="statusItem">
          <span className="statusLabel">Estado de la puerta</span>
          <span className="statusValue">{elevatorState.isDoorOpen ? 'abiertas' : 'cerradas'}</span>
        </div>
        <div className="statusItem">
          <span className="statusLabel">Se dirige a &#8679; - &#8681;</span>
          <span className="statusValue">{elevatorState.direction}</span>
        </div>
      </div>
      
      <div className="section">
        <h2 className="sectionTitle">Pedir del piso: </h2>
        <div className="buttonContainer">
          {[1, 2, 3, 4, 5].map((floor) => (
            <button 
              key={floor} 
              onClick={() => handleCallElevator(floor)}
              disabled={elevatorState.currentFloor === floor && !elevatorState.isMoving}
              className={`button ${elevatorState.currentFloor === floor && !elevatorState.isMoving ? 'disabledButton' : ''}`}
            >
              Floor {floor}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="sectionTitle">Pisos pendiente</h2>
        <ul className="list">
          {elevatorState.pendingRequests.map((floor, index) => (
            <li key={index} className="listItem">Piso {floor}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { ElevatorControl };
