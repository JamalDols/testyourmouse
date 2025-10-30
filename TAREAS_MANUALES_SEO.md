# 📋 Tareas Manuales Pendientes - SEO y Accesibilidad

## ✅ Completado Automáticamente

He implementado las siguientes optimizaciones:

### SEO

- ✅ Metadata completa (Open Graph, Twitter Cards, keywords)
- ✅ Sitemap.xml dinámico
- ✅ Robots.txt configurado
- ✅ Manifest.json para PWA
- ✅ Schema.org structured data (WebSite, WebApplication, FAQPage)
- ✅ Canonical URLs
- ✅ Preconnect a Google Fonts

### Accesibilidad

- ✅ Roles ARIA (banner, main, contentinfo, tablist, tabpanel)
- ✅ aria-label en elementos interactivos
- ✅ aria-hidden en iconos decorativos
- ✅ Tags semánticos HTML5 (header, main, footer, section, article)
- ✅ Lang="es" en HTML
- ✅ Páginas de error (error.tsx, not-found.tsx, loading.tsx)

---

## 🔴 TAREAS QUE DEBES HACER TÚ

### 1. Imágenes y Assets (CRÍTICO)

**Crear estos archivos en `/public/`:**

#### Favicon e Íconos

```
/public/favicon.ico          (32x32 o 16x16)
/public/icon.png             (32x32)
/public/apple-icon.png       (180x180)
/public/icon-192.png         (192x192 para PWA)
/public/icon-512.png         (512x512 para PWA)
```

#### Open Graph / Social Media

```
/public/og-image.png         (1200x630 - Imagen para redes sociales)
```

**Contenido sugerido:** Logo de TestYourMouse + texto "Testea tu ratón como un pro" + elementos gaming/tech

#### Screenshots PWA

```
/public/screenshot-1.png     (1280x720 - Screenshot de la aplicación)
```

**Herramientas recomendadas:**

- Favicon: https://favicon.io
- Iconos: https://realfavicongenerator.net
- OG Images: Canva, Figma, o Photoshop

---

### 2. Dominio y Hosting

**Actualizar URLs en estos archivos cuando tengas dominio real:**

#### `/app/layout.tsx` - Línea ~13

```typescript
metadataBase: new URL("https://testyourmouse.com"),  // ← Cambia esto
```

#### `/app/sitemap.ts` - Línea ~4

```typescript
const baseUrl = "https://testyourmouse.com"; // ← Cambia esto
```

#### `/app/robots.ts` - Línea ~9

```typescript
sitemap: 'https://testyourmouse.com/sitemap.xml',  // ← Cambia esto
```

#### `/app/page.tsx` - Structured data (múltiples líneas)

```typescript
// Busca todas las URLs y reemplaza:
"https://testyourmouse.com" → tu dominio real
```

---

### 3. Google Search Console

**Una vez en producción:**

1. **Registrar sitio:**

   - Ir a https://search.google.com/search-console
   - Añadir propiedad con tu dominio
   - Verificar propiedad (método HTML tag recomendado)

2. **Enviar sitemap:**

   ```
   https://tudominio.com/sitemap.xml
   ```

3. **Solicitar indexación:**
   - Usa la herramienta "Inspección de URLs"
   - Pide indexación de las páginas principales

---

### 4. Analytics y Seguimiento

**Agregar en `/app/layout.tsx` antes de `</head>`:**

#### Google Analytics 4

```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

#### Microsoft Clarity (recomendado para gaming)

```tsx
<Script id="clarity" strategy="afterInteractive">
  {`
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "TU_CLARITY_ID");
  `}
</Script>
```

---

### 5. Redes Sociales

**Crear cuentas y actualizar:**

#### Twitter/X

```typescript
// En /app/layout.tsx, línea ~67
twitter: {
  creator: "@testyourmouse",  // ← Tu handle real
}
```

#### Crear perfiles en:

- Twitter/X: @testyourmouse
- Instagram (opcional): @testyourmouse
- Discord (comunidad gaming recomendado)
- Reddit (subreddits gaming)

---

### 6. Performance Optimization

**Después del deploy, ejecutar:**

1. **Lighthouse Audit:**

   ```bash
   # Chrome DevTools > Lighthouse
   # Objetivo: 90+ en todas las categorías
   ```

2. **PageSpeed Insights:**

   - https://pagespeed.web.dev/
   - Analiza tu URL real
   - Sigue recomendaciones específicas

3. **Core Web Vitals:**
   - LCP < 2.5s (Largest Contentful Paint)
   - FID < 100ms (First Input Delay)
   - CLS < 0.1 (Cumulative Layout Shift)

---

### 7. Configuración de CDN y Caché

**Si usas Vercel (recomendado):**

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/(.*)\\.(jpg|jpeg|png|gif|webp|svg|ico)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

### 8. Accesibilidad - Testing Manual

**Herramientas para validar:**

1. **WAVE (Web Accessibility Evaluation Tool):**

   - https://wave.webaim.org/
   - Ejecuta en tu sitio en producción

2. **axe DevTools:**

   - Extensión Chrome/Firefox
   - Analiza automáticamente

3. **Lighthouse Accessibility:**

   - Chrome DevTools
   - Objetivo: 100/100

4. **Lectores de pantalla (testing):**
   - NVDA (Windows - gratuito)
   - JAWS (Windows - comercial)
   - VoiceOver (macOS/iOS - incluido)
   - TalkBack (Android - incluido)

**Checklist manual:**

- [ ] Navegación completa con solo teclado (Tab, Enter, Space, Arrows)
- [ ] Todos los botones tienen labels descriptivos
- [ ] Los colores tienen contraste suficiente (WCAG AA: 4.5:1)
- [ ] Los videos tienen subtítulos (si añades en el futuro)
- [ ] Los enlaces indican claramente su destino

---

### 9. SEO - Contenido Adicional Recomendado

**Crear páginas/secciones nuevas:**

1. **Blog sobre gaming/hardware:**

   - `/app/blog/page.tsx`
   - Artículos: "Cómo elegir un ratón gaming", "DPI vs eDPI explicado", etc.
   - Genera tráfico orgánico

2. **Página de FAQ completa:**

   - `/app/faq/page.tsx`
   - 20-30 preguntas frecuentes expandidas

3. **Página "Sobre Nosotros":**

   - `/app/about/page.tsx`
   - Historia, misión, equipo

4. **Comparativas:**
   - `/app/compare/page.tsx`
   - Comparador de ratones gaming

---

### 10. Buy Me a Coffee - Configuración Real

**Actualizar en `/app/page.tsx`:**

```tsx
// Línea ~174
<a href="https://www.buymeacoffee.com/TUNOMBRE" // ← Tu cuenta real
```

**Crear cuenta:**

1. Ir a https://www.buymeacoffee.com
2. Crear cuenta
3. Personalizar perfil
4. Obtener tu URL única

---

### 11. Legal (Obligatorio en EU)

**Crear páginas legales:**

1. **Política de Privacidad** (`/app/privacy/page.tsx`)

   - Qué datos recoges (localStorage para PRO unlock)
   - Uso de Analytics/Clarity
   - Cookies

2. **Términos de Servicio** (`/app/terms/page.tsx`)

   - Uso de la aplicación
   - Limitación de responsabilidad

3. **Cookie Consent Banner:**

   ```bash
   npm install react-cookie-consent
   ```

   Agregar banner en layout.tsx

4. **Agregar enlaces en footer:**

```tsx
<footer>
  <p>© 2025 TestYourMouse.com</p>
  <div>
    <Link href="/privacy">Privacidad</Link> |<Link href="/terms">Términos</Link>
  </div>
</footer>
```

---

### 12. Testing Cross-Browser

**Validar en:**

- [ ] Chrome (Windows/Mac)
- [ ] Firefox (Windows/Mac)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Windows)
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

**Aspectos críticos:**

- Detección de clicks funciona en todos
- Scroll test funciona correctamente
- Tracking no tiene lag
- Estilos se ven consistentes

---

### 13. Monitoreo y Uptime

**Configurar alertas:**

1. **UptimeRobot** (gratuito):

   - https://uptimerobot.com
   - Monitor HTTP cada 5 minutos
   - Alertas por email si cae

2. **Sentry** (errores JavaScript):
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard -i nextjs
   ```

---

### 14. Backlinks y Promoción

**Estrategia de lanzamiento:**

1. **Reddit:**

   - r/MouseReview
   - r/Gaming
   - r/CompetitiveGaming
   - Postea con valor, no spam

2. **Gaming Forums:**

   - overclock.net
   - Linus Tech Tips Forums

3. **YouTube Gaming Channels:**

   - Contacta reviewers de hardware
   - Ofrece tu herramienta como recurso

4. **Product Hunt:**
   - Lanza cuando tengas todo listo
   - Prepara buenos screenshots

---

## 🎯 Checklist de Lanzamiento Final

Antes de anunciar públicamente:

- [ ] Todos los iconos/imágenes creados
- [ ] Dominio configurado y SSL activo
- [ ] Google Search Console configurado
- [ ] Analytics instalado y funcionando
- [ ] Sitemap enviado a Google
- [ ] Testing en todos los navegadores
- [ ] Testing de accesibilidad (WAVE + axe)
- [ ] Lighthouse score 90+ en todas las categorías
- [ ] Páginas legales creadas (Privacy + Terms)
- [ ] Links de redes sociales actualizados
- [ ] Buy Me a Coffee configurado
- [ ] Error tracking configurado (Sentry)
- [ ] Uptime monitoring activo
- [ ] OG image se ve bien en previews sociales

---

## 📧 Soporte

Si necesitas ayuda con alguna de estas tareas, puedes:

- Crear issues en GitHub
- Consultar documentación de Next.js
- Preguntar en comunidades de desarrollo web

**¡Buena suerte con el lanzamiento! 🚀**
