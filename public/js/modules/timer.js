import { traducoesAtuais } from "./i18n.js";

export const startBtn = document.getElementById("startBtn");
export const pauseBtn = document.getElementById("pauseBtn");
export const resetBtn = document.getElementById("resetBtn");
export const clearBtn = document.getElementById("clearBtn");
export const stopAlarmBtn = document.getElementById("stopAlarmBtn");
export const display = document.getElementById("display");

export const horasInput = document.getElementById("horas");
export const minutosInput = document.getElementById("minutos");
export const segundosInput = document.getElementById("segundos");
export const listaSugestoes = document.getElementById("lista-sugestoes");

export let tempoRestante = 0;
export let intervalo;
export let pausado = false;

export const audioAlerta = new Audio("audio/alarme.mp3");
audioAlerta.loop = true;

export function formatarTempo(segundos) {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

export function atualizarDisplay() {
  const tempoFormatado = formatarTempo(tempoRestante);
  display.textContent = tempoFormatado;
  document.title = tempoFormatado;
  display.style.color = "black";
}

export function salvarEstado(emAndamento) {
  localStorage.setItem("timer", JSON.stringify({
    tempoRestante,
    emAndamento,
    ultimoStart: Date.now()
  }));
}

export function restaurarEstado() {
  const salvo = JSON.parse(localStorage.getItem("timer"));
  if (!salvo) return;

  let { tempoRestante: salvoTempo, emAndamento, ultimoStart } = salvo;

  if (emAndamento) {
    const agora = Date.now();
    const decorrido = Math.floor((agora - ultimoStart) / 1000);
    salvoTempo -= decorrido;
  }

  tempoRestante = Math.max(salvoTempo, 0);
  atualizarDisplay();

  if (emAndamento && tempoRestante > 0) {
    iniciarContagem();
  }
}

export function salvarSugestao(segundos) {
  let sugestoes = JSON.parse(localStorage.getItem("sugestoes")) || [];
  sugestoes.unshift(segundos);
  sugestoes = [...new Set(sugestoes)];
  sugestoes = sugestoes.slice(0, 3);
  localStorage.setItem("sugestoes", JSON.stringify(sugestoes));
  carregarSugestoes();
}

export function carregarSugestoes() {
  listaSugestoes.innerHTML = "";
  const sugestoes = JSON.parse(localStorage.getItem("sugestoes")) || [];
  sugestoes.forEach(seg => {
    const li = document.createElement("li");
    li.textContent = formatarTempo(seg);
    li.title = "Clique para usar este timer";
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      horasInput.value = Math.floor(seg / 3600);
      minutosInput.value = Math.floor((seg % 3600) / 60);
      segundosInput.value = seg % 60;
    });
    listaSugestoes.appendChild(li);
  });
}

export function tempoAcabou() {
  audioAlerta.play();
  display.style.color = "red";
  display.textContent = traducoesAtuais["time_up"];

  startBtn.style.display = "none";
  pauseBtn.style.display = "none";
  resetBtn.style.display = "none";
  clearBtn.style.display = "none";

  stopAlarmBtn.style.display = "inline-block";
}

export function iniciarTimer() {
  if (intervalo) clearInterval(intervalo);

  tempoRestante = 
    parseInt(horasInput.value) * 3600 +
    parseInt(minutosInput.value) * 60 +
    parseInt(segundosInput.value);

  if (tempoRestante <= 0) return;

  pausado = false;
  pauseBtn.textContent = traducoesAtuais["btn_pause"] || "Pausar";
  pauseBtn.classList.remove("ativo");

  atualizarDisplay();
  salvarEstado(true);
  salvarSugestao(tempoRestante);
  iniciarContagem();
}

export function pausarTimer() {
  if (tempoRestante <= 0) return;

  if (!pausado) {
    clearInterval(intervalo);
    salvarEstado(false);
    pausado = true;
    pauseBtn.textContent = traducoesAtuais["btn_resume"] || "Retomar";
    pauseBtn.classList.add("ativo");
  } else {
    iniciarContagem();
    pausado = false;
    pauseBtn.textContent = traducoesAtuais["btn_pause"] || "Pausar";
    pauseBtn.classList.remove("ativo");
  }
}

export function iniciarContagem() {
  if (tempoRestante <= 0) return;

  clearInterval(intervalo);
  intervalo = setInterval(() => {
    if (tempoRestante <= 0) {
      clearInterval(intervalo);
      salvarEstado(false);
      tempoAcabou();
      return;
    }

    tempoRestante--;
    atualizarDisplay();
    salvarEstado(true);
  }, 1000);
}

export function resetarTimer() {
  clearInterval(intervalo);
  tempoRestante = 0;
  atualizarDisplay();
  localStorage.removeItem("timer");

  audioAlerta.pause();
  audioAlerta.currentTime = 0;

  pausado = false;
  pauseBtn.textContent = traducoesAtuais["btn_pause"] || "Pausar";
  pauseBtn.classList.remove("ativo");
}

export function limparCampos() {
  resetarTimer();
  horasInput.value = 0;
  minutosInput.value = 0;
  segundosInput.value = 0;
}
