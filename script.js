import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 300,
  duration: '300s',
  rps: 1000,
};

export default function () {
  const res = http.get(`http://localhost:1111/api/restaurants/${Math.ceil(Math.random() * 10000000)}/info`);
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 2000,
  });
  // sleep(1);
}

// k6 run script.js
