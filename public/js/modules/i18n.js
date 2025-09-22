export let traducoesAtuais = {};

export async function carregarIdioma(lang) {
  const resposta = await fetch(`/lang/${lang}.json`);
  traducoesAtuais = await resposta.json();

  document.querySelectorAll("body *").forEach(el => {
    if (el.childNodes.length === 1 && el.innerHTML.includes("{{")) {
      const chave = el.innerHTML.replace(/[{}]/g, "").trim();
      if (traducoesAtuais[chave]) el.innerHTML = traducoesAtuais[chave];
    }
  });

  document.querySelectorAll("[title], [placeholder], [value]").forEach(el => {
    ["title", "placeholder", "value"].forEach(attr => {
      const valor = el.getAttribute(attr);
      if (valor && valor.includes("{{")) {
        const chave = valor.replace(/[{}]/g, "").trim();
        if (traducoesAtuais[chave]) el.setAttribute(attr, traducoesAtuais[chave]);
      }
    });
  });

  document.body.style.opacity = 1;
  localStorage.setItem("idioma", lang);
}
