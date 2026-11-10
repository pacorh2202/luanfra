# -*- coding: utf-8 -*-
"""Clonar index.html en landings: misma piel, solo meta + hero mínimos."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent
home = (root / "index.html").read_text(encoding="utf-8")


def absolutize(html: str) -> str:
    pairs = [
        ('srcset="img/', 'srcset="/img/'),
        ('src="img/', 'src="/img/'),
        ('href="img/', 'href="/img/'),
        ("url(img/", "url(/img/"),
        ('href="favicon', 'href="/favicon'),
        ('href="apple-touch-icon', 'href="/apple-touch-icon'),
        ('href="site.webmanifest', 'href="/site.webmanifest'),
    ]
    for a, b in pairs:
        html = html.replace(a, b)
    return html


landings = {
    "mecanizado-murcia": {
        "title": "Mecanizado en Murcia | Talleres Luanfra — Molina de Segura",
        "desc": "Taller de mecanizado CNC en Murcia (Molina de Segura). Piñones, engranajes, gran formato y piezas bajo plano o muestra. Tel. 968 38 94 01.",
        "canonical": "https://www.luanfra.com/mecanizado-murcia/",
        "og_title": "Mecanizado en Murcia — Talleres Luanfra",
        "marca": "[00] — Mecanizado en Murcia · Molina de Segura",
        "h1": 'Mecanizado<br>en Murcia<br><span class="perfil">desde 1973</span>',
        "cuerpo": 'Taller de <strong>mecanizado CNC en Murcia</strong> (Molina de Segura). Referente en <strong>elementos de transmisión</strong>: piezas de pequeño y gran tamaño bajo plano o muestra.',
    },
    "engranajes": {
        "title": "Engranajes a medida en Murcia | Talleres Luanfra",
        "desc": "Engranajes de módulo rectos y helicoidales, dentado interior y exterior, bajo plano. Talleres Luanfra, Molina de Segura (Murcia).",
        "canonical": "https://www.luanfra.com/engranajes/",
        "og_title": "Engranajes a medida en Murcia — Talleres Luanfra",
        "marca": "[00] — Engranajes de módulo · Molina de Segura",
        "h1": 'Engranajes<br>a medida<br><span class="perfil">desde 1973</span>',
        "cuerpo": 'Fabricamos <strong>engranajes de módulo</strong> rectos y helicoidales, dentado interior o exterior, bajo plano o muestra. Taller de mecanizado en Murcia (Molina de Segura).',
    },
    "pinones": {
        "title": "Piñones especiales y de cadena en Murcia | Talleres Luanfra",
        "desc": "Piñones de cadena, charnela y especiales bajo plano o muestra. Paso, dientes y buje. Talleres Luanfra, Molina de Segura (Murcia).",
        "canonical": "https://www.luanfra.com/pinones/",
        "og_title": "Piñones especiales en Murcia — Talleres Luanfra",
        "marca": "[00] — Piñones · Molina de Segura",
        "h1": 'Piñones<br>especiales<br><span class="perfil">desde 1973</span>',
        "cuerpo": 'Fabricamos <strong>piñones de cadena y especiales</strong> bajo plano o muestra. Mecanizado industrial en Murcia (Molina de Segura), con el mismo parque y oficio de siempre.',
    },
    "mecanizado-gran-formato": {
        "title": "Mecanizado gran formato Murcia | Talleres Luanfra",
        "desc": "Fresado de gran formato en Murcia: columna móvil hasta X 10.000 mm, soldadura y control dimensional. Talleres Luanfra, Molina de Segura.",
        "canonical": "https://www.luanfra.com/mecanizado-gran-formato/",
        "og_title": "Mecanizado de gran formato en Murcia — Talleres Luanfra",
        "marca": "[00] — Gran formato · Molina de Segura",
        "h1": 'Mecanizado<br>gran formato<br><span class="perfil">en Murcia</span>',
        "cuerpo": 'Cuando la pieza no cabe en un centro convencional: <strong>fresado de columna móvil</strong>, soldadura propia y verificación. Base en Molina de Segura (Murcia).',
    },
}

for folder, cfg in landings.items():
    html = absolutize(home)
    html = re.sub(r"<title>.*?</title>", f"<title>{cfg['title']}</title>", html, count=1, flags=re.S)
    html = re.sub(
        r'<meta name="description" content=".*?"\s*>',
        f'<meta name="description" content="{cfg["desc"]}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<link rel="canonical" href=".*?"\s*>',
        f'<link rel="canonical" href="{cfg["canonical"]}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:title" content=".*?"\s*>',
        f'<meta property="og:title" content="{cfg["og_title"]}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:description" content=".*?"\s*>',
        f'<meta property="og:description" content="{cfg["desc"]}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:url" content=".*?"\s*>',
        f'<meta property="og:url" content="{cfg["canonical"]}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<span class="marca-sec">\[00\] — .*?</span>',
        f'<span class="marca-sec">{cfg["marca"]}</span>',
        html,
        count=1,
    )
    html = re.sub(
        r'<h1 class="h-xxl">.*?</h1>',
        f'<h1 class="h-xxl">{cfg["h1"]}</h1>',
        html,
        count=1,
        flags=re.S,
    )
    html = re.sub(
        r'(<h1 class="h-xxl">.*?</h1>\s*)<p class="cuerpo">.*?</p>',
        rf'\1<p class="cuerpo">{cfg["cuerpo"]}</p>',
        html,
        count=1,
        flags=re.S,
    )
    out = root / folder / "index.html"
    out.parent.mkdir(exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print(folder, "ok", out.stat().st_size)
