import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, HelpCircle, AlertTriangle, Activity } from "lucide-react";
import Script from "next/script";

interface FaqItem {
  question: string;
  answer: string;
}

interface SeoContentProps {
  title: string;
  description: string;
  whatIsIt: {
    title: string;
    content: string;
  };
  whyItFails: {
    title: string;
    content: string;
  };
  howToInterpret: {
    title: string;
    content: string;
  };
  faqs: FaqItem[];
  applicationCategory?: string;
}

export function SeoContent({ title, description, whatIsIt, whyItFails, howToInterpret, faqs, applicationCategory = "UtilityApplication" }: SeoContentProps) {
  // Generate Schema.org JSON-LD
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    applicationCategory: applicationCategory,
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: description,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mt-16 max-w-4xl mx-auto space-y-8">
      {/* Schema Markup */}
      <Script id="software-app-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-semibold text-cyan-400">Useful Information</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* What is it? */}
        <Card className="p-6 bg-[#12121a] border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-gray-200">{whatIsIt.title}</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{whatIsIt.content}</p>
        </Card>

        {/* Why it fails? */}
        <Card className="p-6 bg-[#12121a] border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-medium text-gray-200">{whyItFails.title}</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{whyItFails.content}</p>
        </Card>
      </div>

      {/* How to interpret */}
      <Card className="p-6 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-cyan-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-medium text-gray-200">{howToInterpret.title}</h3>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{howToInterpret.content}</p>
      </Card>

      {/* FAQs */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-200 pl-2">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-cyan-500/20">
              <AccordionTrigger className="text-gray-300 hover:text-cyan-400 hover:no-underline px-4">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-400 px-4 pb-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
