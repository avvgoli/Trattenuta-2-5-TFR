import { useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, RotateCcw } from 'lucide-react';

type Q1Val = 'termine' | 'solo_ruolo' | null;
type Q2Val = 'scuola_enti' | 'altro' | null;
type Q3Val = 'ultimi_5' | 'oltre_5' | null;

export function EligibilityQuiz() {
  const [q1, setQ1] = useState<Q1Val>(null);
  const [q2, setQ2] = useState<Q2Val>(null);
  const [q3, setQ3] = useState<Q3Val>(null);

  const reset = () => {
    setQ1(null);
    setQ2(null);
    setQ3(null);
  };

  const renderResult = () => {
    if (!q1 || !q2 || !q3) {
      return (
        <div className="mt-6 p-5 rounded-xl bg-[#F3F1EC] border border-stone-200 text-sm text-stone-600">
          Seleziona una risposta per ciascuna delle tre domande per visualizzare un primo orientamento sulla tua posizione.
        </div>
      );
    }

    if (q1 === 'solo_ruolo') {
      return (
        <div className="mt-6 p-5 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-950 leading-relaxed flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="block font-semibold mb-1">Esito orientativo: trattenuta generalmente legittima</strong>
            Secondo la Corte costituzionale (sent. n. 213/2018) e la Cassazione (ord. n. 19108 e n. 19438/2023), per il personale assunto esclusivamente a tempo indeterminato in regime TFR la riduzione del 2,50% è legittima. Il rimborso spetta solo per eventuali periodi pregressi svolti con contratti a termine.
          </div>
        </div>
      );
    }

    if (q2 === 'altro') {
      return (
        <div className="mt-6 p-5 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-950 leading-relaxed flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="block font-semibold mb-1">Esito orientativo: ambito normativo diverso</strong>
            La giurisprudenza analizzata riguarda il personale a termine del pubblico impiego (scuole statali ed enti locali) soggetto al DPCM 20 dicembre 1999. Occorre verificare il contratto collettivo applicato al tuo settore.
          </div>
        </div>
      );
    }

    if (q3 === 'oltre_5') {
      return (
        <div className="mt-6 p-5 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-950 leading-relaxed flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="block font-semibold mb-1">Esito orientativo: probabile intervenuta prescrizione</strong>
            I crediti retributivi nel pubblico impiego si prescrivono in 5 anni (art. 2948, n. 4, c.c.). In assenza di atti interruttivi scritti (PEC o raccomandata A/R) inviati entro il quinquennio, le mensilità più risalenti risultano generalmente prescritte.
          </div>
        </div>
      );
    }

    return (
      <div className="mt-6 p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-950 leading-relaxed flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <strong className="block font-semibold mb-1">Esito orientativo: sussistono i presupposti generali per una verifica</strong>
          Sulla base delle risposte fornite, rientri nella casistica tutelata dalla Corte di Cassazione (ord. n. 11663/2023 e n. 19697/2023) e dalla Corte d’Appello di Roma (sent. n. 4033/2026). Ti consigliamo di verificare nei cedolini la presenza della voce TFR e interrompere tempestivamente la prescrizione, ferma restando la necessaria analisi documentale del singolo caso.
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold text-gold-600 uppercase tracking-widest">
            Strumento 1 di 4
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 mt-1">
            Test rapido di idoneità (3 domande)
          </h3>
        </div>
        <button
          type="button"
          onClick={reset}
          disabled={!q1 && !q2 && !q3}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-stone-600 hover:text-navy-900 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Azzera risposte</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Domanda 1 */}
        <div>
          <p className="font-semibold text-navy-900 text-sm sm:text-base mb-2.5">
            1. Quale tipologia di rapporto di lavoro hai svolto?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Tipologia di contratto">
            <button
              type="button"
              role="radio"
              aria-checked={q1 === 'termine'}
              onClick={() => setQ1('termine')}
              className={`text-left p-4 min-h-[44px] rounded-xl border transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 ${
                q1 === 'termine'
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-navy-900'
              }`}
            >
              Contratti a tempo determinato / supplenze (anche se oggi sono di ruolo)
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={q1 === 'solo_ruolo'}
              onClick={() => setQ1('solo_ruolo')}
              className={`text-left p-4 min-h-[44px] rounded-xl border transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 ${
                q1 === 'solo_ruolo'
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-navy-900'
              }`}
            >
              Esclusivamente servizio di ruolo a tempo indeterminato
            </button>
          </div>
        </div>

        {/* Domanda 2 */}
        <div>
          <p className="font-semibold text-navy-900 text-sm sm:text-base mb-2.5">
            2. Presso quale ente o settore hai prestato servizio?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Ente o settore">
            <button
              type="button"
              role="radio"
              aria-checked={q2 === 'scuola_enti'}
              onClick={() => setQ2('scuola_enti')}
              className={`text-left p-4 min-h-[44px] rounded-xl border transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 ${
                q2 === 'scuola_enti'
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-navy-900'
              }`}
            >
              Scuola statale (docente, ATA, religione) o Enti Locali (nidi/scuole comunali)
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={q2 === 'altro'}
              onClick={() => setQ2('altro')}
              className={`text-left p-4 min-h-[44px] rounded-xl border transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 ${
                q2 === 'altro'
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-navy-900'
              }`}
            >
              Settore privato o altro ente non soggetto al DPCM 20/12/1999
            </button>
          </div>
        </div>

        {/* Domanda 3 */}
        <div>
          <p className="font-semibold text-navy-900 text-sm sm:text-base mb-2.5">
            3. Quando hai svolto i periodi di servizio a tempo determinato?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Periodo di servizio">
            <button
              type="button"
              role="radio"
              aria-checked={q3 === 'ultimi_5'}
              onClick={() => setQ3('ultimi_5')}
              className={`text-left p-4 min-h-[44px] rounded-xl border transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 ${
                q3 === 'ultimi_5'
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-navy-900'
              }`}
            >
              Almeno in parte negli ultimi 5 anni (o ho già inviato diffida interruttiva)
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={q3 === 'oltre_5'}
              onClick={() => setQ3('oltre_5')}
              className={`text-left p-4 min-h-[44px] rounded-xl border transition-colors text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 ${
                q3 === 'oltre_5'
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-navy-900'
              }`}
            >
              Esclusivamente oltre 5 anni fa, senza mai aver inviato diffide scritte
            </button>
          </div>
        </div>
      </div>

      {renderResult()}
    </div>
  );
}
