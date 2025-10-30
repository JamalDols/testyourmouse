"use client";

import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Mouse, Zap, Target, MousePointer2, Activity, Gauge, Lock, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface HomeProps {
  onNavigateToTool: (tool: string) => void;
}

export function Home({ onNavigateToTool }: HomeProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-8" aria-labelledby="hero-heading">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Mouse className="w-20 h-20 text-cyan-400" aria-hidden="true" />
            <div className="absolute inset-0 w-20 h-20 text-cyan-400 animate-ping opacity-20" aria-hidden="true">
              <Mouse className="w-20 h-20" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 id="hero-heading" className="text-4xl md:text-5xl">
            <span className="text-cyan-400" aria-hidden="true">
              &gt;_
            </span>{" "}
            TestYourMouse
          </h1>
          <p className="text-xl text-purple-400 font-mono tracking-wide">La suite profesional para testear tu ratón</p>
        </div>

        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Descubre el verdadero rendimiento de tu ratón con herramientas profesionales diseñadas para gamers competitivos y entusiastas del hardware. Mide, analiza y optimiza cada aspecto de tu
          periférico más importante.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-4" role="list" aria-label="Características principales">
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/50 font-mono px-4 py-1.5" role="listitem">
            100% GRATIS
          </Badge>
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/50 font-mono px-4 py-1.5" role="listitem">
            SIN REGISTRO
          </Badge>
          <Badge className="bg-green-500/10 text-green-400 border-green-500/50 font-mono px-4 py-1.5" role="listitem">
            NAVEGADOR
          </Badge>
        </div>
      </section>

      {/* Why Test Your Mouse */}
      <Card className="p-8 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-cyan-500/30" role="article" aria-labelledby="why-section">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-cyan-400" aria-hidden="true" />
          <h2 id="why-section" className="text-2xl text-cyan-400">
            [POR_QUÉ_TESTEAR_TU_RATÓN]
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-gray-300">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="text-cyan-400 font-mono text-sm mb-1">// Detecta problemas de hardware</p>
                <p className="text-sm text-gray-400">Identifica fallos en clicks, doble click involuntario, o problemas con el sensor antes de que afecten tu rendimiento.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="text-cyan-400 font-mono text-sm mb-1">// Optimiza tu configuración</p>
                <p className="text-sm text-gray-400">Descubre tu DPI real, polling rate efectivo y ajusta la configuración perfecta para tu estilo de juego.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="text-cyan-400 font-mono text-sm mb-1">// Mejora tu rendimiento</p>
                <p className="text-sm text-gray-400">Mide tu velocidad de clicks (CPS), tiempo de reacción y precisión para llevar tu gameplay al siguiente nivel.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="text-cyan-400 font-mono text-sm mb-1">// Compara y compite</p>
                <p className="text-sm text-gray-400">Benchmarkea tu ratón contra otros modelos y compite con la comunidad para alcanzar los mejores scores.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Free Tools */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl text-cyan-400">[HERRAMIENTAS_GRATUITAS]</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6 bg-[#12121a] border-cyan-500/30 hover:border-cyan-500/50 transition-all hover:glow-cyan group cursor-pointer" onClick={() => onNavigateToTool("click-visualizer")}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors">
                <MousePointer2 className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-cyan-400 font-mono">Click Visualizer</h3>
            </div>
            <p className="text-sm text-gray-400">Visualiza todos tus clicks en tiempo real. Detecta doble clicks involuntarios y patrones de uso.</p>
          </Card>

          <Card className="p-6 bg-[#12121a] border-cyan-500/30 hover:border-cyan-500/50 transition-all hover:glow-cyan group cursor-pointer" onClick={() => onNavigateToTool("double-click")}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors">
                <Mouse className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-cyan-400 font-mono">Double Click Test</h3>
            </div>
            <p className="text-sm text-gray-400">Testea la estabilidad de tus clicks. Identifica si tu ratón sufre de doble click no deseado.</p>
          </Card>

          <Card className="p-6 bg-[#12121a] border-cyan-500/30 hover:border-cyan-500/50 transition-all hover:glow-cyan group cursor-pointer" onClick={() => onNavigateToTool("cps-test")}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-cyan-400 font-mono">CPS Test</h3>
            </div>
            <p className="text-sm text-gray-400">Mide tu velocidad de clicks por segundo. Perfecto para gamers que necesitan clicks rápidos.</p>
          </Card>

          <Card className="p-6 bg-[#12121a] border-cyan-500/30 hover:border-cyan-500/50 transition-all hover:glow-cyan group cursor-pointer" onClick={() => onNavigateToTool("scroll-test")}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors">
                <Activity className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-cyan-400 font-mono">Scroll Test</h3>
            </div>
            <p className="text-sm text-gray-400">Evalúa la precisión y suavidad de tu rueda de scroll con métricas detalladas.</p>
          </Card>

          <Card className="p-6 bg-[#12121a] border-cyan-500/30 hover:border-cyan-500/50 transition-all hover:glow-cyan group cursor-pointer" onClick={() => onNavigateToTool("tracking-jitter")}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors">
                <Target className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-cyan-400 font-mono">Tracking & Jitter</h3>
            </div>
            <p className="text-sm text-gray-400">Analiza la precisión del sensor y detecta jitter o aceleración no deseada.</p>
          </Card>

          <Card
            className="p-6 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border-purple-500/50 hover:border-purple-500 transition-all glow-purple group cursor-pointer"
            onClick={() => onNavigateToTool("pro-tools")}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/50 group-hover:border-purple-500/70 transition-colors">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-purple-400 font-mono">Pro Tools</h3>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 font-mono text-xs">€5</Badge>
            </div>
            <p className="text-sm text-gray-400">Herramientas profesionales avanzadas: Reaction Time, Sensor Analysis, Response Graph y más.</p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="p-8 text-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/50 glow-cyan">
        <h2 className="text-2xl mb-3 text-cyan-400">[READY_TO_START]</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Todas las herramientas están listas para usar. No necesitas registrarte ni descargar nada. Simplemente selecciona una herramienta de arriba y comienza a testear.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
            <ArrowRight className="w-4 h-4 text-cyan-400" />
            <span>Selecciona una pestaña arriba para empezar</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cyan-500/20">
          <p className="text-xs text-gray-500 font-mono">OPEN_SOURCE • NO_ADS • PRIVACY_FIRST • MADE_FOR_GAMERS</p>
        </div>
      </Card>

      {/* Who Is This For */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-[#12121a] border-cyan-500/30 text-center">
          <div className="w-12 h-12 bg-cyan-500/10 rounded-lg border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
            <Gauge className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-cyan-400 font-mono mb-2">Gamers Competitivos</h3>
          <p className="text-sm text-gray-400">Optimiza tu equipo y asegúrate de que tu hardware no te limite en partidas cruciales.</p>
        </Card>

        <Card className="p-6 bg-[#12121a] border-cyan-500/30 text-center">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-purple-400 font-mono mb-2">Tech Enthusiasts</h3>
          <p className="text-sm text-gray-400">Analiza y compara el rendimiento real de diferentes ratones antes de tu próxima compra.</p>
        </Card>

        <Card className="p-6 bg-[#12121a] border-cyan-500/30 text-center">
          <div className="w-12 h-12 bg-green-500/10 rounded-lg border border-green-500/30 flex items-center justify-center mx-auto mb-4">
            <Activity className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-green-400 font-mono mb-2">Hardware Reviewers</h3>
          <p className="text-sm text-gray-400">Herramientas profesionales para crear reviews detallados con datos objetivos y medibles.</p>
        </Card>
      </div>
    </div>
  );
}
