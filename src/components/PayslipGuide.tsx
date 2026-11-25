import { useState } from 'react';

type PayslipFilter = 'rilevanti' | 'escluse';

export function PayslipGuide() {
  const [activeTab, setActiveTab] = useState<PayslipFilter>('rilevanti');

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
      <div className="mb-6 pb-4 border-b border-stone-200">
        <span className="text-xs font-semibold text-gold-600 uppercase tracking-widest">
          Strumento 3 di 4
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 mt-1">
          Guida visiva al cedolino: quali voci cercare e quali escludere
        </h3>
        <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
          Seleziona le schede sottostanti per evidenziare nel fac-simile anonimizzato di busta paga le diciture rilevanti ai fini del rimborso.
        </p>
      </div>

      {/* Tab di filtro (Segmented control) */}
      <div
        className="inline-flex flex-wrap gap-1.5 p-1 bg-[#F3F1EC] rounded-xl mb-6 border border-stone-200"
        role="tablist"
        aria-label="Filtro voci cedolino"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'rilevanti'}
          onClick={() => setActiveTab('rilevanti')}
          className={`px-4 py-2 min-h-[40px] rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 ${
            activeTab === 'rilevanti'
              ? 'bg-navy-900 text-white'
              : 'text-stone-700 hover:text-navy-900'
          }`}
        >
          Voci da recuperare (Illegittime su contratti a termine)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'escluse'}
          onClick={() => setActiveTab('escluse')}
          className={`px-4 py-2 min-h-[40px] rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 ${
            activeTab === 'escluse'
              ? 'bg-navy-900 text-white'
              : 'text-stone-700 hover:text-navy-900'
          }`}
        >
          Voci da NON confondere (Escluse dal conteggio)
        </button>
      </div>

      {/* Fac-simile Cedolino Anonimizzato */}
      <div className="rounded-xl border border-stone-300 bg-[#F9F8F5] overflow-hidden font-mono text-xs sm:text-sm">
        {/* Intestazione Fac-simile */}
        <div className="bg-[#EBE6DF] px-4 py-3 border-b border-stone-300 flex flex-wrap justify-between items-center gap-2 text-stone-800">
          <div>
            <span className="font-semibold block">PROSPETTO RETRIBUTIVO (FAC-SIMILE ANONIMIZZATO)</span>
            <span className="block text-[11px] font-sans text-stone-600 mt-0.5">
              Qualifica: Personale a Tempo Determinato · Regime: TFR
            </span>
          </div>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-stone-600">
            Esempio Illustrativo
          </span>
        </div>

        {/* Tabella Voci */}
        <div className="divide-y divide-stone-200">
          {/* Riga Competenze */}
          <div className="px-4 py-3 flex justify-between items-center gap-4 bg-white text-stone-700">
            <span>001 - Stipendio Tabellare / Retribuzione Base</span>
            <span className="font-semibold text-stone-900 tabular-nums shrink-0">+ 1.900,00 €</span>
          </div>

          {/* Riga Rilevante 1 */}
          <div
            className={`px-4 py-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 transition-opacity duration-200 ${
              activeTab === 'rilevanti'
                ? 'bg-emerald-50/90 opacity-100'
                : 'bg-white opacity-45'
            }`}
          >
            <div>
              <span className="font-semibold text-emerald-950 block">
                840 - TFR art. 1 c. 3 DPCM 20/12/1999 – 2,500 su 80
              </span>
              <span className="text-xs text-emerald-900 font-sans block mt-0.5">
                Dicitura tipica nei cedolini del comparto scuola (NoiPA). Equivale al 2% del lordo.
              </span>
            </div>
            <span className="font-semibold text-emerald-900 tabular-nums shrink-0">
              - 38,00 € · Rilevante
            </span>
          </div>

          {/* Riga Rilevante 2 */}
          <div
            className={`px-4 py-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 transition-opacity duration-200 ${
              activeTab === 'rilevanti'
                ? 'bg-emerald-50/90 opacity-100'
                : 'bg-white opacity-45'
            }`}
          >
            <div>
              <span className="font-semibold text-emerald-950 block">
                841 - Riduzione in adempimento regime TFR / Riduz. INADEL regime TFR
              </span>
              <span className="text-xs text-emerald-900 font-sans block mt-0.5">
                Dicitura alternativa riscontrabile nei cedolini degli enti locali (scuole/nidi comunali).
              </span>
            </div>
            <span className="font-semibold text-emerald-900 shrink-0">
              Voce Equivalente · Rilevante
            </span>
          </div>

          {/* Riga Esclusa 1 */}
          <div
            className={`px-4 py-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 transition-opacity duration-200 ${
              activeTab === 'escluse'
                ? 'bg-amber-50/90 opacity-100'
                : 'bg-white opacity-55'
            }`}
          >
            <div>
              <span className="font-semibold text-stone-900 block">
                912 - Ritenute previdenziali su arretrati / Conguaglio fiscale
              </span>
              <span className="text-xs text-stone-600 font-sans block mt-0.5">
                Trattenute ordinarie su competenze arretrate: non rientrano nel rimborso TFR 2,5%.
              </span>
            </div>
            <span className="font-semibold text-stone-600 shrink-0">Esclusa</span>
          </div>

          {/* Riga Esclusa 2 */}
          <div
            className={`px-4 py-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 transition-opacity duration-200 ${
              activeTab === 'escluse'
                ? 'bg-amber-50/90 opacity-100'
                : 'bg-white opacity-55'
            }`}
          >
            <div>
              <span className="font-semibold text-stone-900 block">
                950 - Rate riscatto laurea / Ricongiunzione periodi assicurativi
              </span>
              <span className="text-xs text-stone-600 font-sans block mt-0.5">
                Trattenute volontarie o contributive del lavoratore: non oggetto di restituzione.
              </span>
            </div>
            <span className="font-semibold text-stone-600 shrink-0">Esclusa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
