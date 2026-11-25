import { useState } from 'react';

const euroFormatter = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function RecoverySimulator() {
  const [salary, setSalary] = useState<number>(1900);
  const [months, setMonths] = useState<number>(10);

  const safeSalary = Number.isFinite(salary) && salary >= 0 ? salary : 0;
  const safeMonths = Number.isFinite(months) ? Math.min(60, Math.max(1, Math.round(months))) : 1;

  // 2,50% sull'80% dell'imponibile = 2,00% del lordo
  const monthlyDeduction = safeSalary * 0.02;
  const totalRecovery = monthlyDeduction * safeMonths;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
      <div className="mb-6 pb-4 border-b border-stone-200">
        <span className="text-xs font-semibold text-gold-600 uppercase tracking-widest">
          Strumento 2 di 4
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 mt-1">
          Simulatore indicativo del rimborso (2% sul lordo mensile)
        </h3>
        <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
          La riduzione del 2,50% sull’80% dell’imponibile corrisponde esattamente al{' '}
          <strong className="text-stone-900">2% della retribuzione lorda</strong>. Regola i parametri per una stima orientativa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Controlli Slider */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div>
            <div className="flex justify-between items-center gap-4 mb-2.5">
              <label htmlFor="gross-salary" className="text-sm font-semibold text-navy-900">
                Retribuzione lorda mensile media (€)
              </label>
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="number"
                  id="gross-salary-input"
                  min={800}
                  max={4500}
                  step={50}
                  value={salary}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSalary(Number.isNaN(val) ? 0 : val);
                  }}
                  className="w-24 px-2.5 py-1.5 text-right font-semibold tabular-nums text-navy-900 bg-[#F9F8F5] border border-stone-300 rounded-lg text-sm focus:outline-none focus:border-navy-900"
                />
                <span className="text-sm font-semibold text-stone-600">€</span>
              </div>
            </div>
            <input
              type="range"
              id="gross-salary"
              className="legal-range"
              min={800}
              max={4500}
              step={50}
              value={Math.min(4500, Math.max(800, safeSalary))}
              onChange={(e) => setSalary(parseFloat(e.target.value))}
              aria-label="Retribuzione lorda mensile"
            />
            <div className="flex justify-between text-xs text-stone-500 mt-1.5 tabular-nums">
              <span>800 €</span>
              <span>1.900 € (esempio standard)</span>
              <span>4.500 €</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center gap-4 mb-2.5">
              <label htmlFor="service-months" className="text-sm font-semibold text-navy-900">
                Mesi di servizio a termine non prescritti
              </label>
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="number"
                  id="service-months-input"
                  min={1}
                  max={60}
                  step={1}
                  value={safeMonths}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setMonths(Number.isNaN(val) ? 1 : val);
                  }}
                  className="w-20 px-2.5 py-1.5 text-right font-semibold tabular-nums text-navy-900 bg-[#F9F8F5] border border-stone-300 rounded-lg text-sm focus:outline-none focus:border-navy-900"
                />
                <span className="text-sm font-semibold text-stone-600">mesi</span>
              </div>
            </div>
            <input
              type="range"
              id="service-months"
              className="legal-range"
              min={1}
              max={60}
              step={1}
              value={safeMonths}
              onChange={(e) => setMonths(parseInt(e.target.value, 10))}
              aria-label="Mesi di servizio a termine"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
              <div className="flex items-center gap-1.5">
                {[10, 20, 30, 60].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMonths(preset)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium tabular-nums transition-colors whitespace-nowrap shrink-0 ${
                      safeMonths === preset
                        ? 'bg-navy-900 text-white'
                        : 'bg-[#F3F1EC] text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {preset} mesi
                  </button>
                ))}
              </div>
              <span className="text-xs text-stone-500 tabular-nums">Max 60 mesi (5 anni)</span>
            </div>
          </div>
        </div>

        {/* Risultati Simulazione */}
        <div className="lg:col-span-5 bg-navy-900 text-white rounded-xl p-6 flex flex-col justify-between space-y-5">
          <div className="border-b border-white/15 pb-4">
            <span className="block text-xs uppercase tracking-wider text-stone-300">
              Trattenuta mensile stimata
            </span>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-gold-400 mt-1 tabular-nums">
              {euroFormatter.format(monthlyDeduction)}
            </span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-stone-300">
              Stima complessiva lorda recuperabile
            </span>
            <span className="block font-serif text-3xl sm:text-4xl font-bold text-white mt-1 tabular-nums">
              {euroFormatter.format(totalRecovery)}
            </span>
            <span className="block text-xs text-stone-300 mt-1.5 tabular-nums">
              Calcolata su {safeMonths} {safeMonths === 1 ? 'mese' : 'mesi'} di servizio a termine
            </span>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-stone-600 bg-[#F9F8F5] p-4 rounded-xl border border-stone-200 leading-relaxed">
        <strong className="text-stone-900">Avvertenza tecnica:</strong> i valori visualizzati costituiscono una stima puramente indicativa e orientativa. L’importo effettivamente recuperabile dipende dalle singole voci retributive imponibili presenti nei cedolini mensili, dagli scatti o indennità accessorie e dalla decorrenza dei termini di prescrizione.
      </p>
    </div>
  );
}
