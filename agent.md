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

- [ ] Integrar Stripe (pago único por acceso a Pro Tools)
- [ ] Crear producto en Stripe Dashboard
- [ ] Webhook opcional (si se usa login más adelante)
- [ ] Añadir Buy Me a Coffee (iframe o botón)

---

## 🧪 Extras opcionales

- [ ] Animaciones con `framer-motion`
- [ ] Responsive completo
- [ ] SEO básico (`next/head`, OG tags, título dinámico)
- [ ] Despliegue en Vercel + dominio `testyourmouse.com`
- [ ] Analíticas básicas (Google Analytics o similar)
- [ ] Pruebas unitarias con `Jest` y `React Testing Library`
- [ ] Configurar ESLint + Prettier
- [ ] Añadir alguna herramienta de feedback

---

## 🧠 Notas

- Todo debe funcionar **sin login** al principio
- Guardar histórico en `localStorage`
- Interfaz limpia, accesible y minimal
- Uso de `useEffect` para detección de eventos (`mousedown`, `mouseup`, `mousemove`, `wheel`, etc.)

---

## ✅ Estado actual

- [x] Proyecto creado
- [x] Layout funcional
- [x] Tabs en marcha
- [ ] Primer test implementado
