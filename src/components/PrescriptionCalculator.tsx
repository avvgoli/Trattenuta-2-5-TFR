import { useState } from 'react';

const dateFormatterIT = new Intl.DateTimeFormat('it-IT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function getTodayISO(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function PrescriptionCalculator() {
  const [dateStr, setDateStr] = useState<string>(getTodayISO);

  const parseDates = () => {
    const parts = dateStr.split('-');
    if (parts.length !== 3) {
      const fallback = new Date();
      const start = new Date(fallback);
      start.setFullYear(start.getFullYear() - 5);
      return { start, end: fallback };
    }
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const end = new Date(year, month, day);
    if (Number.isNaN(end.getTime())) {
      const fallback = new Date();
      const start = new Date(fallback);
      start.setFullYear(start.getFullYear() - 5);
      return { start, end: fallback };
    }
    const start = new Date(end);
    start.setFullYear(start.getFullYear() - 5);
    return { start, end };
  };

  const { start, end } = parseDates();

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
      <div className="mb-6 pb-4 border-b border-stone-200">
        <span className="text-xs font-semibold text-gold-600 uppercase tracking-widest">
          Strumento 4 di 4
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 mt-1">
          Calcolatore della finestra di prescrizione quinquennale (Art. 2948, n. 4, c.c.)
        </h3>
        <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
          Nel pubblico impiego i crediti retributivi si prescrivono in{' '}
          <strong className="text-stone-900">5 anni con decorrenza mese per mese</strong>. Verifica quale periodo è oggi tutelabile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <label htmlFor="interruption-date" className="block text-sm font-semibold text-navy-900 mb-2">
              Data di invio / ricezione della diffida (PEC o Raccomandata A/R):
            </label>
            <input
              type="date"
              id="interruption-date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-stone-300 text-navy-900 font-medium text-sm bg-white tabular-nums focus:outline-none focus:border-navy-900"
            />
            <p className="text-xs text-stone-500 mt-2">
              Impostata automaticamente sulla data odierna. Puoi modificarla se hai già inviato una diffida formale in precedenza.
            </p>
          </div>

          <div className="bg-[#FCF9F2] border border-gold-500/35 rounded-xl p-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <strong className="text-navy-900 block mb-1">
              Come funziona l’interruzione (Art. 2943 c.c.):
            </strong>
            Ogni mese che trascorre senza un atto interruttivo comporta la perdita definitiva della mensilità più vecchia. L’invio di una formale diffida e messa in mora tramite PEC o raccomandata A/R, conservando la ricevuta di avvenuta consegna, blocca il termine e cristallizza i 5 anni precedenti.
          </div>
        </div>

        <div className="bg-[#F0F4F8] border border-navy-900/15 rounded-xl p-6 text-center flex flex-col justify-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-navy-900">
            Finestra Temporale Tutelabile
          </span>
          <div>
            <span className="block text-xs text-stone-600 uppercase tracking-wide">
              Dal (limite quinquennale a ritroso)
            </span>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-navy-900 mt-1 tabular-nums">
              {dateFormatterIT.format(start)}
            </span>
          </div>
          <div className="text-stone-500 text-xs font-semibold uppercase tracking-widest">
            Fino al
          </div>
          <div>
            <span className="block text-xs text-stone-600 uppercase tracking-wide">
              Data di riferimento / Ricezione PEC
            </span>
            <span className="block font-serif text-xl sm:text-2xl font-bold text-gold-600 mt-1 tabular-nums">
              {dateFormatterIT.format(end)}
            </span>
          </div>
          <p className="text-xs text-stone-600 pt-3 border-t border-stone-300/70">
            Tutti i cedolini con contratti a termine pagati all’interno di questo arco temporale rientrano nel periodo non prescritto.
          </p>
        </div>
      </div>
    </div>
  );
}
