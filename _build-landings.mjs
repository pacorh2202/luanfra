/**
 * Reescribe las 4 landings con la misma piel visual que la home.
 * Contenido SEO / formularios se preservan.
 */
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(fileURLToPath(import.meta.url));

const head = (o) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${o.title}</title>
<meta name="description" content="${o.description}">
<link rel="canonical" href="${o.canonical}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#08090B">
<meta name="geo.region" content="ES-MC">
<meta name="geo.placename" content="Molina de Segura">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Talleres Luanfra S.L.">
<meta property="og:title" content="${o.ogTitle}">
<meta property="og:description" content="${o.ogDescription}">
<meta property="og:url" content="${o.canonical}">
<meta property="og:image" content="https://www.luanfra.com/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://www.luanfra.com/og-image.jpg">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
${o.schema || ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/landings.css">
</head>
<body>
`;

const nav = (ctaHref, ctaLabel) => `
<nav class="nav nav-negro" id="nav">
  <div class="wrap nav-in">
    <a class="marca" href="/" aria-label="Talleres Luanfra — inicio">
      <i class="marca-logo" aria-hidden="true"></i>
      <span class="marca-txt"><i class="sup">Talleres</i>LUANFRA<small>MECANIZADOS · 1973</small></span>
    </a>
    <div class="menu" id="menu">
      <a href="/">Inicio</a>
      <a href="/mecanizado-murcia/">Mecanizado Murcia</a>
      <a href="/engranajes/">Engranajes</a>
      <a href="/pinones/">Piñones</a>
      <a href="/mecanizado-gran-formato/">Gran formato</a>
      <a href="/#contacto">Contacto</a>
    </div>
    <div class="nav-acc">
      <a class="tel" href="tel:+34968389401">968 38 94 01</a>
      <a class="btn btn-acc btn-sm" href="${ctaHref}">${ctaLabel}</a>
      <button class="burger" id="burger" aria-label="Menú" aria-expanded="false" aria-controls="menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
`;

const hero = (o) => `
<header class="hero hero-page tema t-negro" id="top" data-tema="negro">
  <div class="hero-maquina" aria-hidden="true">
    <picture>
      <source srcset="${o.heroWebp}" type="image/webp">
      <img src="${o.heroJpg}" alt="" width="2000" height="1267" fetchpriority="high" decoding="async">
    </picture>
  </div>
  <div class="wrap hero-in">
    <span class="marca-sec">${o.eyebrow}</span>
    <h1 class="h-xl">${o.h1}</h1>
    <p class="cuerpo">${o.lead}</p>
    <div class="hero-ctas">
      <a class="btn btn-acc" href="${o.ctaHref}">${o.ctaLabel}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <a class="btn btn-linea" href="tel:+34968389401">Llamar 968 38 94 01</a>
    </div>
  </div>
</header>
`;

const footer = `
<footer class="tema t-negro">
  <div class="wrap">
    <div class="pie">
      <a class="marca" href="/" style="--nav-acc:#E2231A;--nav-inv:#08090B;--nav-sec:#8A9099">
        <i class="marca-logo" aria-hidden="true"></i>
        <span class="marca-txt" style="font-size:1.15rem"><i class="sup">Talleres</i>LUANFRA<small>MECANIZADOS · 1973</small></span>
      </a>
      <nav class="pie-nav" aria-label="Pie de página">
        <a href="/">Inicio</a>
        <a href="/mecanizado-murcia/">Mecanizado Murcia</a>
        <a href="/engranajes/">Engranajes</a>
        <a href="/pinones/">Piñones</a>
        <a href="/mecanizado-gran-formato/">Gran formato</a>
        <a href="/#contacto">Contacto</a>
      </nav>
    </div>
    <div class="legal">
      <span>© <span id="anio">2026</span> TALLERES LUANFRA S.L. · CIF B30029995</span>
      <span>MOLINA DE SEGURA · MURCIA · ESPAÑA · L–V 7:00–15:30</span>
    </div>
  </div>
</footer>
`;

const boot = `
<script>
(function(){
  var nav=document.getElementById('nav');
  var burger=document.getElementById('burger');
  var menu=document.getElementById('menu');
  var y=document.getElementById('anio');
  if(y) y.textContent=new Date().getFullYear();
  if(burger&&menu){
    burger.addEventListener('click',function(){
      var ab=menu.classList.toggle('abierto');
      burger.classList.toggle('x',ab);
      burger.setAttribute('aria-expanded',String(ab));
      document.body.style.overflow=ab?'hidden':'';
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        menu.classList.remove('abierto');burger.classList.remove('x');
        burger.setAttribute('aria-expanded','false');document.body.style.overflow='';
      });
    });
  }
  window.addEventListener('scroll',function(){
    if(nav) nav.classList.toggle('fija', window.scrollY>30);
  },{passive:true});
})();
</script>
`;

function page(o) {
  return head(o) + nav(o.ctaHref, o.ctaNav) + hero(o) + o.body + footer + boot + (o.script || '') + '\n</body>\n</html>\n';
}

/* ========== PIÑONES ========== */
writeFileSync(join(root, 'pinones/index.html'), page({
  title: 'Piñones especiales y de cadena en Murcia | Talleres Luanfra',
  description: 'Fabricación de piñones de cadena, charnela y especiales bajo plano o muestra. Paso, dientes, buje y tratamientos. Talleres Luanfra, Molina de Segura (Murcia).',
  canonical: 'https://www.luanfra.com/pinones/',
  ogTitle: 'Piñones especiales y de cadena en Murcia',
  ogDescription: 'Piñones de cadena y especiales bajo plano o muestra. Indica paso, dientes, buje y material para presupuesto.',
  schema: `<script type="application/ld+json">{"@context":"https://schema.org","@type":["Service","ProfessionalService"],"name":"Piñones especiales y de cadena","description":"Fabricación de piñones de cadena, charnela y especiales bajo plano o muestra en Molina de Segura (Murcia).","provider":{"@type":"LocalBusiness","name":"Talleres Luanfra S.L.","url":"https://www.luanfra.com/","telephone":"+34968389401","email":"operaciones@luanfra.com","address":{"@type":"PostalAddress","streetAddress":"Calle Cañada Morcillo, s/n · Pol. Ind. El Tapiado","addressLocality":"Molina de Segura","addressRegion":"Murcia","postalCode":"30500","addressCountry":"ES"},"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"07:00","closes":"15:30"}},"areaServed":"ES-MC","url":"https://www.luanfra.com/pinones/"}</script>`,
  eyebrow: '[01] — Piñones · Molina de Segura',
  h1: 'Piñones especiales<br>y de cadena<br><span class="perfil">en Murcia</span>',
  lead: 'Fabricamos <strong>piñones de cadena, charnela y especiales</strong> bajo plano, muestra o especificaciones. Indica paso, nº de dientes, buje y material: te respondemos en horario laboral (7:00–15:30).',
  heroWebp: '/img/pieza-macro.webp',
  heroJpg: '/img/pieza-macro.jpg',
  ctaHref: '#presupuesto-pinon',
  ctaLabel: 'Enviar especificaciones',
  ctaNav: 'Presupuesto',
  body: `
<section class="tema t-blanco sec" data-tema="blanco">
  <div class="wrap prosa">
    <h2>Qué fabricamos</h2>
    <p>En <strong>Talleres Luanfra</strong> (Pol. El Tapiado, Molina de Segura) el foco de esta página es el <strong>piñón</strong>: transmisión por cadena o aplicación especial. Si buscas <strong>engranajes de módulo</strong> (recto/helicoidal, interior/exterior), ve a <a href="/engranajes/">engranajes a medida</a>.</p>
    <div class="cards">
      <div class="card-l"><h3>Piñones de cadena</h3><p>Paso normalizado o especial; nº de dientes y anchura según aplicación.</p></div>
      <div class="card-l"><h3>Charnela y especiales</h3><p>Geometrías fuera de estándar, bajo muestra o croquis.</p></div>
      <div class="card-l"><h3>Buje, chavetero, tratamientos</h3><p>Acabado de cubo, fijaciones y tratamientos cuando el plano lo pide.</p></div>
      <div class="card-l"><h3>Tallado propio</h3><p>Talladoras Fellow / fresa madre hasta módulo M-10 en piezas afines.</p></div>
    </div>
    <h2>Datos útiles para presupuesto</h2>
    <table class="tech" aria-label="Especificaciones orientativas para piñones">
      <thead><tr><th>Dato</th><th>Qué necesitamos</th></tr></thead>
      <tbody>
        <tr><td>Tipo</td><td>Cadena / charnela / especial / otro</td></tr>
        <tr><td>Paso de cadena</td><td>Norma o paso; nº de hileras si aplica</td></tr>
        <tr><td>Dientes</td><td>Número de dientes (Z)</td></tr>
        <tr><td>Diámetros</td><td>Ø exterior e interior; ancho de diente / corona</td></tr>
        <tr><td>Buje / eje</td><td>Ø buje, chavetero, agujero, longitud de cubo</td></tr>
        <tr><td>Material</td><td>Acero, temple, inox u otro según plano</td></tr>
        <tr><td>Cantidad y plazo</td><td>Ud. o serie; urgencia orientativa</td></tr>
        <tr><td>Adjunto</td><td>Plano PDF/STEP, croquis o foto (opcional)</td></tr>
      </tbody>
    </table>
    <p class="nota-tech">Los rangos exactos dependen de la pieza y del utillaje. No prometemos cotas máximas solo por el recorrido de máquina: consultad cada caso.</p>
  </div>
</section>
<section class="tema t-negro sec" id="presupuesto-pinon" data-tema="negro">
  <div class="wrap">
    <span class="marca-sec">Presupuesto</span>
    <h2 class="h-l" style="margin-bottom:12px">Solicitud guiada — piñón</h2>
    <p class="cuerpo" style="margin-bottom:8px">Rellena lo que sepas. Se abre tu correo a <strong>operaciones@luanfra.com</strong> con el texto preparado.</p>
    <div class="form form-box">
      <form id="form-pinon" novalidate>
        <div class="form-grid">
          <div><label for="p-emp">Empresa / nombre</label><input id="p-emp" name="empresa" type="text" required autocomplete="organization"></div>
          <div><label for="p-mail">Email</label><input id="p-mail" name="email" type="email" required autocomplete="email"></div>
          <div><label for="p-tel">Teléfono (opcional)</label><input id="p-tel" name="telefono" type="tel" autocomplete="tel"></div>
          <div><label for="p-tipo">Tipo de piñón</label>
            <select id="p-tipo" name="tipo">
              <option value="Cadena">Cadena</option>
              <option value="Charnela">Charnela</option>
              <option value="Especial">Especial</option>
              <option value="Otro / no seguro">Otro / no seguro</option>
            </select>
          </div>
          <div><label for="p-paso">Paso / norma de cadena</label><input id="p-paso" name="paso" type="text" placeholder="Ej. 12,7 mm · ISO · ANSI"></div>
          <div><label for="p-dientes">Nº de dientes (Z)</label><input id="p-dientes" name="dientes" type="text" inputmode="numeric" placeholder="Ej. 17"></div>
          <div><label for="p-dext">Ø exterior (si se conoce)</label><input id="p-dext" name="dext" type="text" placeholder="mm"></div>
          <div><label for="p-dint">Ø interior / buje</label><input id="p-dint" name="dint" type="text" placeholder="mm"></div>
          <div><label for="p-ancho">Ancho / corona</label><input id="p-ancho" name="ancho" type="text" placeholder="mm"></div>
          <div><label for="p-mat">Material</label><input id="p-mat" name="material" type="text" placeholder="Ej. C45, 42CrMo4…"></div>
          <div><label for="p-cant">Cantidad</label><input id="p-cant" name="cantidad" type="text" placeholder="Ud. o serie"></div>
          <div><label for="p-plazo">Plazo orientativo</label><input id="p-plazo" name="plazo" type="text" placeholder="Ej. 2 semanas"></div>
          <div class="full"><label for="p-buje">Buje / chavetero / observaciones</label><textarea id="p-buje" name="obs" placeholder="Chavetero, tratamientos, aplicación, si tenéis muestra…"></textarea></div>
        </div>
        <p class="nota">Tras enviar, adjunta el plano o la foto en el mismo correo si lo tienes. Horario: lunes–viernes 7:00–15:30.</p>
        <div class="btns">
          <button class="btn btn-acc" type="submit">Enviar especificaciones</button>
          <a class="btn btn-linea" href="tel:+34968389401">968 38 94 01</a>
        </div>
      </form>
    </div>
  </div>
</section>
<section class="tema t-blanco sec" data-tema="blanco">
  <div class="wrap prosa faq">
    <h2>Preguntas frecuentes</h2>
    <details><summary>¿Trabajáis solo con plano?</summary><p>No. Aceptamos plano, muestra, croquis o fotografía. Cuantos más datos (paso, Z, buje), más rápido el presupuesto.</p></details>
    <details><summary>¿Hacéis series o solo unidad?</summary><p>Ambos: prototipo, reposición y series cortas/medias según capacidad de taller.</p></details>
    <details><summary>¿También fabricáis engranajes de módulo?</summary><p>Sí: <a href="/engranajes/">página de engranajes</a> (módulo, dentado, tolerancia).</p></details>
    <details><summary>¿Dónde está el taller?</summary><p>Polígono El Tapiado, Molina de Segura (Murcia). Tel. 968 38 94 01 · operaciones@luanfra.com</p></details>
  </div>
</section>
`,
  script: `<script>
document.getElementById('form-pinon').addEventListener('submit',function(e){
  e.preventDefault();
  var g=function(id){return (document.getElementById(id).value||'').trim();};
  if(!g('p-emp')||!g('p-mail')){alert('Indica empresa y email.');return;}
  var body=['Solicitud presupuesto PIÑÓN — web luanfra.com/pinones/','','Empresa: '+g('p-emp'),'Email: '+g('p-mail'),'Teléfono: '+(g('p-tel')||'—'),'','Tipo: '+g('p-tipo'),'Paso / norma: '+(g('p-paso')||'—'),'Dientes (Z): '+(g('p-dientes')||'—'),'Ø exterior: '+(g('p-dext')||'—'),'Ø interior / buje: '+(g('p-dint')||'—'),'Ancho / corona: '+(g('p-ancho')||'—'),'Material: '+(g('p-mat')||'—'),'Cantidad: '+(g('p-cant')||'—'),'Plazo: '+(g('p-plazo')||'—'),'','Buje / observaciones:',g('p-buje')||'—','','(Adjuntar plano, croquis o foto en este correo si se dispone.)'].join('\\n');
  window.location.href='mailto:operaciones@luanfra.com?subject='+encodeURIComponent('Presupuesto piñón — '+g('p-emp'))+'&body='+encodeURIComponent(body);
});
</script>`
}));

/* ========== ENGRANAJES ========== */
writeFileSync(join(root, 'engranajes/index.html'), page({
  title: 'Engranajes a medida en Murcia | Talleres Luanfra',
  description: 'Engranajes de módulo rectos y helicoidales, dentado interior y exterior, bajo plano. Módulo, material y tolerancia. Talleres Luanfra, Molina de Segura.',
  canonical: 'https://www.luanfra.com/engranajes/',
  ogTitle: 'Engranajes a medida en Murcia',
  ogDescription: 'Engranajes de módulo, dentado interior/exterior y control dimensional. Bajo plano o muestra.',
  schema: `<script type="application/ld+json">{"@context":"https://schema.org","@type":["Service","ProfessionalService"],"name":"Engranajes a medida","description":"Fabricación de engranajes de módulo rectos y helicoidales, dentado interior y exterior, bajo plano en Molina de Segura (Murcia).","provider":{"@type":"LocalBusiness","name":"Talleres Luanfra S.L.","url":"https://www.luanfra.com/","telephone":"+34968389401","email":"operaciones@luanfra.com","address":{"@type":"PostalAddress","streetAddress":"Calle Cañada Morcillo, s/n · Pol. Ind. El Tapiado","addressLocality":"Molina de Segura","addressRegion":"Murcia","postalCode":"30500","addressCountry":"ES"},"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"07:00","closes":"15:30"}},"areaServed":"ES-MC","url":"https://www.luanfra.com/engranajes/"}</script>`,
  eyebrow: '[02] — Engranajes de módulo · Molina de Segura',
  h1: 'Engranajes<br>a medida<br><span class="perfil">en Murcia</span>',
  lead: 'Fabricamos <strong>engranajes de módulo</strong> rectos y helicoidales, con dentado interior o exterior, bajo plano o muestra. Orientamos el presupuesto con módulo, geometría, material y tolerancia.',
  heroWebp: '/img/pieza-bn.webp',
  heroJpg: '/img/pieza-bn.jpg',
  ctaHref: '#presupuesto-engranaje',
  ctaLabel: 'Enviar especificaciones',
  ctaNav: 'Presupuesto',
  body: `
<section class="tema t-blanco sec" data-tema="blanco">
  <div class="wrap prosa">
    <h2>Engranajes industriales</h2>
    <p>En <strong>Talleres Luanfra</strong> tallamos y mecanizamos <strong>engranajes de módulo</strong> para maquinaria industrial. Si lo que necesitas es un <strong>piñón de cadena o especial</strong> (paso, Z, buje), usa <a href="/pinones/">piñones especiales</a>.</p>
    <div class="cards">
      <div class="card-l"><h3>Rectos y helicoidales</h3><p>Geometría según plano; dentado exterior o interior.</p></div>
      <div class="card-l"><h3>Módulo y dentado</h3><p>Tallado propio con sistema Fellow / fresa madre hasta <strong>módulo M-10</strong>.</p></div>
      <div class="card-l"><h3>Cremalleras y coronas</h3><p>Transmisión lineal y grandes relaciones cuando el conjunto lo requiere.</p></div>
      <div class="card-l"><h3>Control dimensional</h3><p>Verificación en CMM Mitutoyo y oficina técnica CAMWorks.</p></div>
    </div>
    <h2>Qué pedir en el plano</h2>
    <table class="tech" aria-label="Especificaciones orientativas para engranajes">
      <thead><tr><th>Parámetro</th><th>Información útil</th></tr></thead>
      <tbody>
        <tr><td>Tipo de dentado</td><td>Recto / helicoidal; interior / exterior</td></tr>
        <tr><td>Módulo</td><td>Módulo (y ángulo de hélice si helicoidal)</td></tr>
        <tr><td>Dientes / Ø</td><td>Z, diámetro primitivo / exterior si se conoce</td></tr>
        <tr><td>Ancho de diente</td><td>Cara útil y longitud total de pieza</td></tr>
        <tr><td>Material</td><td>Acero, temple, nitrurado, etc.</td></tr>
        <tr><td>Tolerancia / calidad</td><td>Calidad de dentado o cotas críticas</td></tr>
        <tr><td>Cantidad</td><td>Unidad, recambio o serie</td></tr>
        <tr><td>Documentación</td><td>PDF, STEP o muestra; plazos orientativos</td></tr>
      </tbody>
    </table>
    <p class="nota-tech">Capacidad de tallado publicada hasta M-10; cada pieza se valida en taller.</p>
  </div>
</section>
<section class="tema t-negro sec" id="presupuesto-engranaje" data-tema="negro">
  <div class="wrap">
    <span class="marca-sec">Presupuesto</span>
    <h2 class="h-l" style="margin-bottom:12px">Solicitud — engranaje</h2>
    <p class="cuerpo" style="margin-bottom:8px">Completa lo conocido. Se prepara un correo a <strong>operaciones@luanfra.com</strong>.</p>
    <div class="form form-box">
      <form id="form-eng" novalidate>
        <div class="form-grid">
          <div><label for="e-emp">Empresa / nombre</label><input id="e-emp" name="empresa" type="text" required autocomplete="organization"></div>
          <div><label for="e-mail">Email</label><input id="e-mail" name="email" type="email" required autocomplete="email"></div>
          <div><label for="e-tel">Teléfono (opcional)</label><input id="e-tel" name="telefono" type="tel" autocomplete="tel"></div>
          <div><label for="e-tipo">Tipo de dentado</label>
            <select id="e-tipo" name="tipo">
              <option value="Recto exterior">Recto exterior</option>
              <option value="Helicoidal exterior">Helicoidal exterior</option>
              <option value="Interior">Interior</option>
              <option value="Cremallera / corona">Cremallera / corona</option>
              <option value="No seguro">No seguro</option>
            </select>
          </div>
          <div><label for="e-mod">Módulo</label><input id="e-mod" name="modulo" type="text" placeholder="Ej. M4 · M6"></div>
          <div><label for="e-z">Nº de dientes (Z)</label><input id="e-z" name="dientes" type="text" inputmode="numeric"></div>
          <div><label for="e-mat">Material</label><input id="e-mat" name="material" type="text" placeholder="Según plano"></div>
          <div><label for="e-tol">Tolerancia / calidad</label><input id="e-tol" name="tol" type="text" placeholder="Si figura en plano"></div>
          <div><label for="e-cant">Cantidad</label><input id="e-cant" name="cantidad" type="text"></div>
          <div><label for="e-plazo">Plazo orientativo</label><input id="e-plazo" name="plazo" type="text"></div>
          <div class="full"><label for="e-obs">Observaciones / aplicación</label><textarea id="e-obs" name="obs" placeholder="Hélice, tratamiento, máquina de destino…"></textarea></div>
        </div>
        <p class="nota">Horario de respuesta: lunes–viernes 7:00–15:30 · 968 38 94 01</p>
        <div class="btns">
          <button class="btn btn-acc" type="submit">Enviar especificaciones</button>
          <a class="btn btn-linea" href="/pinones/">¿Es un piñón de cadena?</a>
        </div>
      </form>
    </div>
  </div>
</section>
<section class="tema t-blanco sec" data-tema="blanco">
  <div class="wrap prosa faq">
    <h2>Preguntas frecuentes</h2>
    <details><summary>¿Fabricáis engranajes helicoidales?</summary><p>Sí, rectos y helicoidales según plano, con dentado interior o exterior.</p></details>
    <details><summary>¿Hasta qué módulo?</summary><p>Tallado propio orientativo hasta módulo M-10 (Fellow / fresa madre). Confirmamos cada pieza.</p></details>
    <details><summary>¿Cómo controláis la calidad?</summary><p>Verificación dimensional con CMM Mitutoyo y soporte de oficina técnica.</p></details>
    <details><summary>¿Y los piñones de cadena?</summary><p>Esa intención está en <a href="/pinones/">/pinones/</a> (paso, dientes, buje).</p></details>
  </div>
</section>
`,
  script: `<script>
document.getElementById('form-eng').addEventListener('submit',function(e){
  e.preventDefault();
  var g=function(id){return (document.getElementById(id).value||'').trim();};
  if(!g('e-emp')||!g('e-mail')){alert('Indica empresa y email.');return;}
  var body=['Solicitud presupuesto ENGRANAJE — web luanfra.com/engranajes/','','Empresa: '+g('e-emp'),'Email: '+g('e-mail'),'Teléfono: '+(g('e-tel')||'—'),'','Tipo dentado: '+g('e-tipo'),'Módulo: '+(g('e-mod')||'—'),'Dientes (Z): '+(g('e-z')||'—'),'Material: '+(g('e-mat')||'—'),'Tolerancia / calidad: '+(g('e-tol')||'—'),'Cantidad: '+(g('e-cant')||'—'),'Plazo: '+(g('e-plazo')||'—'),'','Observaciones:',g('e-obs')||'—','','(Adjuntar plano PDF/STEP si se dispone.)'].join('\\n');
  window.location.href='mailto:operaciones@luanfra.com?subject='+encodeURIComponent('Presupuesto engranaje — '+g('e-emp'))+'&body='+encodeURIComponent(body);
});
</script>`
}));

/* ========== GRAN FORMATO ========== */
writeFileSync(join(root, 'mecanizado-gran-formato/index.html'), page({
  title: 'Mecanizado gran formato Murcia | Talleres Luanfra',
  description: 'Fresado de gran formato en Murcia: columna móvil hasta X 10.000 mm, soldadura y control dimensional. Piezas grandes bajo plano. Talleres Luanfra, Molina de Segura.',
  canonical: 'https://www.luanfra.com/mecanizado-gran-formato/',
  ogTitle: 'Mecanizado de gran formato en Murcia',
  ogDescription: 'Piezas grandes: Soraluce hasta X 10.000 mm, soldadura propia y CMM. Solicita presupuesto con envolvente y peso.',
  schema: `<script type="application/ld+json">{"@context":"https://schema.org","@type":["Service","ProfessionalService"],"name":"Mecanizado de gran formato","description":"Fresado de gran formato y piezas grandes en Molina de Segura (Murcia). Columna móvil, soldadura y control dimensional.","provider":{"@type":"LocalBusiness","name":"Talleres Luanfra S.L.","url":"https://www.luanfra.com/","telephone":"+34968389401","email":"operaciones@luanfra.com","address":{"@type":"PostalAddress","streetAddress":"Calle Cañada Morcillo, s/n · Pol. Ind. El Tapiado","addressLocality":"Molina de Segura","addressRegion":"Murcia","postalCode":"30500","addressCountry":"ES"},"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"07:00","closes":"15:30"}},"areaServed":"ES-MC","url":"https://www.luanfra.com/mecanizado-gran-formato/"}</script>`,
  eyebrow: '[03] — Soraluce · hasta X 10.000 mm',
  h1: 'Mecanizado<br>de gran formato<br><span class="perfil">en Murcia</span>',
  lead: 'Cuando la pieza no cabe en un centro convencional: <strong>fresado de columna móvil</strong>, soldadura propia y verificación dimensional. Base en Molina de Segura.',
  heroWebp: '/img/granformato-1.webp',
  heroJpg: '/img/granformato-1.jpg',
  ctaHref: '#presupuesto-gf',
  ctaLabel: 'Enviar envolvente',
  ctaNav: 'Presupuesto',
  body: `
<section class="tema t-blanco sec" data-tema="blanco">
  <div class="wrap prosa">
    <h2>Capacidad publicada</h2>
    <p>Medios de planta para piezas grandes. El <strong>recorrido de máquina no es la garantía automática de la pieza</strong>: peso, amarre, utillaje y cotas críticas se validan pieza a pieza.</p>
    <table class="tech" aria-label="Capacidades orientativas gran formato">
      <thead><tr><th>Medio</th><th>Dato publicado</th></tr></thead>
      <tbody>
        <tr><td>Fresadora columna móvil (Soraluce)</td><td>Hasta <strong>X 10.000 × Y 1.500 × Z 3.000 mm</strong>; cabezal ortogonal 0,1° · 6.000 rpm</td></tr>
        <tr><td>Torno CNC volteo</td><td>Hasta Ø 950 × 2.000 mm (orientativo)</td></tr>
        <tr><td>Izado</td><td>Puentes grúa 10 t</td></tr>
        <tr><td>Soldadura + mecanizado</td><td>Estructuras y bancadas: soldadura propia y mecanizado del conjunto</td></tr>
        <tr><td>Control</td><td>CMM Mitutoyo · CAMWorks</td></tr>
      </tbody>
    </table>
    <p class="nota-tech">Indica siempre envolvente (L×A×H), peso aproximado y si hay soldadura previa.</p>
    <div class="fotos-l">
      <figure class="foto">
        <picture><source srcset="/img/granformato-1.webp" type="image/webp"><img src="/img/granformato-1.jpg" alt="Fresado de gran formato en Talleres Luanfra" width="800" height="500" loading="lazy"></picture>
        <figcaption><b>Gran formato</b>Planta · Molina de Segura</figcaption>
      </figure>
      <figure class="foto">
        <picture><source srcset="/img/granformato-2.webp" type="image/webp"><img src="/img/granformato-2.jpg" alt="Pieza de gran tamaño en mecanizado Luanfra" width="800" height="500" loading="lazy"></picture>
        <figcaption><b>Escala real</b>Pieza / amarre</figcaption>
      </figure>
    </div>
    <div class="cards">
      <div class="card-l"><h3>Estructuras y bancadas</h3><p>Soldadura + mecanizado del mismo conjunto.</p></div>
      <div class="card-l"><h3>Recorridos largos</h3><p>Columna móvil hasta 10 m en X (consultar pieza).</p></div>
      <div class="card-l"><h3>Cabezal ortogonal</h3><p>Posicionado fino en la mayor máquina.</p></div>
      <div class="card-l"><h3>Verificación</h3><p>Metrología 3D y soporte de oficina técnica.</p></div>
    </div>
  </div>
</section>
<section class="tema t-negro sec" id="presupuesto-gf" data-tema="negro">
  <div class="wrap">
    <span class="marca-sec">Presupuesto</span>
    <h2 class="h-l" style="margin-bottom:12px">Solicitud técnica — gran formato</h2>
    <p class="cuerpo" style="margin-bottom:8px">Cuanto más claros envolvente, peso y plano, más rápido el plazo.</p>
    <div class="form form-box">
      <form id="form-gf" novalidate>
        <div class="form-grid">
          <div><label for="g-emp">Empresa / nombre</label><input id="g-emp" required type="text" autocomplete="organization"></div>
          <div><label for="g-mail">Email</label><input id="g-mail" required type="email" autocomplete="email"></div>
          <div><label for="g-tel">Teléfono</label><input id="g-tel" type="tel" autocomplete="tel"></div>
          <div><label for="g-peso">Peso aprox. (kg)</label><input id="g-peso" type="text" placeholder="Si se conoce"></div>
          <div><label for="g-l">Largo (mm)</label><input id="g-l" type="text"></div>
          <div><label for="g-a">Ancho (mm)</label><input id="g-a" type="text"></div>
          <div><label for="g-h">Alto (mm)</label><input id="g-h" type="text"></div>
          <div><label for="g-mat">Material</label><input id="g-mat" type="text"></div>
          <div class="full"><label for="g-obs">Operaciones / soldadura / plazo</label><textarea id="g-obs" placeholder="Fresado, taladrado, soldadura previa, cantidad, urgencia…"></textarea></div>
        </div>
        <p class="nota">Horario: L–V 7:00–15:30. Adjunta PDF/STEP o foto en el correo.</p>
        <div class="btns">
          <button class="btn btn-acc" type="submit">Enviar especificaciones</button>
          <a class="btn btn-linea" href="/mecanizado-murcia/">Mecanizado Murcia</a>
        </div>
      </form>
    </div>
  </div>
</section>
<section class="tema t-blanco sec" data-tema="blanco">
  <div class="wrap prosa faq">
    <h2>Preguntas frecuentes</h2>
    <details><summary>¿Qué tamaño máximo aceptáis?</summary><p>Orientativamente hasta X 10.000 mm en fresado de gran formato y Ø 950 × 2.000 mm en torno de volteo. Confirmamos con plano y peso.</p></details>
    <details><summary>¿Soldáis y mecanizáis el mismo conjunto?</summary><p>Sí: sección de soldadura y mecanizado posterior.</p></details>
    <details><summary>¿Cómo pedir presupuesto?</summary><p>Usa el formulario de esta página o escribe a operaciones@luanfra.com con envolvente y plano.</p></details>
  </div>
</section>
`,
  script: `<script>
document.getElementById('form-gf').addEventListener('submit',function(e){
  e.preventDefault();
  var g=function(id){return (document.getElementById(id).value||'').trim();};
  if(!g('g-emp')||!g('g-mail')){alert('Indica empresa y email.');return;}
  var body=['Solicitud presupuesto GRAN FORMATO — web luanfra.com/mecanizado-gran-formato/','','Empresa: '+g('g-emp'),'Email: '+g('g-mail'),'Teléfono: '+(g('g-tel')||'—'),'','Envolvente L×A×H (mm): '+(g('g-l')||'?')+' × '+(g('g-a')||'?')+' × '+(g('g-h')||'?'),'Peso aprox.: '+(g('g-peso')||'—'),'Material: '+(g('g-mat')||'—'),'','Operaciones / observaciones:',g('g-obs')||'—','','(Adjuntar plano o foto.)'].join('\\n');
  window.location.href='mailto:operaciones@luanfra.com?subject='+encodeURIComponent('Presupuesto gran formato — '+g('g-emp'))+'&body='+encodeURIComponent(body);
});
</script>`
}));

/* ========== MECANIZADO MURCIA ========== */
writeFileSync(join(root, 'mecanizado-murcia/index.html'), page({
  title: 'Mecanizado en Murcia | Taller CNC Molina de Segura — Talleres Luanfra',
  description: 'Taller de mecanizado en Murcia y Molina de Segura: CNC, engranajes, piñones, gran formato y piezas bajo plano. Talleres Luanfra. Tel. 968 38 94 01.',
  canonical: 'https://www.luanfra.com/mecanizado-murcia/',
  ogTitle: 'Mecanizado en Murcia — Talleres Luanfra',
  ogDescription: 'CNC e elementos de transmisión desde Molina de Segura. Piezas bajo plano o muestra para la industria.',
  schema: `<script type="application/ld+json">{"@context":"https://schema.org","@type":["LocalBusiness","ProfessionalService"],"additionalType":"https://schema.org/ManufacturingBusiness","name":"Talleres Luanfra S.L.","url":"https://www.luanfra.com/mecanizado-murcia/","image":"https://www.luanfra.com/og-image.jpg","telephone":"+34968389401","email":"operaciones@luanfra.com","address":{"@type":"PostalAddress","streetAddress":"Calle Cañada Morcillo, s/n · Polígono Industrial El Tapiado","addressLocality":"Molina de Segura","addressRegion":"Murcia","postalCode":"30500","addressCountry":"ES"},"geo":{"@type":"GeoCoordinates","latitude":38.0548,"longitude":-1.2131},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"07:00","closes":"15:30"}],"areaServed":[{"@type":"AdministrativeArea","name":"Región de Murcia"},{"@type":"City","name":"Molina de Segura"},{"@type":"City","name":"Murcia"}],"sameAs":["https://www.linkedin.com/company/talleres-luanfra-sl"],"knowsAbout":["mecanizado CNC","fabricación de engranajes","piñones","mecanizado de gran formato","elementos de transmisión"],"description":"Taller de mecanizado CNC e industrial en Murcia (Molina de Segura): engranajes, piñones, gran formato y piezas bajo plano o muestra."}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Hacéis mecanizado CNC en Murcia?","acceptedAnswer":{"@type":"Answer","text":"Sí. Torno y fresa CNC, centros paletizados y gran formato en Molina de Segura, Región de Murcia."}},{"@type":"Question","name":"¿Fabricáis engranajes y piñones?","acceptedAnswer":{"@type":"Answer","text":"Sí: engranajes de módulo, piñones de cadena y especiales, cremalleras y coronas."}},{"@type":"Question","name":"¿Dónde está el taller de mecanizado?","acceptedAnswer":{"@type":"Answer","text":"Polígono Industrial El Tapiado, Calle Cañada Morcillo s/n, 30500 Molina de Segura (Murcia). Teléfono 968 38 94 01."}},{"@type":"Question","name":"¿Sois un taller de coches?","acceptedAnswer":{"@type":"Answer","text":"No. Somos taller de mecanizado industrial CNC e elementos de transmisión."}}]}</script>`,
  eyebrow: '[00] — Molina de Segura · Región de Murcia',
  h1: 'Mecanizado<br>en Murcia<br><span class="perfil">para industria</span>',
  lead: 'En <strong>Talleres Luanfra</strong> fabricamos piezas de <strong>mecanizado CNC</strong> y elementos de transmisión —piñones, engranajes, cremalleras, coronas— bajo plano o muestra. Nave propia en el Polígono El Tapiado, con salida a la A-30.',
  heroWebp: '/img/nave-panoramica.webp',
  heroJpg: '/img/nave-panoramica.jpg',
  ctaHref: '/#contacto',
  ctaLabel: 'Pedir presupuesto',
  ctaNav: 'Presupuesto',
  body: `
<section class="tema t-blanco sec" data-tema="blanco">
  <div class="wrap prosa">
    <div class="stats-l" aria-label="Datos del taller">
      <div><b>+50 años</b><span>Oficio industrial</span></div>
      <div><b>5.000 m²</b><span>Instalaciones</span></div>
      <div><b>+40</b><span>Máquinas</span></div>
      <div><b>X 10.000</b><span>Gran formato</span></div>
    </div>
    <h2 style="margin-top:48px">Taller de mecanizado en Molina de Segura</h2>
    <p>Si buscas un <strong>taller de mecanizado en Murcia</strong> para series cortas o medias, piezas unitarias o conjuntos de gran tamaño, trabajamos desde Molina de Segura para plantas de toda la Región y el resto de España. No somos taller de automoción: nuestro oficio es el <strong>mecanizado industrial con arranque de viruta</strong>, soldadura propia y control dimensional.</p>
    <p>La proximidad importa cuando hay urgencias, prototipos o ajustes sobre muestra. Estamos a minutos de Murcia ciudad y con acceso directo a la A-30.</p>
    <h2>Qué mecanizamos</h2>
    <div class="cards">
      <div class="card-l"><h3>CNC torno y fresa</h3><p>Series y unitarios con tornos CNC, centros paletizados y fresadoras con cuarto eje.</p></div>
      <div class="card-l"><h3>Engranajes y piñones</h3><p>Módulo recto/helicoidal, cadena, charnela, cremalleras y coronas.</p></div>
      <div class="card-l"><h3>Gran formato</h3><p>Fresado de estructuras y piezas largas (Soraluce / columna móvil hasta 10 m de recorrido X).</p></div>
      <div class="card-l"><h3>Láser y soldadura</h3><p>Corte por láser de fibra y sección de soldadura para mecanizar el conjunto ya unido.</p></div>
    </div>
    <p>Más detalle: <a href="/">inicio</a>, <a href="/engranajes/">engranajes</a>, <a href="/pinones/">piñones</a>, <a href="/mecanizado-gran-formato/">gran formato</a>.</p>
    <h2>Por qué empresas de Murcia nos eligen</h2>
    <ul>
      <li><strong>Bajo plano o muestra</strong> — fabricamos lo que pide vuestra ingeniería.</li>
      <li><strong>Oficina técnica propia</strong> — SolidWorks / CAMWorks y CMM.</li>
      <li><strong>Capacidad real de planta</strong> — puentes grúa de 10 t y transporte en la Región.</li>
      <li><strong>Misma interlocución</strong> — <a href="mailto:operaciones@luanfra.com">operaciones@luanfra.com</a> o 968 38 94 01.</li>
    </ul>
    <h2>Zona de servicio</h2>
    <p>Base en <strong>Molina de Segura</strong>. Atendemos Murcia capital, Alcantarilla, Las Torres de Cotillas, Lorquí, Ceutí, Archena, Santomera y el resto de la Región; también envíos al resto de España y trabajos en Europa.</p>
    <h2>Dónde estamos (NAP)</h2>
    <p><strong>Talleres Luanfra S.L.</strong> · C/ Cañada Morcillo, s/n · Pol. Ind. El Tapiado · 30500 Molina de Segura (Murcia) · Tel. <a href="tel:+34968389401">968 38 94 01</a> · <a href="mailto:operaciones@luanfra.com">operaciones@luanfra.com</a> · <a href="https://www.luanfra.com/">www.luanfra.com</a>. Acceso A-30 salida 126. Somos <strong>fábrica de mecanizado industrial</strong>, no taller de reparación de automóviles.</p>
    <div class="map-box" aria-label="Mapa Talleres Luanfra">
      <iframe title="Mapa Talleres Luanfra Molina de Segura" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Talleres%20Luanfra%20Molina%20de%20Segura&z=15&output=embed"></iframe>
    </div>
  </div>
</section>
<section class="tema t-rojo sec cta-final" data-tema="rojo">
  <div class="wrap">
    <span class="marca-sec">Contacto</span>
    <h2 class="h-xl" style="max-width:14ch;margin-bottom:18px">¿Necesitas mecanizado en Murcia?</h2>
    <p class="cuerpo" style="margin-bottom:28px">Cuéntanos la pieza. Respondemos en horario laboral (7:00–15:30).</p>
    <div class="hero-ctas">
      <a class="btn btn-acc" href="/#contacto">Formulario de presupuesto</a>
      <a class="btn btn-linea" href="mailto:operaciones@luanfra.com">operaciones@luanfra.com</a>
    </div>
  </div>
</section>
<section class="tema t-blanco sec" data-tema="blanco">
  <div class="wrap prosa faq" id="faq">
    <h2>Preguntas frecuentes</h2>
    <details><summary>¿Hacéis mecanizado CNC en Murcia?</summary><p>Sí. Torno y fresa CNC, centros paletizados y gran formato en Molina de Segura, Región de Murcia.</p></details>
    <details><summary>¿Fabricáis engranajes y piñones?</summary><p>Sí: engranajes de módulo, piñones de cadena y especiales, cremalleras y coronas.</p></details>
    <details><summary>¿Cuál es el tamaño máximo?</summary><p>Fresado de gran formato hasta recorridos del orden de X 10.000 × Y 1.500 × Z 3.000 mm; torno CNC de volteo hasta Ø 950 × 2.000 mm.</p></details>
    <details><summary>¿Sois un taller de coches?</summary><p>No. Somos taller de mecanizado industrial CNC e elementos de transmisión.</p></details>
  </div>
</section>
`
}));

console.log('Landings reescritas con piel de home.');
