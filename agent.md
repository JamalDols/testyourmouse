---
title: "TestYourMouse.com — Roadmap de Desarrollo"
author: "Pablo J. Dols"
---

# 🖱️ TestYourMouse.com

Proyecto en Next.js 16 + Tailwind para testear ratones online.  
Herramientas gratuitas + Pro Tools mediante Stripe + Donaciones.

---

## 🚀 Setup inicial

- [ ] Crear proyecto con Next.js 16 + App Router
- [ ] Instalar Tailwind CSS
- [ ] Crear estructura de carpetas:

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

- [ ] Añadir Tailwind base + colores personalizados si hace falta
- [ ] Configurar favicon + meta tags

---

## 🧩 Tabs públicas (gratuitas)

### 🟦 Click Visualizer

- [ ] Detectar clicks (izquierdo, derecho, medio)
- [ ] Mostrar contadores y logs en tiempo real

### 🟨 Double Click Test

- [ ] Mostrar doble click no intencionado
- [ ] Log de timestamps y velocidad entre clicks

### 🟥 CPS Tester

- [ ] Contador de clicks por segundo
- [ ] Modo 5s, modo 10s
- [ ] Mostrar ranking local

### 🟩 Scroll Test

- [ ] Detectar dirección, velocidad, cambios erráticos

### 🟪 Tracking & Jitter

- [ ] Dibujar líneas con el ratón
- [ ] Medir precisión (líneas rectas)
- [ ] Detectar jitter / micro-movimientos
- [ ] Test de arrastre mantenido

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
- [ ] Modo oscuro automático (`media` o `toggle`)
- [ ] Responsive completo
- [ ] SEO básico (`next/head`, OG tags, título dinámico)
- [ ] Despliegue en Vercel + dominio `testyourmouse.com`

---

## 📁 Estructura de archivos propuesta

components/
Tabs.tsx
ClickVisualizer.tsx
DoubleClickTest.tsx
CPSTest.tsx
ScrollTest.tsx
TrackingTest.tsx
ProTools.tsx

app/(tabs)/
page.tsx (redirección o selector inicial)
clicks/page.tsx
double-click/page.tsx
cps/page.tsx
scroll/page.tsx
tracking/page.tsx
pro/page.tsx

---

## 🧠 Notas

- Todo debe funcionar **sin login** al principio
- Guardar histórico en `localStorage`
- Interfaz limpia, accesible y minimal
- Uso de `useEffect` para detección de eventos (`mousedown`, `mouseup`, `mousemove`, `wheel`, etc.)

---

## ✅ Estado actual

- [ ] Proyecto creado
- [ ] Layout funcional
- [ ] Tabs en marcha
- [ ] Primer test implementado
