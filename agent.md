---
title: "TestYourMouse.com — Roadmap de Desarrollo"
author: "Pablo J. Dols"
---

# 🖱️ TestYourMouse.com

Proyecto en Next.js 16 + Tailwind para testear ratones online.  
Herramientas gratuitas + Pro Tools mediante Stripe + Donaciones.

---

## 🚀 Setup inicial

- [x] Crear proyecto con Next.js 16 + App Router
- [x] Instalar Tailwind CSS
- [x] Crear estructura de carpetas:

/app
/(tabs)
/clicks
/double-click
/cps
/scroll
/tracking
/pro
/components
/lib
/public

- [x] Añadir Tailwind base + colores personalizados si hace falta
- [ ] Configurar favicon + meta tags

---

## 🧩 Tabs públicas (gratuitas)

### 🟦 Click Visualizer

- [x] Detectar clicks (izquierdo, derecho, medio)
- [x] Mostrar contadores y logs en tiempo real

### 🟨 Double Click Test

- [x] Mostrar doble click no intencionado
- [x] Log de timestamps y velocidad entre clicks

### 🟥 CPS Tester

- [x] Contador de clicks por segundo
- [x] Modo 5s, modo 10s
- [x] Mostrar ranking local

### 🟩 Scroll Test

- [x] Detectar dirección, velocidad, cambios erráticos

### 🟪 Tracking & Jitter

- [x] Dibujar líneas con el ratón
- [x] Medir precisión (líneas rectas)
- [x] Detectar jitter / micro-movimientos
- [x] Test de arrastre mantenido

---

## 🔒 Tabs Pro

**Acceso bloqueado hasta pago único vía Stripe**

### 🧾 Pro Tools

- [ ] Exportar informe PDF/JSON con resultados
- [ ] Guardar tests locales
- [ ] Comparativa entre ratones

---

## 💰 Monetización

- [x] Integrar Stripe (pago único por acceso a Pro Tools)
- [x] Crear producto en Stripe Dashboard
- [ ] Añadir Buy Me a Coffee (iframe o botón)
- [ ] Poner stripe en producción

---

## 🧪 Extras opcionales

- [ ] Animaciones con `framer-motion`
- [ ] Responsive completo
- [ ] SEO básico (`next/head`, OG tags, título dinámico, OG Dinámicas)
- [x] Despliegue en Vercel + dominio `testyourmouse.com`
- [x] Analíticas básicas (Google Analytics o similar)
- [x] Cambiar el precio a $4.99 en toda la web
- [x] Configurar ESLint + Prettier
- [ ] Pruebas unitarias con `Jest` y `React Testing Library`
- [ ] Añadir alguna herramienta de feedback
- [ ] Las notificaciones tienen que tener fondo
- [ ] Revisar que llega el mail cuando pagas
- [ ] En el CPS_ANALYZER mejorar el comportamiento
