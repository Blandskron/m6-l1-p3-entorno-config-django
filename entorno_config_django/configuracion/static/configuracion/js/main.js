/**
 * Controladores Interactivos para la Plataforma Educativa Django
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Control de Pestañas (Tab Switcher)
    // ----------------------------------------------------
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabHeaders.length > 0) {
        tabHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const targetTab = header.getAttribute('data-tab');

                // Desactivar todas las cabeceras e hilos de contenido
                tabHeaders.forEach(h => h.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Activar la seleccionada
                header.classList.add('active');
                const activeContent = document.getElementById(targetTab);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });
    }

    // ----------------------------------------------------
    // 2. Simulador de Terminal de Entorno Virtual (VENV)
    // ----------------------------------------------------
    const termBody = document.getElementById('terminal-body');
    if (termBody) {
        // Variables de estado del simulador
        let state = {
            venvCreated: false,
            isActive: false,
            djangoInstalled: false,
            currentDir: 'C:\\proyecto_django',
            globalPackages: ['pip (23.2.1)', 'setuptools (68.0.0)', 'virtualenv (20.24.5)'],
            venvPackages: ['pip (23.2.1)', 'setuptools (68.0.0)']
        };

        // Elementos del panel de estado
        const elStatus = document.getElementById('status-active');
        const elPython = document.getElementById('status-python');
        const elDjango = document.getElementById('status-django');
        const elLibs = document.getElementById('status-libs');
        const elPath = document.getElementById('status-path');

        // Botones de control
        const btnCreate = document.getElementById('btn-create-venv');
        const btnActivate = document.getElementById('btn-activate-venv');
        const btnInstall = document.getElementById('btn-install-django');
        const btnDeactivate = document.getElementById('btn-deactivate-venv');
        const btnList = document.getElementById('btn-pip-list');
        const btnClear = document.getElementById('btn-clear-term');

        // Función para actualizar el Panel de Estado Visual
        function updateStatusPanel() {
            if (elStatus) {
                if (state.isActive) {
                    elStatus.textContent = 'ACTIVO (Aislado)';
                    elStatus.className = 'status-value status-active';
                } else {
                    elStatus.textContent = 'INACTIVO (Global)';
                    elStatus.className = 'status-value status-inactive';
                }
            }
            if (elPython) {
                elPython.textContent = state.isActive ? 'Python 3.11.4 (Entorno Aislado)' : 'Python 3.11.4 (Sistema Global)';
            }
            if (elDjango) {
                if (state.isActive && state.djangoInstalled) {
                    elDjango.textContent = 'Instalado (v6.0.1)';
                    elDjango.className = 'status-value status-active';
                } else if (!state.isActive && state.globalPackages.some(p => p.startsWith('django'))) {
                    elDjango.textContent = 'Instalado en Global (No recomendado)';
                    elDjango.className = 'status-value status-inactive';
                } else {
                    elDjango.textContent = 'No Detectado';
                    elDjango.className = 'status-value status-inactive';
                }
            }
            if (elLibs) {
                if (state.isActive) {
                    elLibs.textContent = state.venvPackages.join(', ');
                } else {
                    elLibs.textContent = state.globalPackages.join(', ');
                }
            }
            if (elPath) {
                elPath.textContent = state.isActive ? state.currentDir + '\\venv\\Scripts\\python.exe' : 'C:\\Python311\\python.exe';
            }

            // Habilitar/Deshabilitar botones de acuerdo al estado
            if (btnCreate) btnCreate.disabled = state.venvCreated;
            if (btnActivate) btnActivate.disabled = !state.venvCreated || state.isActive;
            if (btnInstall) btnInstall.disabled = !state.isActive || state.djangoInstalled;
            if (btnDeactivate) btnDeactivate.disabled = !state.isActive;
        }

        // Función para agregar texto al simulador de terminal
        function writeToTerminal(promptSymbol, cmdText, outputText) {
            let lineHtml = '';
            if (promptSymbol) {
                const prefix = state.isActive ? '(venv) ' + state.currentDir + '>' : state.currentDir + '>';
                lineHtml += `<div class="terminal-line"><span class="terminal-prompt">${prefix}</span> <span class="terminal-cmd">${cmdText}</span></div>`;
            }
            if (outputText) {
                lineHtml += `<div class="terminal-line"><div class="terminal-output">${outputText}</div></div>`;
            }
            termBody.innerHTML += lineHtml;
            termBody.scrollTop = termBody.scrollHeight;
        }

        // Inicializar
        updateStatusPanel();
        writeToTerminal(false, '', 'Simulador de Entorno Virtual de Python v1.0.0\nEscribe o pulsa los botones de abajo para simular comandos.');

        // Acción: Crear Venv
        if (btnCreate) {
            btnCreate.addEventListener('click', () => {
                writeToTerminal(true, 'python -m venv venv', 'Creando entorno virtual en la carpeta .\\venv...\nCopiando archivos ejecutables y configurando pyvenv.cfg...\n¡Entorno creado exitosamente!');
                state.venvCreated = true;
                updateStatusPanel();
            });
        }

        // Acción: Activar Venv
        if (btnActivate) {
            btnActivate.addEventListener('click', () => {
                writeToTerminal(true, '.\\venv\\Scripts\\activate', 'Activando entorno virtual de este proyecto...\n(Nota el prefijo (venv) en el prompt de la terminal)');
                state.isActive = true;
                updateStatusPanel();
            });
        }

        // Acción: Instalar Django
        if (btnInstall) {
            btnInstall.addEventListener('click', () => {
                writeToTerminal(true, 'pip install django', 'Collecting django\n  Downloading Django-6.0.1-py3-none-any.whl (8.2 MB)\n     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 8.2/8.2 MB 12.4 MB/s\nCollecting asgiref>=3.7.2\n  Downloading asgiref-3.8.1-py3-none-any.whl (23 kB)\nCollecting sqlparse>=0.3.1\n  Downloading sqlparse-0.5.0-py3-none-any.whl (44 kB)\nInstalling collected packages: sqlparse, asgiref, django\nSuccessfully installed django-6.0.1 asgiref-3.8.1 sqlparse-0.5.0');
                state.djangoInstalled = true;
                state.venvPackages.push('django (6.0.1)', 'asgiref (3.8.1)', 'sqlparse (0.5.0)');
                updateStatusPanel();
            });
        }

        // Acción: Desactivar Venv
        if (btnDeactivate) {
            btnDeactivate.addEventListener('click', () => {
                writeToTerminal(true, 'deactivate', 'Desactivando entorno virtual. Retornando al entorno de Python global.');
                state.isActive = false;
                updateStatusPanel();
            });
        }

        // Acción: Listar Paquetes (pip list)
        if (btnList) {
            btnList.addEventListener('click', () => {
                let packages = state.isActive ? state.venvPackages : state.globalPackages;
                let output = 'Package    Version\n---------- -------\n';
                packages.forEach(p => {
                    const match = p.match(/(.+)\s\((.+)\)/);
                    if (match) {
                        const name = match[1].padEnd(10, ' ');
                        const version = match[2];
                        output += `${name} ${version}\n`;
                    }
                });
                writeToTerminal(true, 'pip list', output);
            });
        }

        // Acción: Limpiar Terminal
        if (btnClear) {
            btnClear.addEventListener('click', () => {
                termBody.innerHTML = '';
                writeToTerminal(false, '', 'Consola limpia. Listo para comandos.');
            });
        }
    }
});
