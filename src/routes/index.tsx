import { createFileRoute } from "@tanstack/react-router";
import heroRosol from "@/assets/hero-rosol.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strefa Smaku Olecko — Domowe obiady, kuchnia polska" },
      {
        name: "description",
        content:
          "Strefa Smaku w Olecku — tradycyjna polska kuchnia, domowe obiady od 20 zł. Schabowy, rosół, karkówka z żurawiną. Na miejscu, na wynos i z dostawą. Zadzwoń: 724 811 142.",
      },
      { property: "og:title", content: "Strefa Smaku Olecko — Domowe obiady" },
      {
        property: "og:description",
        content:
          "Tradycyjna polska kuchnia w sercu Olecka. 4,5★ z 144 opinii. Otwarte od poniedziałku 11:00.",
      },
      { property: "og:type", content: "restaurant" },
    ],
  }),
  component: Index,
});

const PHONE = "724 811 142";
const PHONE_TEL = "+48724811142";
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Strefa+Smaku+1+Maja+3%2F1+Olecko";

const dishes = [
  {
    name: "Kotlet Schabowy",
    desc: "Klasyczny, z ziemniakami i kapustą zasmażaną.",
    price: "32 zł",
  },
  {
    name: "Rosół Tradycyjny",
    desc: "Na trzech rodzajach mięs, z domowym makaronem.",
    price: "14 zł",
  },
  {
    name: "Karkówka z Żurawiną",
    desc: "Pieczona w sosie własnym, podawana z kaszą.",
    price: "34 zł",
  },
  {
    name: "Grillowana Pierś z Kurczaka",
    desc: "Z zestawem surówek i młodymi ziemniakami.",
    price: "28 zł",
  },
  {
    name: "Schab Pieczony w Sosie",
    desc: "Powolnie pieczony, podawany z kaszą i buraczkami.",
    price: "30 zł",
  },
  {
    name: "Ryba Smażona",
    desc: "Świeży filet w chrupiącej panierce, frytki, surówka.",
    price: "32 zł",
  },
  {
    name: "Naleśniki z Serem",
    desc: "Puszysty twaróg, polewa czekoladowa, świeże owoce.",
    price: "22 zł",
  },
  {
    name: "Zestaw Obiadowy Dnia",
    desc: "Zupa + danie główne + kompot. Codziennie inny.",
    price: "26 zł",
  },
];

const marqueeItems = [
  "Kotlet Schabowy",
  "Rosół Domowy",
  "Karkówka z Żurawiną",
  "Naleśniki z Serem",
  "Schab Pieczony",
  "Ryba Smażona",
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-accent selection:text-accent-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="#" className="font-display text-2xl tracking-tighter uppercase text-accent">
            Strefa Smaku
          </a>
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest">
            <a href="#menu" className="hover:text-accent transition-colors">Menu</a>
            <a href="#opinie" className="hover:text-accent transition-colors">Opinie</a>
            <a href="#kontakt" className="hover:text-accent transition-colors">Kontakt</a>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="font-mono text-xs font-bold bg-foreground text-background px-4 py-2 rounded-full hover:bg-accent transition-colors"
          >
            {PHONE}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="px-2 py-1 bg-accent-soft text-accent text-[10px] font-mono font-bold rounded uppercase tracking-tighter">
                  Otwarte od pon. 11:00
                </span>
                <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
                  Olecko · 1 Maja 3/1
                </span>
                <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
                  ★ 4,5 (144 opinie)
                </span>
              </div>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter mb-8">
                Prawdziwy <br />
                <span className="text-accent">Smak Domu.</span>
              </h1>
              <p className="max-w-md text-lg text-pretty leading-relaxed mb-8 text-muted-foreground">
                Tradycyjna polska kuchnia w sercu Olecka. Świeże składniki,
                sprawdzone receptury i obiady od 20 zł, które smakują jak u mamy.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#menu"
                  className="px-8 py-4 bg-accent text-accent-foreground font-display uppercase tracking-widest text-sm hover:brightness-110 transition-all rounded-md"
                >
                  Zobacz Menu
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="px-8 py-4 border border-foreground/20 font-display uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-all rounded-md"
                >
                  Zarezerwuj stolik
                </a>
              </div>
            </div>
            <div className="w-full md:w-2/5 animate-fade-up [animation-delay:200ms]">
              <img
                src={heroRosol}
                alt="Tradycyjny polski rosół z makaronem podawany w Strefie Smaku w Olecku"
                width={800}
                height={1000}
                className="w-full aspect-[4/5] object-cover rounded-2xl ring-1 ring-foreground/5 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Marquee */}
      <div className="py-10 border-y border-foreground/5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="font-display text-4xl md:text-5xl uppercase tracking-tighter opacity-15">
                {item}
              </span>
              <span className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-accent">
                •
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Menu */}
      <section id="menu" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-between items-end mb-16">
            <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tighter">
              Nasze Specjały
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Ceny od 14 zł do 38 zł
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-8">
            {dishes.map((dish) => (
              <div key={dish.name} className="group cursor-default">
                <div className="flex justify-between items-start gap-6 border-b border-foreground/10 pb-4">
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-tight group-hover:text-accent transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{dish.desc}</p>
                  </div>
                  <span className="font-mono font-bold text-lg shrink-0">{dish.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="opinie" className="bg-accent text-accent-foreground py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="size-4 bg-accent-foreground" />
            ))}
            <div className="size-4 bg-accent-foreground/40" />
          </div>
          <blockquote className="font-display text-3xl md:text-5xl uppercase tracking-tight mb-10 leading-[0.95] text-balance">
            „Zaskoczyło mnie to miejsce. Naprawdę smaczny obiad w dobrych pieniądzach.
            Czysto i miła obsługa."
          </blockquote>
          <div className="font-mono text-xs uppercase tracking-[0.2em] opacity-80">
            — Jarosław Kalinowski · Lokalny Przewodnik Google
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-20 text-left">
            {[
              {
                quote: "Bar w piwnicy z wyglądem restauracji. Czysto i milutko. Menu typowo barowe.",
                author: "Adam Brow",
              },
              {
                quote: "Fajne niezatłoczone miejsce z dobrą kuchnią. Ceny ok.",
                author: "Marcin Błaszczak",
              },
              {
                quote:
                  "Polecone przez sąsiadów — wracam regularnie na obiad. Domowo i smacznie.",
                author: "Gość Strefy Smaku",
              },
            ].map((r) => (
              <div
                key={r.author}
                className="p-6 border border-accent-foreground/20 rounded-xl"
              >
                <p className="text-sm leading-relaxed mb-4">„{r.quote}"</p>
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                  — {r.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" className="pt-24 pb-40 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h4 className="font-display text-2xl uppercase tracking-tight">Zapraszamy</h4>
            <div className="font-mono text-sm space-y-2 text-muted-foreground">
              <p>Pon – Pt: 11:00 – 18:00</p>
              <p>Sob – Nd: 12:00 – 17:00</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Na miejscu", "Na wynos", "Dostawa bez kontaktu"].map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 border border-foreground/10 rounded-full text-[10px] font-mono uppercase tracking-widest"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-display text-2xl uppercase tracking-tight">Lokalizacja</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              ul. 1 Maja 3/1
              <br />
              19-400 Olecko
              <br />
              woj. warmińsko-mazurskie
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-xs uppercase tracking-widest border-b border-accent text-accent pb-1 hover:border-foreground hover:text-foreground transition-all"
            >
              Wyznacz trasę →
            </a>
          </div>
          <div className="space-y-6">
            <h4 className="font-display text-2xl uppercase tracking-tight">Kontakt</h4>
            <a
              href={`tel:${PHONE_TEL}`}
              className="block font-display text-3xl tracking-tight text-accent hover:brightness-110"
            >
              {PHONE}
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              facebook.com/strefasmaku
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Call to Action Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
        <div className="bg-foreground text-background shadow-2xl rounded-2xl p-2 flex items-center justify-between gap-2">
          <div className="pl-4 pr-2">
            <div className="font-mono text-[10px] uppercase text-background/50 tracking-widest">
              Zadzwoń i zamów
            </div>
            <div className="font-display text-lg tracking-wide">{PHONE}</div>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-display uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap"
          >
            Zadzwoń
          </a>
        </div>
      </div>
    </div>
  );
}
