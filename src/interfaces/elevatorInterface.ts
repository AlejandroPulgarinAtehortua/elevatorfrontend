export interface ElevatorState {
  currentFloor: number;
  isMoving: boolean;
  isDoorOpen: boolean;
  pendingRequests: number[];
  direction: 'subiendo' | 'bajando' | 'inmovil';
  status: 'inmovil' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}