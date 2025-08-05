import { useRef } from 'react';

function createKalmanFilter({ R = 1, Q = 1, A = 1, B = 0, C = 1 } = {}) {
  let cov = NaN;
  let x = NaN;

  return {
    filter(z: number, u = 0) {
      if (isNaN(x)) {
        x = (1 / C) * z;
        cov = (1 / C) * Q * (1 / C);
      } else {
        const predX = A * x + B * u;
        const predCov = A * cov * A + R;

        const K = predCov * C * (1 / (C * predCov * C + Q));
        x = predX + K * (z - C * predX);
        cov = predCov - K * C * predCov;
      }
      return x;
    },
    last() {
      return x;
    },
    reset() {
      cov = NaN;
      x = NaN;
    }
  };
}

export function useKalman(config = { R: 0.01, Q: 3 }) {
  const kalman = useRef(createKalmanFilter(config));

  const filter = (value: number) => kalman.current.filter(value);
  const reset = () => kalman.current.reset();
  const last = () => kalman.current.last();

  return { filter, reset, last };
}
