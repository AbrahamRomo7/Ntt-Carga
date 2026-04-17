import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '5s',
};

export default function () {
    // URL y Datos fijos (Sin variables externas)
    const url = 'https://fakestoreapi.com/auth/login';
    
    const payload = JSON.stringify({
        username: 'mor_2314',
        password: '83r5^_'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    // Validaciones simples
    check(res, {
        'status es 200': (r) => r.status === 200 || r.status === 201,
        'recibi un token': (r) => r.json().token !== undefined,
    });

    sleep(1);
}