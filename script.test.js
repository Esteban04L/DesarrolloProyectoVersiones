/**
 * @jest-environment jsdom
 */

import { login, toggleView } from './script';

describe('login', () => {
    it('debe aceptar credenciales válidas', () => {
        expect(login('admin', '1234')).toBe(true);
    });

    it('debe rechazar credenciales inválidas', () => {
        expect(login('usuario', 'incorrecto')).toBe(false);
    });
});

describe('toggleView', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="login-page"></div>
            <div id="dashboard-page"></div>
        `;
    });

    it('debe mostrar dashboard y ocultar login si está logueado', () => {
        toggleView(true);
        expect(document.getElementById("login-page").style.display).toBe("none");
        expect(document.getElementById("dashboard-page").style.display).toBe("block");
    });

    it('debe mostrar login y ocultar dashboard si no está logueado', () => {
        toggleView(false);
        expect(document.getElementById("login-page").style.display).toBe("block");
        expect(document.getElementById("dashboard-page").style.display).toBe("none");
    });
});
