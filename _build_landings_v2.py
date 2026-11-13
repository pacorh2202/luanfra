# -*- coding: utf-8 -*-
"""Páginas de servicio v2 (2026-11-13).

Misma piel que la portada (menú, cabecera, contacto y pie), pero el contenido
de en medio es propio de cada página para que Google no las trate como copias.
Sustituye a _build_landings_from_home.py. Engranajes y piñones dejan de ser
páginas propias (redirigen a la portada en vercel.json).

Solo se usan datos que ya publica la portada: no inventar cifras.
"""
from pathlib import Path
import json
import re

root = Path(__file__).resolve().parent
home = (root / "index.html").read_text(encoding="utf-8")

INICIO = "<!-- ============ EMPRESA (blanco) ============ -->"
FIN = "<!-- ============ CIFRAS + CONTACTO (negro) ============ -->"


def absolutize(html: str) -> str:
    for a, b in [
        ('srcset="img/', 'srcset="/img/'), ('src="img/', 'src="/img/'),
        ('href="img/', 'href="/img/'), ("url(img/", "url(/img/"),
        ('href="favicon', 'href="/favicon'), ('href="apple-touch-icon', 'href="/apple-touch-icon'),
        ('href="site.webmanifest', 'href="/site.webmanifest'),
    ]:
        html = html.replace(a, b)
    return html


def caps(items):
    out = []
    for i, (nom, det) in enumerate(items, 1):
        out.append(f'      <div class="cap rv"><span class="cap-num">{i:02d}</span>'
                   f'<span class="cap-nom">{nom}</span><span class="cap-det">{det}</span></div>')
    return "\n".join(out)


def faq_html(faq):
    filas = []
    for p, r in faq:
        filas.append(
            '      <details style="border-top:1px solid rgba(0,0,0,.12);padding:18px 0">\n'
            f'        <summary style="cursor:pointer;font-weight:600;font-size:1.05rem">{p}</summary>\n'
            f'        <p class="cuerpo" style="margin-top:10px;max-width:68ch">{r}</p>\n'
            '      </details>')
    return "\n".join(filas)


def faq_schema(faq):
    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": re.sub("<[^>]+>", "", p),
             "acceptedAnswer": {"@type": "Answer", "text": re.sub("<[^>]+>", "", r)}}
            for p, r in faq
        ],
    }
    return '<script type="application/ld+json">\n' + json.dumps(data, ensure_ascii=False, indent=1) + "\n</script>\n"


def foto(img, alt, pie_b, pie, d=""):
    return (f'      <figure class="foto rv{d}"><picture><source srcset="/img/{img}.webp" type="image/webp">'
            f'<img src="/img/{img}.jpg" alt="{alt}" loading="lazy" decoding="async"></picture>\n'
            f'        <figcaption><b>{pie_b}</b>{pie}</figcaption></figure>')


def cuerpo_pagina(c):
    parrafos = "\n".join(f'    <p class="cuerpo rv" style="max-width:68ch;margin-bottom:16px">{p}</p>' for p in c["intro"])
    pasos = "\n".join(f'      <li style="margin-bottom:10px">{p}</li>' for p in c["pasos"])
    fotos = "\n".join(foto(*f, d=("", " d1", " d2")[i]) for i, f in enumerate(c["fotos"]))
    otras = " · ".join(f'<a href="{u}">{t}</a>' for u, t in OTRAS if c["slug"] not in u)
    return f"""<!-- ============ PAGINA PROPIA: {c['slug']} ============ -->
<section class="tema t-blanco sec" data-tema="blanco" id="servicio">
  <div class="wrap">
    <span class="marca-sec rv">[01] — {c['sec1']}</span>
    <h2 class="h-xl rv" style="margin-bottom:28px">{c['h2']}</h2>
{parrafos}
  </div>
</section>

<section class="tema t-negro sec" data-tema="negro" id="capacidades">
  <div class="wrap">
    <span class="marca-sec rv">[02] — {c['sec2']}</span>
    <h2 class="h-xl rv" style="margin-bottom:clamp(40px,5vw,72px)">{c['h2b']}</h2>
    <div class="caps">
{caps(c['caps'])}
    </div>
    <div class="piezas">
{fotos}
    </div>
  </div>
</section>

<section class="tema t-blanco sec" data-tema="blanco" id="como">
  <div class="wrap">
    <span class="marca-sec rv">[03] — Cómo pedir presupuesto</span>
    <h2 class="h-l rv" style="margin-bottom:22px">{c['h2c']}</h2>
    <ol class="cuerpo rv" style="max-width:68ch;padding-left:1.2em;margin-bottom:40px">
{pasos}
    </ol>
    <span class="marca-sec rv">[04] — Preguntas frecuentes</span>
    <div class="rv" style="max-width:76ch;margin-bottom:36px">
{faq_html(c['faq'])}
    </div>
    <p class="cuerpo rv" style="max-width:68ch">Otros servicios de Talleres Luanfra: {otras} · <a href="/">Página principal</a></p>
  </div>
</section>

"""


OTRAS = [
    ("/mecanizado-murcia/", "Mecanizado en Murcia"),
    ("/mecanizado-gran-formato/", "Mecanizado de gran formato"),
    ("/torneado-fresado-cnc-murcia/", "Torneado y fresado CNC"),
    ("/piezas-especiales/", "Piezas especiales a medida"),
]

paginas = [
    {
        "slug": "mecanizado-murcia",
        "title": "Taller de mecanizado en Murcia | Talleres Luanfra, Molina de Segura",
        "desc": "Taller de mecanizado industrial en Murcia desde 1973: piezas bajo plano o muestra, unitarias o en serie, con transporte propio en la Región. Molina de Segura. Tel. 968 38 94 01.",
        "og_title": "Taller de mecanizado en Murcia — Talleres Luanfra",
        "hero_img": "nave-panoramica",
        "marca": "[00] — Taller de mecanizado · Región de Murcia",
        "h1": 'Taller de<br>mecanizado<br><span class="perfil">en Murcia</span>',
        "cuerpo": 'Fabricamos <strong>piezas industriales bajo plano o muestra</strong> para empresas de toda la Región de Murcia. Nave propia en Molina de Segura, junto a la A-30, y transporte propio.',
        "sec1": "Para la industria de la Región",
        "h2": "Tu taller de mecanizado<br>a 15 minutos de Murcia",
        "intro": [
            "Talleres Luanfra es un <strong>taller de mecanizado industrial en Murcia</strong> con más de 50 años de oficio. Estamos en el Polígono Industrial El Tapiado de Molina de Segura, con salida directa a la autovía A-30 (salida 126).",
            "Trabajamos para fabricantes de maquinaria, la industria conservera y agroalimentaria, mantenimiento industrial y empresas que necesitan <strong>una pieza de repuesto, una serie corta o un conjunto completo</strong>. No tenemos producto propio: fabricamos lo que nuestro cliente necesita, a partir de su plano o de una pieza de muestra.",
            "Recogemos y entregamos con <strong>transporte propio en la Región de Murcia</strong>, y tenemos una sección de recepción para el material que nos envía el cliente.",
        ],
        "sec2": "Qué podemos hacer por ti",
        "h2b": "Todo el proceso<br><span class=\"sangria\">bajo un mismo techo</span>",
        "caps": [
            ("Piezas bajo plano", "Interpretamos tu plano y lo programamos en nuestra oficina técnica (SolidWorks y CAMWorks)"),
            ("Piezas bajo muestra", "Si no hay plano, partimos de la pieza usada o rota para fabricar una nueva"),
            ("Repuestos urgentes", "Máquina convencional para ajustes, reparaciones y piezas unitarias fuera de serie"),
            ("Series cortas y medias", "Centros de mecanizado paletizados y tornos CNC con alimentador"),
            ("Soldadura y mecanizado", "Soldamos el conjunto y lo mecanizamos ya soldado, en el mismo taller"),
            ("Control dimensional", "Verificación con máquina de medición tridimensional Mitutoyo"),
        ],
        "fotos": [
            ("pieza-bn", "Brida mecanizada de acero con taladros", "Brida", "Torneado y taladrado"),
            ("nave-planta", "Interior de la nave de Talleres Luanfra en Molina de Segura", "Nave de 5.000 m²", "Polígono El Tapiado"),
            ("pieza-brida", "Brida de acero acabada con chavetero", "Serie acabada", "Control dimensional"),
        ],
        "h2c": "Tres pasos y te contestamos",
        "pasos": [
            "Envíanos el <strong>plano</strong> (PDF, DWG o STEP) o una <strong>foto de la muestra</strong> con sus medidas a operaciones@luanfra.com.",
            "Indica <strong>material, cantidad y fecha</strong> en la que la necesitas.",
            "Te enviamos el presupuesto. Si es una muestra, podemos recogerla con nuestro transporte en la Región de Murcia.",
        ],
        "faq": [
            ("¿Fabricáis piezas sin plano?", "Sí. Con una pieza de muestra, aunque esté desgastada o rota, tomamos medidas y fabricamos una nueva."),
            ("¿Hacéis piezas unitarias o solo series?", "Las dos cosas. Tenemos máquina convencional para piezas unitarias y reparaciones, y máquinas CNC para series."),
            ("¿Qué materiales trabajáis?", "Aceros, aceros especiales, aluminios, bronces, fundiciones y poliamidas."),
            ("¿Dónde estáis?", "En C/ Cañada Morcillo, s/n, Polígono Industrial El Tapiado, 30500 Molina de Segura (Murcia). Autovía A-30, salida 126."),
            ("¿Cuál es vuestro horario?", "De lunes a viernes, de 7:00 a 15:30. Teléfono 968 38 94 01."),
        ],
    },
    {
        "slug": "mecanizado-gran-formato",
        "title": "Mecanizado de gran formato en Murcia | Hasta 10 metros | Talleres Luanfra",
        "desc": "Mecanizado de piezas grandes en Murcia: fresadoras de columna móvil con X 10.000 mm, torno de volteo Ø 950 mm, soldadura propia y puentes grúa de 10 t. Molina de Segura.",
        "og_title": "Mecanizado de gran formato en Murcia — Talleres Luanfra",
        "hero_img": "maq-mandrinadora",
        "marca": "[00] — Gran formato · Molina de Segura",
        "h1": 'Mecanizado<br>gran formato<br><span class="perfil">hasta 10 m</span>',
        "cuerpo": 'Piezas y estructuras que no caben en un taller convencional: <strong>soldamos y mecanizamos el conjunto completo</strong> en Molina de Segura (Murcia).',
        "sec1": "Piezas grandes y pesadas",
        "h2": "Cuando la pieza<br>no cabe en otro taller",
        "intro": [
            "Bancadas, bastidores, estructuras soldadas, cuerpos de máquina o piezas de gran diámetro. En Luanfra tenemos <strong>tres fresadoras de columna móvil Soraluce</strong>; la mayor tiene un recorrido de <strong>X 10.000 · Y 1.500 · Z 3.000 mm</strong>.",
            "Para piezas redondas grandes disponemos de un <strong>torno CNC de volteo de Ø 950 × 2.000 mm</strong>. Toda la planta está cubierta por <strong>puentes grúa de 10 toneladas</strong>, así que movemos y volteamos la pieza sin sacarla del taller.",
            "La ventaja para ti: <strong>un solo proveedor</strong> para soldar el conjunto, mecanizarlo ya soldado y verificarlo. Menos transportes entre talleres y un único responsable de la medida final.",
        ],
        "sec2": "Capacidad",
        "h2b": "Medios para<br><span class=\"sangria\">piezas de toneladas</span>",
        "caps": [
            ("Columna móvil", "X 10.000 · Y 1.500 · Z 3.000 mm en la mayor; cabezal ortogonal automático de 0,1° y 6.000 rpm"),
            ("Torno de volteo", "Ø 950 × 2.000 mm para piezas de gran diámetro"),
            ("Puentes grúa", "10 toneladas en toda la planta"),
            ("Soldadura propia", "Sección de soldadura conforme a las normativas vigentes; mecanizamos el conjunto ya soldado"),
            ("Fresado en 5 ejes", "Dos fresadoras Correa de 5 ejes para geometrías complejas en una sola amarrada"),
            ("Verificación", "Máquina de medición tridimensional Mitutoyo"),
        ],
        "fotos": [
            ("granformato-1", "Conjunto soldado de gran formato amarrado para mecanizar", "Conjunto soldado", "Amarre sobre bancada"),
            ("maq-bancada", "Bancada de gran recorrido de fresadora de columna móvil", "Bancada", "Gran recorrido"),
            ("granformato-2", "Mecanizado de alojamientos en pieza de gran formato", "En proceso", "Mecanizado de alojamientos"),
        ],
        "h2c": "Qué necesitamos para presupuestar",
        "pasos": [
            "<strong>Plano</strong> de la pieza o del conjunto (PDF, DWG o STEP).",
            "<strong>Medidas exteriores</strong> (largo × ancho × alto) y <strong>peso aproximado</strong>.",
            "<strong>Material</strong> y si hay que soldar el conjunto o solo mecanizarlo.",
        ],
        "faq": [
            ("¿Qué tamaño máximo de pieza podéis mecanizar?", "El recorrido de nuestra mayor fresadora es X 10.000 · Y 1.500 · Z 3.000 mm. El tamaño real de la pieza depende de su forma y amarre: envíanos el plano y lo confirmamos."),
            ("¿Podéis soldar y luego mecanizar?", "Sí. Soldamos el conjunto en nuestra sección de soldadura y lo mecanizamos ya soldado, en el mismo taller."),
            ("¿Cuánto peso podéis mover?", "Toda la planta tiene puentes grúa de 10 toneladas."),
            ("¿Hacéis piezas redondas grandes?", "Sí, en torno CNC de volteo de Ø 950 × 2.000 mm."),
        ],
    },
    {
        "slug": "torneado-fresado-cnc-murcia",
        "title": "Torneado y fresado CNC en Murcia | 5 ejes | Talleres Luanfra",
        "desc": "Mecanizado CNC en Murcia: fresado en 5 ejes, centros de mecanizado paletizados y tornos CNC con alimentador. Piezas unitarias y series. Molina de Segura. Tel. 968 38 94 01.",
        "og_title": "Torneado y fresado CNC en Murcia — Talleres Luanfra",
        "hero_img": "hero-torno",
        "marca": "[00] — Mecanizado CNC · Murcia",
        "h1": 'Torneado<br>y fresado<br><span class="perfil">CNC</span>',
        "cuerpo": 'Mecanizado CNC en Murcia con <strong>fresadoras de 5 ejes, centros de mecanizado y tornos CNC</strong>. Desde la pieza unitaria hasta la serie.',
        "sec1": "Mecanizado CNC en Murcia",
        "h2": "Precisión CNC<br>para tu pieza",
        "intro": [
            "En Molina de Segura tenemos <strong>más de 40 máquinas</strong>, la mayoría de control numérico. Elegimos la máquina según la pieza: torno CNC para piezas de revolución, centro de mecanizado para series y fresadora de 5 ejes para geometrías complejas.",
            "Nuestra <strong>oficina técnica</strong> programa cada pieza con SolidWorks y CAMWorks a partir de tu plano o modelo 3D. Cortamos el material a medida en nuestras <strong>sierras CNC</strong>, desde nuestro propio almacén.",
            "Terminamos con <strong>control dimensional</strong> en máquina de medición tridimensional Mitutoyo, y podemos hacer roscados de hasta M-45 en el mismo taller.",
        ],
        "sec2": "Máquinas CNC",
        "h2b": "Parque CNC<br><span class=\"sangria\">en Molina de Segura</span>",
        "caps": [
            ("Fresado en 5 ejes", "2 fresadoras Correa: geometrías complejas en una sola amarrada"),
            ("Centros de mecanizado", "5 centros paletizados y con cuarto eje, para series con cambio rápido de pieza"),
            ("Fresadoras CNC", "6 fresadoras con cabezales automáticos, cuarto eje divisor y mesa de 1.000 × 1.000 mm"),
            ("Tornos CNC", "4 tornos con alimentador, torreta motorizada y contrapunto automático"),
            ("Torno de volteo", "Ø 950 × 2.000 mm para piezas de gran diámetro"),
            ("Roscado y acabado", "Roscadoras CNC hasta M-45, roscado por laminación, mortajadoras y taladradoras"),
        ],
        "fotos": [
            ("pieza-macro", "Casquillo con brida con acabado de torno CNC", "Casquillo con brida", "Acabado de torno"),
            ("hero-torno", "Torno CNC trabajando en Talleres Luanfra", "Torno CNC", "Series de precisión"),
            ("pieza-brida", "Brida de acero mecanizada en CNC", "Serie acabada", "Control dimensional"),
        ],
        "h2c": "Pide tu presupuesto CNC",
        "pasos": [
            "Envíanos el <strong>plano o el modelo 3D</strong> (PDF, DWG o STEP) a operaciones@luanfra.com.",
            "Indica <strong>material, cantidad, tolerancias</strong> y tratamiento si lo lleva.",
            "Te respondemos con precio y plazo.",
        ],
        "faq": [
            ("¿Hacéis piezas unitarias en CNC?", "Sí. Programamos piezas unitarias y también series cortas y medias."),
            ("¿Qué formatos de archivo aceptáis?", "PDF, DWG y STEP. Si solo tienes una pieza de muestra, también podemos partir de ella."),
            ("¿Qué materiales mecanizáis?", "Aceros, aceros especiales, aluminios, bronces, fundiciones y poliamidas."),
            ("¿Verificáis las medidas?", "Sí, con máquina de medición tridimensional Mitutoyo."),
        ],
    },
    {
        "slug": "piezas-especiales",
        "title": "Piezas especiales a medida en Murcia | Bajo plano o muestra | Talleres Luanfra",
        "desc": "Fabricación de piezas especiales a medida en Murcia: piñones especiales, cremalleras, coronas, husillos y piezas para maquinaria, bajo plano o muestra. Molina de Segura. Tel. 968 38 94 01.",
        "og_title": "Piezas especiales a medida — Talleres Luanfra",
        "hero_img": "nave-planta",
        "marca": "[00] — Piezas especiales · Molina de Segura",
        "h1": 'Piezas<br>especiales<br><span class="perfil">a medida</span>',
        "cuerpo": 'Fabricamos la pieza que no encuentras en catálogo: <strong>piezas especiales bajo plano o muestra</strong> para maquinaria industrial, desde 1973.',
        "sec1": "La pieza que no está en catálogo",
        "h2": "Si no existe,<br>la fabricamos",
        "intro": [
            "Una pieza especial es la que no se compra hecha: un piñón con un paso fuera de norma, una cremallera a medida, el repuesto de una máquina que ya no se fabrica o una pieza diseñada solo para tu línea. En Talleres Luanfra fabricamos <strong>piezas especiales a medida</strong> desde 1973.",
            "Nacimos dando servicio a la industria conservera murciana y hoy fabricamos <strong>elementos de transmisión y piezas de maquinaria</strong> que trabajan en 20 ciudades españolas y en Portugal, Andorra, Suiza, Alemania y Polonia.",
            "Trabajamos <strong>bajo plano o bajo muestra</strong>. Si la pieza original está desgastada o rota, partimos de ella: nuestra oficina técnica la mide, la dibuja y la programa.",
        ],
        "sec2": "Qué piezas especiales fabricamos",
        "h2b": "Elementos de transmisión<br><span class=\"sangria\">y piezas de maquinaria</span>",
        "caps": [
            ("Piñones especiales", "De cadena con paso normalizado o especial, de charnela y modulares"),
            ("Engranajes de módulo", "Rectos y helicoidales, dentado interior y exterior, hasta módulo M-10"),
            ("Cremalleras y coronas", "A medida para transmisión lineal y grandes relaciones de transmisión"),
            ("Husillos y estrellas", "Husillos, estrellas y volteadores de botes para llenadoras"),
            ("Repuestos de maquinaria", "Copia de piezas de máquinas antiguas a partir de la muestra"),
            ("Acoplamientos", "Acoplamiento de piñones y elementos de unión"),
        ],
        "fotos": [
            ("pieza-macro", "Casquillo con brida fabricado a medida", "Casquillo con brida", "Pieza a medida"),
            ("pieza-brida", "Brida de acero con chavetero fabricada bajo plano", "Brida con chavetero", "Bajo plano"),
            ("pieza-bn", "Brida mecanizada con taladros y alojamiento", "Brida mecanizada", "Torneado y taladrado"),
        ],
        "h2c": "Cómo pedir una pieza especial",
        "pasos": [
            "Envíanos el <strong>plano</strong> (PDF, DWG o STEP) o una <strong>foto de la pieza de muestra</strong> con sus medidas principales a operaciones@luanfra.com.",
            "Indica <strong>material, cantidad</strong> y para qué máquina es, si lo sabes.",
            "Si es una muestra, podemos <strong>recogerla con nuestro transporte</strong> en la Región de Murcia. Te enviamos el presupuesto.",
        ],
        "faq": [
            ("¿Podéis copiar una pieza sin plano?", "Sí. Con la pieza de muestra, aunque esté desgastada o rota, la medimos, la dibujamos y fabricamos una nueva."),
            ("¿Fabricáis una sola unidad?", "Sí. Fabricamos piezas unitarias y también series."),
            ("¿Qué datos necesitáis para un piñón especial?", "Paso de la cadena, número de dientes, diámetro y ancho del buje, y material. Para un engranaje: módulo, número de dientes y si es recto o helicoidal."),
            ("¿Qué materiales trabajáis?", "Aceros, aceros especiales, aluminios, bronces, fundiciones y poliamidas."),
        ],
    },
]

for c in paginas:
    url = f"https://www.luanfra.com/{c['slug']}/"
    html = absolutize(home)
    subs = [
        (r"<title>.*?</title>", f"<title>{c['title']}</title>"),
        (r'<meta name="description" content=".*?"\s*>', f'<meta name="description" content="{c["desc"]}">'),
        (r'<link rel="canonical" href=".*?"\s*>', f'<link rel="canonical" href="{url}">'),
        (r'<meta property="og:title" content=".*?"\s*>', f'<meta property="og:title" content="{c["og_title"]}">'),
        (r'<meta property="og:description" content=".*?"\s*>', f'<meta property="og:description" content="{c["desc"]}">'),
        (r'<meta property="og:url" content=".*?"\s*>', f'<meta property="og:url" content="{url}">'),
        (r'<span class="marca-sec">\[00\] — .*?</span>', f'<span class="marca-sec">{c["marca"]}</span>'),
        (r'<h1 class="h-xxl">.*?</h1>', f'<h1 class="h-xxl">{c["h1"]}</h1>'),
        (r'(<h1 class="h-xxl">.*?</h1>\s*)<p class="cuerpo">.*?</p>', r'\1<p class="cuerpo">' + c["cuerpo"] + "</p>"),
    ]
    for pat, rep in subs:
        html, n = re.subn(pat, lambda m, rep=rep, pat=pat: m.expand(rep) if "\\1" in rep else rep, html, count=1, flags=re.S)
        if n != 1:
            raise SystemExit(f"{c['slug']}: no encuentro {pat}")
    # Foto de cabecera propia
    html = html.replace('/img/hero-torno.webp" type="image/webp">\n      <img src="/img/hero-torno.jpg"',
                        f'/img/{c["hero_img"]}.webp" type="image/webp">\n      <img src="/img/{c["hero_img"]}.jpg"', 1)
    # Contenido propio en lugar de las secciones de la portada
    i, j = html.index(INICIO), html.index(FIN)
    html = html[:i] + cuerpo_pagina(c) + html[j:]
    # Menú y pie: los anclajes de la portada que ya no están en esta página van a la portada
    for ancla in ("empresa", "granformato", "maquinaria", "alcance"):
        html = html.replace(f'href="#{ancla}"', f'href="/#{ancla}"')
    html = html.replace('href="#top"', 'href="/"')
    # Preguntas frecuentes en datos estructurados
    html = html.replace("</head>", faq_schema(c["faq"]) + "</head>", 1)
    out = root / c["slug"] / "index.html"
    out.parent.mkdir(exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print(c["slug"], "ok", out.stat().st_size)
