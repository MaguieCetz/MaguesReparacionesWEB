# 🛠️ Maguies Reparaciones

Sitio web oficial de **Maguies Reparaciones**, un portal interactivo dedicado a guías técnicas, trucos de taller, diagnóstico y mantenimiento preventivo y correctivo para computadoras y laptops.

Incluye un sistema de captura y registro de correos electrónicos para boletines de novedades mediante **Netlify Forms** (sin necesidad de configurar servidores de bases de datos externos).

---

## 🌟 Características

- **Diseño Moderno y Responsivo:** Adaptado para teléfonos móviles, tablets y computadoras de escritorio con temática técnica oscura (*Dark Tech Theme*).
- **Biblioteca de Tips Interactiva:**
  - Filtrado instantáneo por categorías: *Hardware*, *Software*, *Mantenimiento* y *Diagnóstico*.
  - Buscador predictivo en vivo con botón de reseteo.
  - Guías detalladas en ventana modal con herramientas requeridas, tiempos estimados y alertas de precaución.
- **Árbol de Decisión Rápido:** Checklist paso a paso para equipos que no encienden o no dan video.
- **Registro de Correos (Newsletter) con Netlify Forms:**
  - Protección antispam con Honeypot.
  - Envío asíncrono con confirmación visual.
  - Almacenamiento automático y exportación a Excel/CSV desde el panel de Netlify.

---

## 📂 Estructura del Proyecto

```text
Maguies/
├── index.html        # Estructura semántica y formulario de Netlify
├── css/
│   └── styles.css    # Diseño visual, variables y responsividad
├── js/
│   └── app.js        # Base de datos de tips, buscador y lógica de formularios
├── .gitignore        # Exclusiones de archivos para Git
└── README.md         # Documentación del proyecto
```

---

## 💻 Cómo probarlo localmente

Simplemente abre el archivo `index.html` en tu navegador preferido (doble clic sobre el archivo o clic derecho > *Abrir con Google Chrome / Edge*).

---

## 🚀 Paso a Paso: Subir a GitHub y Desplegar en Netlify

### 1. Subir el proyecto a GitHub
1. Abre tu cuenta en [GitHub.com](https://github.com) y crea un nuevo repositorio llamado **`maguies-reparaciones`** (puedes dejarlo público).
2. En la terminal de esta carpeta, ejecuta los comandos que te proporciona GitHub:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/maguies-reparaciones.git
   git branch -M main
   git push -u origin main
   ```

### 2. Publicar en Netlify (Gratis en 2 minutos)
1. Inicia sesión en [Netlify.com](https://www.netlify.com/) con tu cuenta de GitHub.
2. Haz clic en el botón **"Add new site"** > **"Import an existing project"**.
3. Selecciona **GitHub** y autoriza el acceso al repositorio `maguies-reparaciones`.
4. En la configuración de despliegue:
   - *Build command:* (Dejar en blanco)
   - *Publish directory:* `.` (o dejar en blanco)
5. Presiona **"Deploy maguies-reparaciones"**.
6. ¡Listo! Tu página quedará activa inmediatamente con una URL pública como `https://maguies-reparaciones.netlify.app`.

### 3. Dónde ver los correos registrados
- En tu panel de Netlify, ve a la pestaña **Forms**.
- Verás el formulario con el nombre **`boletin-maguies`**.
- Cada vez que alguien ingrese su correo, aparecerá en esa lista y podrás descargarlo en formato **CSV o Excel**.
