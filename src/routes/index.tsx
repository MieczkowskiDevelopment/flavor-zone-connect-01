import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
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
  { name: "Kotlet Schabowy", desc: "Klasyczny, z ziemniakami i kapustą zasmażaną.", price: "32 zł" },
  { name: "Rosół Tradycyjny", desc: "Na trzech rodzajach mięs, z domowym makaronem.", price: "14 zł" },
  { name: "Karkówka z Żurawiną", desc: "Pieczona w sosie własnym, podawana z kaszą.", price: "34 zł" },
  { name: "Grillowana Pierś z Kurczaka", desc: "Z zestawem surówek i młodymi ziemniakami.", price: "28 zł" },
  { name: "Schab Pieczony w Sosie", desc: "Powolnie pieczony, podawany z kaszą i buraczkami.", price: "30 zł" },
  { name: "Ryba Smażona", desc: "Świeży filet w chrupiącej panierce, frytki, surówka.", price: "32 zł" },
  { name: "Naleśniki z Serem", desc: "Puszysty twaróg, polewa czekoladowa, świeże owoce.", price: "22 zł" },
  { name: "Zestaw Obiadowy Dnia", desc: "Zupa + danie główne + kompot. Codziennie inny.", price: "26 zł" },
];

const marqueeItems = [
  "Kotlet Schabowy",
  "Rosół Domowy",
  "Karkówka z Żurawiną",
  "Naleśniki z Serem",
  "Schab Pieczony",
  "Ryba Smażona",
];

type ModalKey = "menu" | "kontakt" | "rezerwacja" | "galeria" | null;

function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        aria-label="Zamknij"
        onClick={onClose}
        className={`absolute inset-0 bg-background/60 backdrop-blur-2xl transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-foreground/10 bg-background/95 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.6)] ring-1 ring-accent/10 transition-all duration-300 ease-out ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 px-8 pt-8 pb-4 bg-gradient-to-b from-background via-background/95 to-transparent">
          <div>
            {eyebrow && (
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
                {eyebrow}
              </div>
            )}
            <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij modal"
            className="shrink-0 size-10 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent hover:rotate-90 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 1L13 13M13 1L1 13" />
            </svg>
          </button>
        </div>
        <div className="px-8 pb-10">{children}</div>
      </div>
    </div>
  );
}

function Index() {
  const [modal, setModal] = useState<ModalKey>(null);
  const open = (k: Exclude<ModalKey, null>) => setModal(k);
  const close = () => setModal(null);

  const navButtonCls =
    "relative font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-accent selection:text-accent-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-foreground/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-2xl tracking-tighter uppercase text-accent hover:brightness-110 transition-all"
          >
            Strefa Smaku
          </button>
          <div className="hidden md:flex gap-8">
            <button type="button" onClick={() => open("menu")} className={navButtonCls}>Menu</button>
            <button type="button" onClick={() => open("rezerwacja")} className={navButtonCls}>Rezerwacja</button>
            <button type="button" onClick={() => open("kontakt")} className={navButtonCls}>Kontakt</button>
          </div>
          <button
            type="button"
            onClick={() => open("kontakt")}
            className="group font-mono text-xs font-bold bg-foreground text-background px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:shadow-[0_8px_24px_-8px] hover:shadow-accent/60 hover:-translate-y-0.5"
          >
            <span className="inline-block transition-transform group-hover:scale-105">{PHONE}</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="px-2 py-1 bg-accent-soft text-accent text-[10px] font-mono font-bold rounded uppercase tracking-tighter">
                  <span className="inline-block size-1.5 rounded-full bg-accent mr-1.5 animate-pulse" />
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
                <button
                  type="button"
                  onClick={() => open("menu")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-display uppercase tracking-widest text-sm rounded-md transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_40px_-12px] hover:shadow-accent/60 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Zobacz Menu
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
                <button
                  type="button"
                  onClick={() => open("rezerwacja")}
                  className="px-8 py-4 border border-foreground/20 font-display uppercase tracking-widest text-sm hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 rounded-md hover:-translate-y-0.5"
                >
                  Zarezerwuj stolik
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/5 animate-fade-up [animation-delay:200ms]">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-foreground/5 shadow-2xl group">
                <img
                  src={heroRosol}
                  alt="Tradycyjny polski rosół z makaronem podawany w Strefie Smaku w Olecku"
                  width={800}
                  height={1000}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Marquee */}
      <div className="py-10 border-y border-foreground/5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="font-display text-4xl md:text-5xl uppercase tracking-tighter opacity-15 hover:opacity-100 hover:text-accent transition-all duration-500 cursor-default">
                {item}
              </span>
              <span className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-accent">
                •
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Quick actions strip */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-4">
          {[
            { key: "menu" as const, label: "Zobacz menu", sub: "Pełna karta dań" },
            { key: "rezerwacja" as const, label: "Rezerwacja", sub: "Zarezerwuj stolik" },
            { key: "kontakt" as const, label: "Kontakt", sub: "Telefon, adres" },
          ].map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => open(c.key)}
              className="group relative text-left p-6 rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:bg-accent/[0.06] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                {c.sub}
              </div>
              <div className="font-display text-2xl uppercase tracking-tight">
                {c.label}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                Otwórz
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
              <div className="absolute -right-10 -bottom-10 size-32 rounded-full bg-accent/0 group-hover:bg-accent/10 blur-2xl transition-all duration-500" />
            </button>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-accent text-accent-foreground py-24 px-6">
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
              { quote: "Bar w piwnicy z wyglądem restauracji. Czysto i milutko. Menu typowo barowe.", author: "Adam Brow" },
              { quote: "Fajne niezatłoczone miejsce z dobrą kuchnią. Ceny ok.", author: "Marcin Błaszczak" },
              { quote: "Polecone przez sąsiadów — wracam regularnie na obiad. Domowo i smacznie.", author: "Gość Strefy Smaku" },
            ].map((r) => (
              <div
                key={r.author}
                className="p-6 border border-accent-foreground/20 rounded-xl hover:bg-accent-foreground/5 hover:-translate-y-1 transition-all duration-300"
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

      {/* Footer CTA */}
      <section className="pt-24 pb-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-8">
            Wpadnij na <span className="text-accent">obiad.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Codziennie świeże dania, miła obsługa i ceny, których nie znajdziesz nigdzie indziej w Olecku.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={() => open("rezerwacja")}
              className="px-8 py-4 bg-accent text-accent-foreground font-display uppercase tracking-widest text-sm rounded-md hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px] hover:shadow-accent/60 transition-all duration-300"
            >
              Zarezerwuj stolik
            </button>
            <button
              type="button"
              onClick={() => open("kontakt")}
              className="px-8 py-4 border border-foreground/20 font-display uppercase tracking-widest text-sm rounded-md hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Kontakt
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Call to Action Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md">
        <div className="bg-foreground text-background shadow-2xl rounded-2xl p-2 flex items-center justify-between gap-2 ring-1 ring-foreground/20">
          <div className="pl-4 pr-2">
            <div className="font-mono text-[10px] uppercase text-background/50 tracking-widest">
              Zadzwoń i zamów
            </div>
            <div className="font-display text-lg tracking-wide">{PHONE}</div>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-display uppercase tracking-widest text-xs hover:scale-[1.04] active:scale-95 transition-all whitespace-nowrap"
          >
            Zadzwoń
          </a>
        </div>
      </div>

      {/* ============ MODALS ============ */}
      <Modal open={modal === "menu"} onClose={close} title="Nasze Specjały" eyebrow="Menu · Ceny 14–38 zł">
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 mt-2">
          {dishes.map((dish, i) => (
            <div
              key={dish.name}
              className="group animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex justify-between items-start gap-6 border-b border-foreground/10 pb-4">
                <div>
                  <h4 className="font-display text-xl uppercase tracking-tight group-hover:text-accent transition-colors">
                    {dish.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{dish.desc}</p>
                </div>
                <span className="font-mono font-bold text-base shrink-0">{dish.price}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Codziennie nowy zestaw obiadowy dnia. Zapytaj o danie z grilla.
        </p>
      </Modal>

      <Modal open={modal === "kontakt"} onClose={close} title="Kontakt" eyebrow="Strefa Smaku · Olecko">
        <div className="grid sm:grid-cols-2 gap-8 mt-2">
          <div className="space-y-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Telefon</div>
              <a
                href={`tel:${PHONE_TEL}`}
                className="font-display text-3xl text-accent hover:brightness-110 transition"
              >
                {PHONE}
              </a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Adres</div>
              <p className="text-sm leading-relaxed">
                ul. 1 Maja 3/1<br />19-400 Olecko<br />woj. warmińsko-mazurskie
              </p>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border-b border-accent text-accent pb-1 hover:gap-3 transition-all"
            >
              Wyznacz trasę <span>→</span>
            </a>
          </div>
          <div className="space-y-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Godziny</div>
              <div className="font-mono text-sm space-y-1">
                <p>Pon – Pt: 11:00 – 18:00</p>
                <p>Sob – Nd: 12:00 – 17:00</p>
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Forma</div>
              <div className="flex flex-wrap gap-2">
                {["Na miejscu", "Na wynos", "Dostawa bez kontaktu"].map((b) => (
                  <span key={b} className="px-3 py-1 border border-foreground/15 rounded-full text-[10px] font-mono uppercase tracking-widest hover:border-accent hover:text-accent transition-colors">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition"
            >
              facebook.com/strefasmaku →
            </a>
          </div>
        </div>
      </Modal>

      <Modal open={modal === "rezerwacja"} onClose={close} title="Rezerwacja Stolika" eyebrow="Zarezerwuj swoje miejsce">
        <ReservationForm onDone={close} />
      </Modal>

      <Modal open={modal === "galeria"} onClose={close} title="Galeria" eyebrow="Wnętrze · Kuchnia · Atmosfera">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-foreground/10 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <img
                src={heroRosol}
                alt={`Strefa Smaku — zdjęcie ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{
                  filter: `hue-rotate(${i * 18}deg) saturate(${0.8 + (i % 3) * 0.2})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                  Foto {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Pełna galeria dostępna na naszym Facebooku.
        </p>
      </Modal>
    </div>
  );
}

function ReservationForm({ onDone }: { onDone: () => void }) {
  const [sent, setSent] = useState(false);
  return sent ? (
    <div className="py-10 text-center animate-fade-up">
      <div className="mx-auto size-16 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-4 text-2xl">✓</div>
      <h4 className="font-display text-2xl uppercase tracking-tight mb-2">Dziękujemy!</h4>
      <p className="text-sm text-muted-foreground mb-6">
        Skontaktujemy się telefonicznie, aby potwierdzić rezerwację.
      </p>
      <button
        type="button"
        onClick={onDone}
        className="px-6 py-3 bg-accent text-accent-foreground font-display uppercase tracking-widest text-xs rounded-md hover:-translate-y-0.5 transition-all"
      >
        Zamknij
      </button>
    </div>
  ) : (
    <form
      className="grid sm:grid-cols-2 gap-4 mt-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {[
        { name: "name", label: "Imię i nazwisko", type: "text", required: true },
        { name: "phone", label: "Telefon", type: "tel", required: true },
        { name: "date", label: "Data", type: "date", required: true },
        { name: "time", label: "Godzina", type: "time", required: true },
      ].map((f) => (
        <label key={f.name} className="block">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            {f.label}
          </span>
          <input
            type={f.type}
            name={f.name}
            required={f.required}
            className="w-full px-4 py-3 bg-foreground/[0.04] border border-foreground/10 rounded-lg focus:outline-none focus:border-accent focus:bg-foreground/[0.06] transition-all"
          />
        </label>
      ))}
      <label className="block sm:col-span-2">
        <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Liczba osób
        </span>
        <input
          type="number"
          min={1}
          max={20}
          defaultValue={2}
          className="w-full px-4 py-3 bg-foreground/[0.04] border border-foreground/10 rounded-lg focus:outline-none focus:border-accent transition-all"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Uwagi (opcjonalnie)
        </span>
        <textarea
          rows={3}
          className="w-full px-4 py-3 bg-foreground/[0.04] border border-foreground/10 rounded-lg focus:outline-none focus:border-accent transition-all resize-none"
        />
      </label>
      <div className="sm:col-span-2 flex flex-wrap gap-3 mt-2">
        <button
          type="submit"
          className="px-8 py-4 bg-accent text-accent-foreground font-display uppercase tracking-widest text-sm rounded-md hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px] hover:shadow-accent/60 transition-all duration-300"
        >
          Wyślij rezerwację
        </button>
        <a
          href={`tel:${PHONE_TEL}`}
          className="px-8 py-4 border border-foreground/20 font-display uppercase tracking-widest text-sm rounded-md hover:bg-foreground hover:text-background transition-all"
        >
          Lub zadzwoń: {PHONE}
        </a>
      </div>
    </form>
  );
}
