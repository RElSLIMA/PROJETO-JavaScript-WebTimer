# ⏱️ PROJETO-JavaScript-WebTimer  

Aplicação **Web Timer Regressivo** desenvolvida em **JavaScript** como estudo e prática de manipulação da **DOM**, uso de **módulos ES6**, conceitos de **PWA (Progressive Web App)** e integração com **Node.js** para modularização e organização do código.  

Este projeto tem como principal objetivo servir como **portfólio** e **referência prática** de boas práticas de desenvolvimento front-end moderno.  

---

## 🚀 Funcionalidades  

- Definir tempo em **horas, minutos e segundos**  
- Controles de **iniciar, pausar, resetar e limpar campos**  
- Sugestões de últimos timers usados  
- **Tradução dinâmica (i18n)** com suporte a múltiplos idiomas  
- **Alarme sonoro** quando o tempo termina, com botão para parar  
- **PWA**: pode ser instalado no dispositivo e usado **offline**  
- **Botão de instalação** no app (padrão PWA)  
- **Layout responsivo** e interface amigável  

---

## 🛠️ Tecnologias Utilizadas  

- **HTML5** – Estrutura semântica  
- **CSS3** – Estilização responsiva e usabilidade  
- **JavaScript (ES6+)** – Lógica principal e modularização  
- **Node.js** – Organização do projeto com módulos ES e ambiente de desenvolvimento  
- **Service Worker** – Cache offline para funcionamento como PWA  
- **Manifest.json** – Configuração da instalação no dispositivo  
- **Git/GitHub** – Versionamento e hospedagem  

---

## 📂 Estrutura do Projeto  

```bash
PROJETO-JavaScript-WebTimer/
├── node_modules/
├── public/
│   ├── audio/
│   │   └── alarme.mp3
│   ├── css/
│   │   └── style.css
│   ├── icons/
│   │   └── timer.png
│   ├── img/
│   │   └── favicon.png
│   ├── js/
│   │   ├── main.js
│   │   └── modules/
│   │       ├── i18n.js
│   │       └── timer.js
│   ├── lang/
│   │   ├── en-us.json
│   │   └── pt-br.json
│   ├── index.html
│   └── manifest.json
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── server.js
└── sw.js
```

---

## ⚡ Como Executar  

### 🔹 Localmente com Node.js  

1. Clone o repositório:  
   ```bash
   git clone https://github.com/SEU_USUARIO/PROJETO-JavaScript-WebTimer.git
   cd PROJETO-JavaScript-WebTimer
   ```

2. Suba um servidor local simples (exemplo usando o `http-server`):  
   ```bash
   npm install -g http-server
   http-server .
   ```
   > Acesse em: [http://localhost:8000](http://localhost:8000)  

3. > Acesse em: [projeto-javascript-webtimer.netlify.app](projeto-javascript-webtimer.netlify.app)  

---

## 📱 PWA – Instalação  

- Abra o projeto em um navegador moderno (**Chrome, Edge, Firefox**)  
- Clique no botão **📥 Instalar** no canto superior direito, ou use a opção *"Instalar"* do navegador  
- Use o app **offline** diretamente no seu desktop ou celular  

---

## 🎯 Objetivo do Projeto  

Este projeto foi desenvolvido com o objetivo de:  
- Consolidar conhecimentos em **JavaScript moderno (ES6)**  
- Aprender **modularização com Node.js**  
- Aplicar conceitos de **Progressive Web App (PWA)**  
- Criar um projeto real para compor o **portfólio profissional**  

---

## ✨ Autor  

**Gabriel Reis Lima de Carvalho**  
- [LinkedIn](https://www.linkedin.com/in/gabriel-reis-b8b152198/)  
