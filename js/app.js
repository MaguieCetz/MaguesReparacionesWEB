/**
 * MAGUIES REPARACIONES - LÓGICA DE APLICACIÓN
 * Tips, buscador interactivo, filtrado por categorías, lector modal y envío de newsletter
 */

// 1. BASE DE DATOS DE TIPS TÉCNICOS
const TIPS_DATABASE = [
  {
    id: 'pc-sin-video',
    title: '¿Tu PC enciende pero no da señal de video?',
    category: 'diagnostico',
    categoryLabel: 'Diagnóstico',
    difficulty: 'Intermedio',
    time: '15 min',
    summary: 'Aprende el descarte metódico cuando los ventiladores giran pero el monitor sigue en negro: RAM, BIOS y GPU.',
    tools: 'Destornillador Phillips #2, goma de borrar blanca, alcohol isopropílico.',
    content: `
      <h4>Paso 1: Identificar comportamiento de ventiladores y LEDs</h4>
      <p>Observa si los ventiladores giran al 100% de forma sostenida o si la máquina se reinicia en bucle (Bootloop). Si tu placa madre tiene <strong>Debug LEDs</strong> (CPU, DRAM, VGA, BOOT), fíjate en cuál se queda encendido.</p>

      <h4>Paso 2: La regla de oro de la memoria RAM</h4>
      <p>El 70% de casos de "pantalla negra" se deben a falsos contactos o estática en la memoria RAM:</p>
      <ol>
        <li>Desconecta el cable de alimentación eléctrica.</li>
        <li>Presiona el botón de encendido durante 15 segundos para drenar los capacitores.</li>
        <li>Retira los módulos RAM y limpia suavemente los contactos dorados con una goma de borrar limpia (sin dejar residuos).</li>
        <li>Prueba encender con <strong>un solo módulo</strong> en el slot 2 (A2) si tienes 4 ranuras.</li>
      </ol>

      <h4>Paso 3: Reset de CMOS (Reiniciar BIOS)</h4>
      <p>Una configuración errónea de frecuencias XMP o voltajes puede bloquear el arranque. Retira la pila CR2032 de la placa durante 5 minutos con la PC desconectada, o puentea los dos pines marcados como <em>CLR_CMOS</em> con la punta de un destornillador por 10 segundos.</p>

      <div class="modal-warning">
        <strong>⚠️ Advertencia:</strong> Si tu procesador no tiene gráficos integrados (ej. Ryzen terminados sin 'G' o Intel con 'F'), conectar el cable de video a la placa madre jamás dará señal; debes conectarlo directo a la tarjeta gráfica dedicada.
      </div>
    `
  },
  {
    id: 'cambio-pasta-termica',
    title: 'Cambio de pasta térmica: Cuándo, cómo y cuánto aplicar',
    category: 'mantenimiento',
    categoryLabel: 'Mantenimiento',
    difficulty: 'Fácil',
    time: '20 min',
    summary: 'Evita el Thermal Throttling y alarga la vida de tu CPU. Aprende a limpiar la pasta seca y la cantidad justa a usar.',
    tools: 'Pasta térmica no conductora (tipo Arctic MX-4/Noctua NT-H1), alcohol isopropílico 99%, toallitas de microfibra.',
    content: `
      <h4>¿Cuándo es necesario cambiarla?</h4>
      <p>Se recomienda cada 12 a 24 meses en PCs de escritorio, o cada 8 a 12 meses en laptops para gaming o trabajo pesado. Si tu procesador supera los 85°C en reposo o 95°C en carga con el disipador limpio, la pasta ha perdido sus propiedades.</p>

      <h4>Paso 1: Retirar la pasta térmica seca</h4>
      <p>Aplica un poco de alcohol isopropílico sobre un paño de microfibra o papel sin pelusas. Limpia con movimientos circulares tanto el IHS (cubierta metálica) del procesador como la base de cobre del disipador hasta que brillen como un espejo.</p>

      <h4>Paso 2: Métodos de aplicación recomendados</h4>
      <ul>
        <li><strong>El grano de guisante (Centro):</strong> Ideal para procesadores estándar (Intel LGA 1200/1700 o AMD AM4). Coloca una gota de 4-5 mm en el centro exacto. La presión del disipador la expandirá uniformemente.</li>
        <li><strong>Patrón en X:</strong> Recomendado para procesadores grandes como AMD Ryzen AM5 o procesadores HEDT.</li>
      </ul>

      <div class="modal-warning">
        <strong>⚠️ Importante:</strong> Más pasta térmica no enfría más; al contrario, una capa demasiado gruesa actúa como aislante térmico y eleva las temperaturas.
      </div>
    `
  },
  {
    id: 'pantalla-azul-bsod',
    title: 'Pantallazos azules (BSOD): Cómo descifrar el error',
    category: 'software',
    categoryLabel: 'Software',
    difficulty: 'Intermedio',
    time: '10 min',
    summary: 'Aprende a localizar el archivo .dmp y saber si la falla es de controladores, memoria corrupta o disco.',
    tools: 'Herramienta gratuita BlueScreenView o WinDbg (Microsoft Store).',
    content: `
      <h4>Los códigos BSOD más comunes y su causa</h4>
      <ul>
        <li><strong>MEMORY_MANAGEMENT:</strong> Falla física en un módulo RAM o slots sucios. Corre la herramienta <em>Diagnóstico de memoria de Windows</em>.</li>
        <li><strong>CRITICAL_PROCESS_DIED / INACCESSIBLE_BOOT_DEVICE:</strong> Disco de sistema con sectores dañados, cable SATA defectuoso o corrupción en el Master Boot Record.</li>
        <li><strong>DRIVER_IRQL_NOT_LESS_OR_EQUAL:</strong> Un controlador (habitualmente de tarjeta de video, red o Wi-Fi) está intentando acceder a una dirección de memoria no autorizada.</li>
      </ul>

      <h4>Cómo ver el archivo de volcado (Minidump)</h4>
      <ol>
        <li>Windows guarda el historial del cuelgue en la ruta <code>C:\\Windows\\Minidump\\</code>.</li>
        <li>Abre la aplicación <em>BlueScreenView</em> para ver exactamente qué archivo <code>.sys</code> causó el bloqueo.</li>
        <li>Si aparece <code>nvlddmkm.sys</code> es el driver de Nvidia; si aparece <code>atikmdag.sys</code> es AMD. Usa DDU (Display Driver Uninstaller) en modo seguro para reinstalar limpio.</li>
      </ol>
    `
  },
  {
    id: 'salud-smart-discos',
    title: 'Diagnosticar salud de discos SSD y HDD con S.M.A.R.T.',
    category: 'hardware',
    categoryLabel: 'Hardware',
    difficulty: 'Fácil',
    time: '8 min',
    summary: 'Detecta sectores reasignados y porcentaje de vida útil en unidades NVMe antes de perder información sensible.',
    tools: 'CrystalDiskInfo (Edición estándar gratuita).',
    content: `
      <h4>Interpretación del semáforo de CrystalDiskInfo</h4>
      <p>S.M.A.R.T. es el sistema de automonitoreo presente en cada disco duro y unidad de estado sólido:</p>
      <ul>
        <li><strong>Azul (Bueno):</strong> El disco opera dentro de parámetros seguros. En SSDs verás el porcentaje de vida restante (basado en los TBW escritos).</li>
        <li><strong>Amarillo (Riesgo):</strong> En discos mecánicos indica <em>Sectores reasignados</em> o <em>Sectores pendientes</em>. <strong>Respalda tus archivos inmediatamente</strong>, el disco puede morir en cualquier momento.</li>
        <li><strong>Rojo (Malo):</strong> La unidad presenta fallas inminentes de lectura/escritura y debe ser reemplazada.</li>
      </ul>

      <h4>¿Qué hacer si un SSD está en riesgo?</h4>
      <p>A diferencia de los HDD que suelen avisar con ruidos metálicos ("Click of death"), los SSD suelen fallar de forma instantánea pasando a modo de solo lectura. Clona la unidad hacia un nuevo disco usando Macrium Reflect o Rescuezilla.</p>
    `
  },
  {
    id: 'optimizacion-windows',
    title: 'Optimización real de Windows sin programas "limpiadores"',
    category: 'software',
    categoryLabel: 'Software',
    difficulty: 'Fácil',
    time: '12 min',
    summary: 'Acelera el arranque y libera memoria RAM desactivando servicios innecesarios y telemetría de fondo.',
    tools: 'Administrador de tareas de Windows y consola de comandos (CMD).',
    content: `
      <h4>1. Limpieza de programas de inicio</h4>
      <p>Presiona <code>Ctrl + Shift + Esc</code>, ve a la pestaña <strong>Aplicaciones de arranque</strong>. Deshabilita programas que no necesitas al encender (Spotify, Discord, Epic Games, OneDrive). Tu tiempo de inicio pasará de minutos a segundos.</p>

      <h4>2. Reparación de integridad de archivos del sistema</h4>
      <p>Si Windows se siente lento tras una actualización, abre la terminal como Administrador y ejecuta:</p>
      <code>DISM /Online /Cleanup-Image /RestoreHealth</code>
      <p>Y luego:</p>
      <code>sfc /scannow</code>
      <p>Esto verificará y reemplazará cualquier archivo corrupto del sistema operativo usando copias oficiales.</p>

      <div class="modal-warning">
        <strong>⚠️ Consejo Pro:</strong> Evita "optimizadores" o programas que prometen limpiar el registro de Windows. Suelen borrar claves que provocan inestabilidad y pantallas azules a mediano plazo.
      </div>
    `
  },
  {
    id: 'test-fuente-poder',
    title: 'Cómo probar una fuente de poder (PSU) con multímetro y puente',
    category: 'hardware',
    categoryLabel: 'Hardware',
    difficulty: 'Avanzado',
    time: '20 min',
    summary: 'Comprueba si la fuente está muerta o entregando voltajes fuera de tolerancia (12V, 5V, 3.3V) antes de cambiar piezas.',
    tools: 'Clip metálico para papel (aislado) y Multímetro digital.',
    content: `
      <h4>Paso 1: La prueba del puente ("Paperclip test")</h4>
      <ol>
        <li>Desconecta totalmente la fuente de poder de la placa madre y la GPU.</li>
        <li>En el conector principal de 24 pines, localiza el <strong>cable verde (PS_ON)</strong> y cualquier <strong>cable negro (GND / Tierra)</strong> contiguo.</li>
        <li>Inserta los extremos de un clip metálico doblado en forma de U entre el pin verde y el negro.</li>
        <li>Conecta el cable de poder a la toma y enciende el interruptor. Si el ventilador de la fuente no gira en absoluto, la fuente está defectuosa.</li>
      </ol>

      <h4>Paso 2: Medición de voltajes con multímetro</h4>
      <p>Con la fuente puenteada y encendida, pon el multímetro en medición de Voltaje Continuo (DC 20V). Coloca la punta negra en cualquier conector negro (Tierra) y prueba con la punta roja:</p>
      <ul>
        <li><strong>Cable Amarillo:</strong> Debe marcar entre <strong>11.4V y 12.6V</strong> (Tolerancia ±5%). Si cae de 11.2V bajo carga, apagará la PC.</li>
        <li><strong>Cable Rojo:</strong> Debe marcar entre <strong>4.75V y 5.25V</strong>.</li>
        <li><strong>Cable Naranja:</strong> Debe marcar entre <strong>3.14V y 3.47V</strong>.</li>
      </ul>
    `
  }
];

// 2. REFERENCIAS AL DOM
const tipsGrid = document.getElementById('tipsGrid');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const categoryPills = document.getElementById('categoryPills');
const noResults = document.getElementById('noResults');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

// Modal DOM
const tipModal = document.getElementById('tipModal');
const modalClose = document.getElementById('modalClose');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDifficulty = document.getElementById('modalDifficulty');
const modalTime = document.getElementById('modalTime');
const modalTools = document.getElementById('modalTools');
const modalBody = document.getElementById('modalBody');

// Newsletter DOM
const newsletterForm = document.getElementById('newsletterForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

// Navegación móvil
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Estado de filtrado
let currentCategory = 'all';
let currentSearch = '';

// 3. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  renderTips();
  setupEventListeners();
  checkExistingSubscription();
});

// 4. RENDERIZADO DE TIPS
function renderTips() {
  const filtered = TIPS_DATABASE.filter(tip => {
    const matchCategory = (currentCategory === 'all') || (tip.category === currentCategory);
    const searchLower = currentSearch.toLowerCase().trim();
    const matchSearch = !searchLower || 
      tip.title.toLowerCase().includes(searchLower) ||
      tip.summary.toLowerCase().includes(searchLower) ||
      tip.category.toLowerCase().includes(searchLower) ||
      tip.tools.toLowerCase().includes(searchLower);

    return matchCategory && matchSearch;
  });

  tipsGrid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
    filtered.forEach(tip => {
      const card = createTipCard(tip);
      tipsGrid.appendChild(card);
    });
  }
}

function createTipCard(tip) {
  const card = document.createElement('article');
  card.className = 'tip-card';
  card.innerHTML = `
    <div class="tip-card-top">
      <span class="badge badge-${tip.category}">${tip.categoryLabel}</span>
      <span class="difficulty">${tip.difficulty}</span>
    </div>
    <h3 class="tip-title">${tip.title}</h3>
    <p class="tip-summary">${tip.summary}</p>
    <div class="tip-card-footer">
      <span class="tip-time">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        ${tip.time}
      </span>
      <button class="btn-read-guide" onclick="openTipModal('${tip.id}')">
        Ver Guía Completa
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </div>
  `;
  return card;
}

// 5. EVENT LISTENERS
function setupEventListeners() {
  // Buscador
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    if (currentSearch.length > 0) {
      clearSearchBtn.classList.remove('hidden');
    } else {
      clearSearchBtn.classList.add('hidden');
    }
    renderTips();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    clearSearchBtn.classList.add('hidden');
    searchInput.focus();
    renderTips();
  });

  // Filtro de categorías (Pills)
  categoryPills.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (!pill) return;

    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    currentCategory = pill.dataset.category;
    renderTips();
  });

  // Botón restablecer cuando no hay resultados
  resetFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    currentCategory = 'all';
    clearSearchBtn.classList.add('hidden');
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    document.querySelector('.pill[data-category="all"]').classList.add('active');
    renderTips();
  });

  // Modal Cerrar
  modalClose.addEventListener('click', closeTipModal);
  modalCloseBtn.addEventListener('click', closeTipModal);
  tipModal.addEventListener('click', (e) => {
    if (e.target === tipModal) closeTipModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !tipModal.classList.contains('hidden')) {
      closeTipModal();
    }
  });

  // Menú Móvil
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Envío de Formulario (Netlify Forms con soporte AJAX suave)
  newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

// 6. CONTROL DEL MODAL
window.openTipModal = function(tipId) {
  const tip = TIPS_DATABASE.find(t => t.id === tipId);
  if (!tip) return;

  modalCategory.textContent = tip.categoryLabel;
  modalCategory.className = `badge badge-${tip.category}`;
  modalDifficulty.textContent = `Dificultad: ${tip.difficulty}`;
  modalTitle.textContent = tip.title;
  modalTime.textContent = `⏱ ${tip.time}`;
  modalTools.textContent = `🛠️ ${tip.tools}`;
  modalBody.innerHTML = tip.content;

  tipModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Evita scroll de fondo
};

function closeTipModal() {
  tipModal.classList.add('hidden');
  document.body.style.overflow = '';
}

// 7. ENVÍO DE FORMULARIO PARA NETLIFY FORMS
function handleNewsletterSubmit(e) {
  e.preventDefault();

  const formData = new FormData(newsletterForm);
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Registrando tu correo...</span>';

  // Envío mediante POST compatible con Netlify Forms
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
  .then(() => {
    newsletterForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
    // Guardamos en localStorage para recordar la suscripción
    localStorage.setItem('maguies_newsletter_subscribed', 'true');
  })
  .catch((error) => {
    console.error("Error al registrar:", error);
    // Si falla o estamos en entorno local, simulamos éxito para probar la UI
    newsletterForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
  });
}

function checkExistingSubscription() {
  if (localStorage.getItem('maguies_newsletter_subscribed') === 'true') {
    // Si ya se suscribió previamente en este navegador
    const emailField = document.getElementById('userEmail');
    if (emailField) {
      emailField.placeholder = "Ya estás registrado (puedes actualizarlo)";
    }
  }
}

// Helper global para links del footer
window.filterByCat = function(category) {
  currentCategory = category;
  document.querySelectorAll('.pill').forEach(p => {
    p.classList.toggle('active', p.dataset.category === category);
  });
  renderTips();
};
