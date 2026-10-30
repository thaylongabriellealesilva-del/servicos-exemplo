// ==========================================================
// TROCAR: todos os dados do site ficam aqui.
// Para personalizar sem editar o arquivo, use parâmetros no link:
//   index.html?empresa=Padaria%20Bom%20Pao&cidade=Campinas&cor=c0392b&whats=5519999999999
// Parâmetros aceitos: empresa, cidade, slogan, cor (hex sem #), whats, tel, email
// ==========================================================
const CONFIG = {
  empresa: 'Sua Empresa',
  cidade: 'Sua Cidade',
  slogan: 'Qualidade, confiança e atendimento que faz a diferença',
  cor: '1f4e79',                       // cor principal, em hexadecimal sem #
  telefone: '(00) 00000-0000',
  whatsapp: '5500000000000',           // 55 + DDD + número, só dígitos
  email: 'contato@suaempresa.com.br',
  horario: 'Segunda a sábado, das 8h às 18h',

  servicos: [
    { nome: 'Serviço 1', icone: 'ferramenta', descricao: 'Descrição de um dos principais serviços: o que é feito e qual o benefício para o cliente.' },
    { nome: 'Serviço 2', icone: 'casa', descricao: 'Descrição de outro serviço, destacando qualidade, segurança e bom acabamento.' },
    { nome: 'Serviço 3', icone: 'estrela', descricao: 'Descrição de um serviço especial, indicado para quem busca praticidade e economia.' },
  ],

  depoimentos: [
    { nome: 'Ana S.', servico: 'Cliente desde 2021', texto: 'Atendimento rápido e serviço muito bem feito. Recomendo de olhos fechados.' },
    { nome: 'Carlos M.', servico: 'Cliente desde 2019', texto: 'Cumpriram o prazo e o resultado ficou excelente. Preço justo e equipe educada.' },
    { nome: 'Juliana R.', servico: 'Cliente desde 2023', texto: 'Tiraram todas as minhas dúvidas antes de começar. Com certeza voltarei a contratar.' },
  ],

  // Faixa de demonstração: dados de quem está vendendo o site (você)
  demo: true,
  vendedorNome: 'Thaylon Gabriel',
  vendedorWhatsapp: '5599981997260',
};

// ----------------------------------------------------------
// Aplica parâmetros do link sobre o CONFIG
// ----------------------------------------------------------
const params = new URLSearchParams(location.search);
const mapaParams = { empresa: 'empresa', cidade: 'cidade', slogan: 'slogan', cor: 'cor', whats: 'whatsapp', tel: 'telefone', email: 'email' };
Object.entries(mapaParams).forEach(([param, chave]) => {
  const valor = params.get(param);
  if (valor) CONFIG[chave] = valor.trim();
});

// ----------------------------------------------------------
// Preenche textos, links e cor
// ----------------------------------------------------------
const icones = {
  ferramenta: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  casa: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  estrela: '<path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z"/>',
};

function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

document.querySelectorAll('[data-campo]').forEach((el) => {
  const valor = CONFIG[el.dataset.campo];
  if (valor) el.textContent = valor;
});

document.title = `${CONFIG.empresa} | ${CONFIG.cidade}`;

const cor = CONFIG.cor.replace('#', '');
if (/^[0-9a-f]{6}$/i.test(cor)) document.documentElement.style.setProperty('--color-primary', `#${cor}`);

const msgWhats = encodeURIComponent(`Olá! Vim pelo site da ${CONFIG.empresa} e gostaria de um orçamento.`);
const links = {
  telefone: { href: `tel:+55${CONFIG.telefone.replace(/\D/g, '')}`, texto: CONFIG.telefone },
  email: { href: `mailto:${CONFIG.email}`, texto: CONFIG.email },
  whatsapp: { href: `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${msgWhats}` },
  vendedor: { href: `https://wa.me/${CONFIG.vendedorWhatsapp}?text=${encodeURIComponent('Olá! Vi o site demonstrativo e quero um site com a identidade da minha loja.')}` },
};
document.querySelectorAll('[data-link]').forEach((el) => {
  const link = links[el.dataset.link];
  el.href = link.href;
  if (link.texto) el.textContent = link.texto;
});

document.getElementById('lista-servicos').innerHTML = CONFIG.servicos.map((s) => `
  <article class="card">
    <div class="card__icon" aria-hidden="true"><svg viewBox="0 0 24 24">${icones[s.icone] || icones.estrela}</svg></div>
    <h3>${escapar(s.nome)}</h3>
    <p>${escapar(s.descricao)}</p>
  </article>`).join('');

document.getElementById('lista-depoimentos').innerHTML = CONFIG.depoimentos.map((d) => `
  <figure class="testimonial">
    <blockquote>“${escapar(d.texto)}”</blockquote>
    <figcaption><strong>${escapar(d.nome)}</strong><span>${escapar(d.servico)}</span></figcaption>
  </figure>`).join('');

const selectServico = document.getElementById('servico');
[...CONFIG.servicos.map((s) => s.nome), 'Outro'].forEach((nome) => selectServico.add(new Option(nome, nome)));

// ----------------------------------------------------------
// Faixa de demonstração
// ----------------------------------------------------------
const demoBar = document.getElementById('demo-bar');
if (CONFIG.demo) {
  document.body.classList.add('has-demo');
  // Reserva espaço no fim da página do tamanho da faixa (muda com a largura da tela)
  new ResizeObserver(() => {
    document.body.style.setProperty('--demo-h', `${demoBar.offsetHeight}px`);
  }).observe(demoBar);
  demoBar.querySelector('.demo-bar__close').addEventListener('click', () => {
    demoBar.hidden = true;
    document.body.classList.remove('has-demo');
  });
} else {
  demoBar.remove();
}

// ----------------------------------------------------------
// Menu hambúrguer
// ----------------------------------------------------------
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('menu');

function setMenu(open) {
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}

toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));

// Fecha o menu ao clicar num link (no celular)
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

// Fecha com a tecla Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

// ----------------------------------------------------------
// Máscara de telefone: (00) 00000-0000 ou (00) 0000-0000
// ----------------------------------------------------------
const telefone = document.getElementById('telefone');

telefone.addEventListener('input', () => {
  const d = telefone.value.replace(/\D/g, '').slice(0, 11);
  let v = d;
  if (d.length > 2) v = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 6) {
    const meio = d.length === 11 ? 7 : 6;
    v = `(${d.slice(0, 2)}) ${d.slice(2, meio)}-${d.slice(meio)}`;
  }
  telefone.value = v;
});

// ----------------------------------------------------------
// Validação e envio do formulário
// Sem backend: apenas mostra a mensagem de confirmação.
// TROCAR: para receber os pedidos de verdade, envie os dados
// para um serviço de formulários, e-mail ou API própria.
// ----------------------------------------------------------
const form = document.getElementById('form-orcamento');
const success = form.querySelector('.form__success');

const mensagens = {
  nome: 'Informe seu nome.',
  telefone: 'Informe um telefone válido, ex.: (00) 00000-0000.',
  servico: 'Selecione o serviço desejado.',
  mensagem: 'Escreva uma mensagem com pelo menos 10 caracteres.',
};

function validarCampo(campo) {
  const field = campo.closest('.field');
  const erro = field.querySelector('.field__error');
  const valido = campo.checkValidity();
  field.classList.toggle('has-error', !valido);
  campo.setAttribute('aria-invalid', String(!valido));
  erro.textContent = valido ? '' : mensagens[campo.name];
  return valido;
}

const campos = form.querySelectorAll('input, select, textarea');

campos.forEach((campo) => {
  campo.addEventListener('blur', () => validarCampo(campo));
  campo.addEventListener('input', () => {
    if (campo.closest('.field').classList.contains('has-error')) validarCampo(campo);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  success.hidden = true;

  let primeiroInvalido = null;
  campos.forEach((campo) => {
    if (!validarCampo(campo) && !primeiroInvalido) primeiroInvalido = campo;
  });

  if (primeiroInvalido) {
    primeiroInvalido.focus();
    return;
  }

  form.reset();
  success.hidden = false;
});

// Ano atual no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();
