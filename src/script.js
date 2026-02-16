// Converter string "MM:SS" para segundos
function stringParaSegundos(tempoString) {
    const [minutos, segundos] = tempoString.split(':').map(Number);
    return minutos * 60 + segundos;
}

// Converter segundos para string "MM:SS"
function segundosParaString(totalSegundos) {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Variáveis do timer
let tempoRemainingEmSegundos = 25 * 60; // 25 minutos
let intervalo = null;
let estaRodando = false;

const elementoTimer = document.querySelector('#time');
const containerTimer = document.querySelector('.temporizador');
const botoesControle = containerTimer.querySelectorAll('button');

// Inicializar timer
function atualizarDisplay() {
    elementoTimer.textContent = segundosParaString(tempoRemainingEmSegundos);
}

// Start
botoesControle[0].addEventListener('click', () => {
    if (!estaRodando) {
        estaRodando = true;
        botoesControle[0].disabled = true;
        intervalo = setInterval(() => {
            if (tempoRemainingEmSegundos > 0) {
                tempoRemainingEmSegundos--;
                atualizarDisplay();
            } else {
                clearInterval(intervalo);
                estaRodando = false;
                botoesControle[0].disabled = false;
                alert('Tempo finalizado!');
            }
        }, 1000);
    }
});

// Pause
botoesControle[1].addEventListener('click', () => {
    clearInterval(intervalo);
    estaRodando = false;
    botoesControle[0].disabled = false;
});

// Reset
botoesControle[2].addEventListener('click', () => {
    clearInterval(intervalo);
    estaRodando = false;
    botoesControle[0].disabled = false;
    tempoRemainingEmSegundos = 25 * 60;
    atualizarDisplay();
});

atualizarDisplay();