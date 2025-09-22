import * as timer from "./modules/timer.js";
import * as i18n from "./modules/i18n.js";

const idiomaSalvo = localStorage.getItem("idioma") || "pt-br";
document.getElementById("lang").value = idiomaSalvo;
i18n.carregarIdioma(idiomaSalvo);

document.getElementById("lang").addEventListener("change", (e) => {
  const novoIdioma = e.target.value;
  localStorage.setItem("idioma", novoIdioma);
  location.reload();
});

timer.startBtn.addEventListener("click", timer.iniciarTimer);
timer.pauseBtn.addEventListener("click", timer.pausarTimer);
timer.resetBtn.addEventListener("click", timer.resetarTimer);
timer.clearBtn.addEventListener("click", timer.limparCampos);

timer.stopAlarmBtn.addEventListener("click", () => {
  timer.audioAlerta.pause();
  timer.audioAlerta.currentTime = 0;

  timer.stopAlarmBtn.style.display = "none";
  timer.startBtn.style.display = "inline-block";
  timer.pauseBtn.style.display = "inline-block";
  timer.resetBtn.style.display = "inline-block";
  timer.clearBtn.style.display = "inline-block";

  timer.atualizarDisplay();
});

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "inline-block"; 
});

installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("Usuário aceitou a instalação");
    } else {
      console.log("Usuário recusou a instalação");
    }
    deferredPrompt = null;
    installBtn.style.display = "none"; 
  }
});

window.addEventListener("appinstalled", () => {
  console.log("PWA instalado com sucesso!");
  installBtn.style.display = "none";
});

window.addEventListener("load", () => {
  timer.restaurarEstado();   
  timer.carregarSugestoes();  
});
