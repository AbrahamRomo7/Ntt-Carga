import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { settings } from './config.js'; // <--- Importas tu nueva configuración

const usuarios = new SharedArray('lista de usuarios', function () {
    return JSON.parse(open('./data/usuarios.json'));
});

export const options = {
    vus: 45, 
    duration: '1m', 
    thresholds: {
        http_req_failed: ['rate<0.03'], // Tasa de error < 3%
        http_req_duration: ['p(95)<1500'], // Máximo 1.5 segundos
    },
};

export default function () {
    const url = `${settings.urlBase}/auth/login`;
    const credenciales = usuarios[(__VU - 1) % usuarios.length];

    const payload = JSON.stringify({
        username: credenciales.usuario,
        password: credenciales.password,
    });

    const params = {
        headers: settings.headers,
    };

    const res = http.post(url, payload, params);

    check(res, {
        'el estado es 200 o 201': (r) => r.status === 200 || r.status === 201,
        'se recibio el token': (r) => {
            try { return r.json().token !== undefined; } 
            catch (e) { return false; }
        },
    });

    sleep(1);
}
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "reporte.html": htmlReport(data),
  };
}