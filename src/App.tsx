import { useEffect, useState } from 'react';
import { Check, Info, ShieldCheck } from 'lucide-react';
import { EligibilityQuiz } from './components/EligibilityQuiz';
import { RecoverySimulator } from './components/RecoverySimulator';
import { PayslipGuide } from './components/PayslipGuide';
import { PrescriptionCalculator } from './components/PrescriptionCalculator';
import { FaqSection } from './components/FaqSection';
import { ConsultationForm } from './components/ConsultationForm';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(ratio);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F5] text-stone-800">
      {/* Barra di avanzamento lettura (compositor-only transform) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 z-50 pointer-events-none">
        <div
          className="h-full bg-gold-500 origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Header Istituzionale (Top Bar Contract: 3 zone) */}
      <header className="sticky top-1 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-16">
            {/* Zona 1: Wordmark singolo con logo */}
            <a
              href="#"
              className="inline-flex items-center gap-2.5 font-serif font-bold text-navy-900 text-base sm:text-lg tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-900"
            >
              <img
                src="./assets/aistudio/logo_piccolo_fc815523.png"
                alt="Logo Studio Legale Golinelli"
                className="h-8 w-8 object-contain shrink-0"
              />
              <span>Studio Legale Golinelli</span>
            </a>

            {/* Zona 2: Navigazione sintetica su singola riga */}
            <nav
              className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
              aria-label="Navigazione sezioni"
            >
              <a
                href="#il-fatto"
                className="hover:text-navy-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Il Caso
              </a>
              <a
                href="#principio-diritto"
                className="hover:text-navy-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Principio
              </a>
              <a
                href="#strumenti-verifica"
                className="hover:text-navy-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Strumenti
              </a>
              <a
                href="#faq"
                className="hover:text-navy-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                FAQ
              </a>
            </nav>

            {/* Zona 3: Unica azione primaria */}
            <div className="flex items-center shrink-0">
              <a
                href="#consulenza"
                className="px-4 py-2 rounded-lg bg-navy-900 text-white text-xs sm:text-sm font-semibold hover:bg-navy-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900"
              >
                Valutazione
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section / Intestazione Articolo */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="legal-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#legal-grid)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          {/* Metadati editoriali senza pillole */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-400 mb-5">
            <span>Pubblico Impiego</span>
            <span aria-hidden="true">·</span>
            <span>Diritto Scolastico</span>
            <span aria-hidden="true">·</span>
            <span>Guida Interattiva</span>
          </div>

          <h1 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.15] text-white mb-6 max-w-4xl">
            Trattenuta del 2,5% in busta paga per supplenti e personale a termine: quando spetta il rimborso e come interrompere la prescrizione
          </h1>

          <p className="text-stone-200 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
            Chi ha lavorato con contratti a tempo determinato nella scuola o nei servizi educativi degli enti locali riscontra spesso nei propri cedolini una decurtazione del{' '}
            <strong className="text-white font-semibold">
              2,50% calcolata sull’80% della retribuzione lorda
            </strong>{' '}
            (pari a circa il 2% del lordo mensile), applicata a titolo di adeguamento al regime del Trattamento di Fine Rapporto (TFR).
          </p>

          {/* Box Sintesi Destinatari (senza border-l-4, con filetti orizzontali editoriali) */}
          <div className="border-y border-white/20 py-5 sm:py-6 max-w-3xl">
            <p className="text-sm sm:text-base text-stone-100 leading-relaxed">
              <strong className="text-gold-400 font-semibold">
                A chi si rivolge questo approfondimento:
              </strong>{' '}
              questo prelievo riguarda direttamente docenti supplenti, personale amministrativo, tecnico e ausiliario (ATA), educatori e insegnanti di religione con incarichi a termine —{' '}
              <em>inclusi coloro che oggi sono stati immessi in ruolo o che non prestano più servizio</em>{' '}
              — e incide in modo concreto sulle somme effettivamente percepite durante gli anni di precariato.
            </p>
          </div>
        </div>
      </section>

      {/* Contenuto Principale */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14 flex-1">
        {/* Sezione 01: Il fatto */}
        <article id="il-fatto" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 scroll-mt-24">
          <span className="block text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">
            01. Origine del contenzioso
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-5">
            Il fatto: la richiesta di restituzione dei lavoratori a termine
          </h2>

          <div className="space-y-4 text-stone-700 leading-relaxed text-base max-w-prose">
            <p>
              La vicenda nasce dall’iniziativa di alcuni lavoratori assunti con contratti a tempo determinato nel settore scolastico ed educativo (insegnanti, educatori e personale di sostegno), i quali avevano rilevato nei propri prospetti paga la riduzione mensile legata al regime TFR.
            </p>
            <p>
              A fronte del diniego opposto dall’amministrazione datrice di lavoro, i lavoratori hanno agito in giudizio chiedendo la cessazione della trattenuta e la restituzione delle somme indebitamente decurtate. Sia in primo grado (<strong>Tribunale di Roma, sentenza n. 7642/2025</strong>) sia in appello (<strong>Corte d’Appello di Roma, Sezione Lavoro, sentenza n. 4033/2026</strong>), i giudici hanno accolto le domande dei lavoratori a termine, allineandosi all’orientamento già espresso dalla <strong>Corte di Cassazione, Sezione Lavoro</strong> (<strong>ordinanze n. 11663/2023 e n. 19697/2023</strong>).
            </p>
          </div>

          {/* Riferimenti Giurisprudenziali con divisori hairline */}
          <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:pr-4 sm:border-r sm:border-stone-200">
              <span className="block text-xs font-semibold text-gold-600 uppercase tracking-wider">
                Legittimità
              </span>
              <span className="block font-semibold text-navy-900 text-sm mt-1">
                Cass. Civ., Sez. Lav.
              </span>
              <span className="block text-xs text-stone-600 mt-0.5 tabular-nums">
                Ord. n. 11663/2023 e n. 19697/2023
              </span>
            </div>
            <div className="sm:pr-4 sm:border-r sm:border-stone-200">
              <span className="block text-xs font-semibold text-gold-600 uppercase tracking-wider">
                Merito (I Grado)
              </span>
              <span className="block font-semibold text-navy-900 text-sm mt-1">
                Tribunale di Roma
              </span>
              <span className="block text-xs text-stone-600 mt-0.5 tabular-nums">
                Sentenza n. 7642/2025
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gold-600 uppercase tracking-wider">
                Merito (Appello)
              </span>
              <span className="block font-semibold text-navy-900 text-sm mt-1">
                Corte d’Appello di Roma
              </span>
              <span className="block text-xs text-stone-600 mt-0.5 tabular-nums">
                Sez. Lav., Sentenza n. 4033/2026
              </span>
            </div>
          </div>
        </article>

        {/* Sezione 02: Il principio di diritto */}
        <article
          id="principio-diritto"
          className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 scroll-mt-24"
        >
          <span className="block text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">
            02. Quadro normativo e giurisprudenziale
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-5">
            Il principio di diritto: perché la trattenuta non si applica ai contratti a termine
          </h2>

          <p className="text-stone-700 leading-relaxed text-base max-w-prose mb-8">
            Con il passaggio del pubblico impiego dall’indennità di buonuscita (TFS) al TFR, l’Accordo quadro del 29 luglio 1999 e il DPCM 20 dicembre 1999 (art. 1, comma 3) hanno introdotto una riduzione della retribuzione lorda pari al 2,50% sull’80% dell’imponibile, compensata da un incremento figurativo ai fini previdenziali e della liquidazione. La giurisprudenza ha chiarito che tale meccanismo non opera in modo uniforme, ma distingue nettamente tra personale stabile e personale precario:
          </p>

          {/* Griglia Comparativa */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Colonna 1 */}
            <div className="rounded-xl border border-navy-900 bg-[#F0F4F8] p-6 flex flex-col justify-between">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-2">
                  Contratti a Termine
                </span>
                <h3 className="font-serif text-lg font-bold text-navy-900 mb-2.5">
                  Disciplina speciale del TFR privato
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  L’art. 7 dell’Accordo quadro del 1999 e l’art. 1, comma 9, del DPCM 20 dicembre 1999 prevedono che ai rapporti a tempo determinato si applichino le regole del TFR proprie del settore privato,{' '}
                  <strong>senza alcun richiamo alla riduzione del 2,50%</strong>.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-navy-900/15 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Trattenuta non dovuta</span>
              </div>
            </div>

            {/* Colonna 2 */}
            <div className="rounded-xl border border-stone-200 bg-[#F9F8F5] p-6 flex flex-col justify-between">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                  Personale di Ruolo
                </span>
                <h3 className="font-serif text-lg font-bold text-navy-900 mb-2.5">
                  Inapplicabilità dell’invarianza retributiva
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  La riduzione serve a mantenere invariato lo stipendio netto tra dipendenti di ruolo in TFS e colleghi di ruolo passati al TFR (art. 26, c. 19, L. 448/1998; Corte Cost. n. 213/2018; Cass. ord. n. 19108/2023 e n. 19438/2023), ragion per cui è legittima{' '}
                  <strong>solo per il personale a tempo indeterminato</strong>.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-200 text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Valida solo dopo l’immissione in ruolo</span>
              </div>
            </div>

            {/* Colonna 3 */}
            <div className="rounded-xl border border-gold-500/40 bg-[#FCF9F2] p-6 flex flex-col justify-between">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gold-600 mb-2">
                  Diritto Europeo
                </span>
                <h3 className="font-serif text-lg font-bold text-navy-900 mb-2.5">
                  Tutela non discriminatoria
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Secondo la clausola 4 dell’accordo quadro allegato alla{' '}
                  <strong>Direttiva 1999/70/CE</strong>, il divieto di discriminazione impedisce di trattare i lavoratori a termine in modo peggiore rispetto agli stabili, ma non vieta una disciplina più favorevole giustificata dalla precarietà.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gold-500/20 text-xs font-semibold text-gold-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Principio di non regressione</span>
              </div>
            </div>
          </div>

          <div className="bg-navy-900 text-white rounded-xl p-6">
            <p className="text-sm sm:text-base leading-relaxed">
              <strong className="text-gold-400">In sintesi:</strong> in forza di tali principi, la Corte di Cassazione (ordinanze n. 11663/2023 e n. 19697/2023) e la Corte d’Appello di Roma (sentenza n. 4033/2026) hanno affermato che{' '}
              <strong>
                la trattenuta del 2,50% sulle retribuzioni dei contratti a tempo determinato è illegittima e va restituita
              </strong>
              , a prescindere dalla data di prima assunzione del lavoratore.
            </p>
          </div>
        </article>

        {/* Sezione 03: Strumenti Interattivi di Orientamento */}
        <section id="strumenti-verifica" className="space-y-8 scroll-mt-24">
          <div className="max-w-2xl">
            <span className="block text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">
              03. Orientamento pratico per il lavoratore
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
              Strumenti interattivi per verificare la tua posizione
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Utilizza i quattro strumenti operativi predisposti dal nostro Studio per effettuare un primo controllo autonomo sui tuoi contratti, sui cedolini e sui termini di prescrizione.
            </p>
          </div>

          <EligibilityQuiz />
          <RecoverySimulator />
          <PayslipGuide />
          <PrescriptionCalculator />
        </section>

        {/* Sezione 04: Riepilogo Operativo Passo-Passo */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10">
          <span className="block text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">
            04. Sintesi operativa
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-8">
            I quattro passi per tutelare i propri diritti
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#F9F8F5] border border-stone-200">
              <span className="block font-serif text-lg font-bold text-gold-600 mb-2 tabular-nums">
                01.
              </span>
              <h3 className="font-bold text-navy-900 text-base mb-1.5">
                Individuare i periodi di precariato
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Raccogliere tutti i contratti a tempo determinato (supplenze annuali, fino al termine delle attività didattiche o brevi) presso scuole statali o enti locali, anche se successivamente immessi in ruolo.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F9F8F5] border border-stone-200">
              <span className="block font-serif text-lg font-bold text-gold-600 mb-2 tabular-nums">
                02.
              </span>
              <h3 className="font-bold text-navy-900 text-base mb-1.5">
                Verificare le voci del cedolino
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Controllare le buste paga degli ultimi cinque anni verificando l’addebito mensile della voce{' '}
                <em>«TFR art. 1 c. 3 DPCM 20/12/1999 – 2,500 su 80»</em> o diciture equivalenti.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F9F8F5] border border-stone-200">
              <span className="block font-serif text-lg font-bold text-gold-600 mb-2 tabular-nums">
                03.
              </span>
              <h3 className="font-bold text-navy-900 text-base mb-1.5">
                Interrompere la prescrizione
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Inviare tempestivamente una diffida e messa in mora scritta tramite PEC o raccomandata A/R all’amministrazione competente, conservando la ricevuta di consegna.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F9F8F5] border border-stone-200">
              <span className="block font-serif text-lg font-bold text-gold-600 mb-2 tabular-nums">
                04.
              </span>
              <h3 className="font-bold text-navy-900 text-base mb-1.5">
                Valutazione tecnica preventiva
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Sottoporre contratti e cedolini a un esame legale per quantificare con esattezza il credito, gli interessi e l’opportunità di un ricorso al Giudice del Lavoro.
              </p>
            </div>
          </div>
        </section>

        {/* Sezione 05: FAQ Espandibili */}
        <FaqSection />

        {/* Sezione 06: Call to Action Finale & Modulo Richiesta */}
        <section
          id="consulenza"
          className="bg-navy-900 text-white rounded-2xl p-6 sm:p-10 scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Testo CTA */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <span className="block text-xs font-semibold uppercase tracking-widest text-gold-400">
                  Assistenza Legale Specializzata
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Hai lavorato come supplente o con contratti a termine? Verifica subito i tuoi cedolini prima che scada la prescrizione.
                </h2>
                <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                  Ogni mese che passa può comportare la perdita definitiva della mensilità più risalente del quinquennio. Se vuoi sapere con certezza se nei tuoi prospetti paga è stata applicata la trattenuta del 2,50% sul TFR, quantificare l’importo recuperabile e inviare correttamente l’atto di interruzione della prescrizione, contatta il nostro Studio per una valutazione preliminare della tua posizione.
                </p>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Analizzeremo nel dettaglio la tua documentazione per verificare la sussistenza del credito — valutando contestualmente eventuali ulteriori spettanze legate al precariato, come le ferie non godute o la reiterazione dei contratti — e illustrarti con chiarezza i passaggi più idonei per tutelare i tuoi diritti.
                </p>
              </div>

              {/* Checklist Documenti */}
              <div className="pt-5 border-t border-white/15">
                <span className="block text-xs font-semibold uppercase tracking-wider text-gold-400 mb-3">
                  Checklist documenti utili per la verifica
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-200">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Copia dei contratti a tempo determinato stipulati negli ultimi 5 anni;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Cedolini paga (NoiPA o ente locale) relativi ai periodi di supplenza;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Eventuali diffide o comunicazioni PEC già trasmesse all’amministrazione.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Modulo di Contatto */}
            <div className="lg:col-span-6">
              <ConsultationForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer Istituzionale */}
      <footer className="bg-navy-950 text-stone-400 border-t border-navy-900 py-10 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-navy-900 pb-6">
            <div>
              <span className="font-serif font-bold text-white text-lg block">
                Studio Legale Golinelli
              </span>
              <span className="text-xs text-stone-400">
                Diritto del Lavoro, Pubblico Impiego e Diritto Scolastico
              </span>
            </div>
            <div className="text-xs text-stone-400">
              Aggiornamento giurisprudenziale: Novembre 2026
            </div>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            <strong className="text-stone-300">Nota informativa e declinazione di responsabilità:</strong>{' '}
            i contenuti, i calcoli simulati e gli strumenti presenti in questa pagina hanno finalità esclusivamente divulgativa e informativa generale e non costituiscono parere legale vincolante né consulenza riferita a uno specifico caso concreto. L’esito di ogni eventuale azione stragiudiziale o giudiziale dipende dall’esame puntuale della documentazione contrattuale e retributiva del singolo lavoratore.
          </p>
        </div>
      </footer>
    </div>
  );
}
