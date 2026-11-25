import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Oggi sono docente o ATA di ruolo: posso chiedere comunque il rimborso?',
    answer:
      'Sì, ma limitatamente agli anni in cui hai lavorato con contratti a tempo determinato e per le mensilità non ancora prescritte (ultimi cinque anni). Per gli anni successivi all’immissione in ruolo in regime TFR, invece, la Corte costituzionale (sentenza n. 213/2018) e la Cassazione (ordinanze n. 19108 e n. 19438 del 2023) hanno ritenuto la riduzione legittima.',
  },
  {
    question: 'C’è già una pronuncia della Cassazione per i supplenti delle scuole statali?',
    answer:
      'Sì. Con l’ordinanza n. 19697/2023 la Corte di Cassazione ha confermato l’illegittimità della trattenuta del 2,50% applicata a un dipendente dell’amministrazione scolastica assunto con contratto a tempo determinato. Il principio si fonda sulla disciplina speciale dei rapporti a termine e si applica indipendentemente dalla data di prima assunzione, come ribadito anche dalla Corte d’Appello di Roma (sentenza n. 4033/2026) per il personale a termine degli enti locali.',
  },
  {
    question: 'Quanto si può recuperare indicativamente?',
    answer:
      'La trattenuta incide per circa il 2% della retribuzione lorda mensile (il 2,50% calcolato sull’80% dell’imponibile). Su uno stipendio lordo indicativo di 1.900 euro mensili, il prelievo è di circa 38 euro al mese (circa 380 euro per un anno scolastico di dieci mesi). L’ammontare esatto dipende tuttavia dai singoli cedolini e dai periodi effettivamente retribuiti.',
  },
  {
    question: 'Cosa succede se ho ancora un contratto a tempo determinato in corso?',
    answer:
      'Oltre a richiedere la restituzione delle somme già decurtate nei cinque anni precedenti, il lavoratore ancora titolare di contratti a termine può domandare l’accertamento del diritto alla cessazione immediata della trattenuta anche sulle mensilità future.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 scroll-mt-24">
      <span className="block text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2">
        05. Chiarimenti frequenti
      </span>
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900 mb-6">
        Domande frequenti (FAQ)
      </h2>

      <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.question} className="py-4">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex justify-between items-center gap-4 text-left font-semibold text-navy-900 text-base sm:text-lg py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gold-600 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed max-w-prose">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
