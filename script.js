// ==========================================================
// TROCAR: todos os dados do site ficam aqui.
// Para personalizar sem editar o arquivo, use parâmetros no link:
//   index.html?empresa=Padaria%20Bom%20Pao&cidade=Campinas&cor=c0392b&whats=5519999999999
// Parâmetros aceitos: empresa, cidade, slogan, cor (hex sem #), whats, tel, email, insta, endereco
// ==========================================================
const CONFIG = {
  empresa: 'Sua Empresa',
  cidade: 'Sua Cidade',
  slogan: 'Qualidade e confiança que fazem a diferença',
  cor: '1f4e79',                       // cor principal, em hexadecimal sem #
  telefone: '(00) 00000-0000',
  whatsapp: '5500000000000',           // 55 + DDD + número, só dígitos
  email: 'contato@suaempresa.com.br',
  instagram: 'suaempresa',             // sem o @
  endereco: 'Rua Exemplo, 123, Centro',
  horario: 'Segunda a sábado, das 8h às 18h',

  servicos: [
    { nome: 'Serviço 1', preco: 'R$ 99', foto: 'servico-a1', descricao: 'Descrição de um dos principais serviços: o que é feito e qual o benefício para o cliente.' },
    { nome: 'Serviço 2', preco: 'R$ 149', foto: 'servico-a2', descricao: 'Descrição de outro serviço, destacando qualidade, segurança e bom acabamento.' },
    { nome: 'Serviço 3', preco: 'R$ 199', foto: 'servico-a3', descricao: 'Descrição de um serviço especial, indicado para quem busca praticidade e economia.' },
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
const mapaParams = { empresa: 'empresa', cidade: 'cidade', slogan: 'slogan', cor: 'cor', whats: 'whatsapp', tel: 'telefone', email: 'email', insta: 'instagram', endereco: 'endereco' };
Object.entries(mapaParams).forEach(([param, chave]) => {
  const valor = params.get(param);
  if (valor) CONFIG[chave] = valor.trim();
});

// ----------------------------------------------------------
// Preenche textos, links e cor
// ----------------------------------------------------------
function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

document.querySelectorAll('[data-campo]').forEach((el) => {
  const valor = CONFIG[el.dataset.campo];
  if (valor) el.textContent = valor;
});

document.querySelectorAll('[data-inicial]').forEach((el) => {
  el.textContent = CONFIG.empresa.trim().charAt(0).toUpperCase();
});

document.title = `${CONFIG.empresa} | ${CONFIG.cidade}`;

const cor = CONFIG.cor.replace('#', '');
if (/^[0-9a-f]{6}$/i.test(cor)) document.documentElement.style.setProperty('--cor', `#${cor}`);

const msgWhats = encodeURIComponent(`Olá! Vim pelo site da ${CONFIG.empresa} e gostaria de um orçamento.`);
const links = {
  telefone: { href: `tel:+55${CONFIG.telefone.replace(/\D/g, '')}`, texto: CONFIG.telefone },
  email: { href: `mailto:${CONFIG.email}`, texto: CONFIG.email },
  whatsapp: { href: `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${msgWhats}`, externo: true },
  instagram: { href: `https://instagram.com/${CONFIG.instagram.replace('@', '')}`, externo: true },
  vendedor: { href: `https://wa.me/${CONFIG.vendedorWhatsapp}?text=${encodeURIComponent('Olá! Vi o site demonstrativo e quero um site com a identidade da minha loja.')}`, externo: true },
};
document.querySelectorAll('[data-link]').forEach((el) => {
  const link = links[el.dataset.link];
  el.href = link.href;
  if (link.texto) el.textContent = link.texto;
  if (link.externo) { el.target = '_blank'; el.rel = 'noopener'; }
});

// Mapa do Google pelo endereço e cidade (não precisa de chave)
document.getElementById('mapa').src = `https://www.google.com/maps?q=${encodeURIComponent(`${CONFIG.endereco}, ${CONFIG.cidade}`)}&output=embed`;

const estrelas = '<div class="estrelas" aria-label="5 estrelas">' + '<svg><use href="#i-estrela"/></svg>'.repeat(5) + '</div>';

document.getElementById('lista-servicos').innerHTML = CONFIG.servicos.map((s) => {
  const pedido = encodeURIComponent(`Olá! Vim pelo site da ${CONFIG.empresa} e quero um orçamento de: ${s.nome}.`);
  return `
  <article class="servico revelar">
    <div class="servico__img"><img src="https://picsum.photos/seed/${encodeURIComponent(s.foto || s.nome)}/640/400" width="640" height="400" loading="lazy" alt="${escapar(s.nome)}"></div>
    <div class="servico__corpo">
      <h3>${escapar(s.nome)}</h3>
      <p>${escapar(s.descricao)}</p>
      <div class="servico__rodape">
        ${s.preco ? `<span class="servico__preco">a partir de<strong>${escapar(s.preco)}</strong></span>` : '<span></span>'}
        <a class="servico__link" href="https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${pedido}" target="_blank" rel="noopener">Pedir orçamento →</a>
      </div>
    </div>
  </article>`;
}).join('');

document.getElementById('lista-depoimentos').innerHTML = CONFIG.depoimentos.map((d) => `
  <figure class="depoimento revelar">
    ${estrelas}
    <blockquote>“${escapar(d.texto)}”</blockquote>
    <figcaption>
      <span class="depoimento__avatar" aria-hidden="true">${escapar(d.nome.charAt(0))}</span>
      <div><strong>${escapar(d.nome)}</strong><span>${escapar(d.servico)}</span></div>
    </figcaption>
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
// Menu hambúrguer e cabeçalho
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

const header = document.querySelector('.header');
const marcarRolagem = () => header.classList.toggle('is-rolado', window.scrollY > 10);
window.addEventListener('scroll', marcarRolagem, { passive: true });
marcarRolagem();

// ----------------------------------------------------------
// Animações ao rolar: elementos aparecem e números contam
// ----------------------------------------------------------
function contar(el) {
  const alvo = Number(el.dataset.contar);
  const sufixo = el.dataset.sufixo || '+';
  const inicio = performance.now();
  const passo = (agora) => {
    const t = Math.min((agora - inicio) / 1400, 1);
    const valor = Math.round(alvo * (1 - Math.pow(1 - t, 3)));
    el.textContent = sufixo === '%' ? `${valor}%` : `+${valor}`;
    if (t < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const alvos = document.querySelectorAll('.revelar, [data-contar]');

if (semAnimacao || !('IntersectionObserver' in window)) {
  alvos.forEach((el) => {
    el.classList.add('is-visivel');
    if (el.dataset.contar) el.textContent = el.dataset.sufixo === '%' ? `${el.dataset.contar}%` : `+${el.dataset.contar}`;
  });
} else {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('is-visivel');
      if (entrada.target.dataset.contar) contar(entrada.target);
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.15 });
  alvos.forEach((el) => observador.observe(el));
}

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
// Validação e envio do formulário: abre o WhatsApp da empresa
// com o pedido já escrito.
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

  const dados = new FormData(form);
  const texto = [
    `Olá! Vim pelo site da ${CONFIG.empresa} e gostaria de um orçamento.`,
    '',
    `*Nome:* ${dados.get('nome')}`,
    `*Telefone:* ${dados.get('telefone')}`,
    `*Serviço:* ${dados.get('servico')}`,
    `*Mensagem:* ${dados.get('mensagem')}`,
  ].join('\n');
  window.open(`https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');

  form.reset();
  success.hidden = false;
});

// Ano atual no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();
