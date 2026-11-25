import { useState, type FormEvent } from 'react';
import { CheckCircle2, Copy, Check, Mail } from 'lucide-react';

const RECIPIENT_EMAIL = 'info@studiolegalegolinelli.it';

export function ConsultationForm() {
  const [nome, setNome] = useState('');
  const [qualifica, setQualifica] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [note, setNote] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const getQualificaLabel = (val: string) => {
    switch (val) {
      case 'docente':
        return 'Docente (Scuola Statale)';
      case 'ata':
        return 'Personale ATA';
      case 'educatore':
        return 'Educatore / Docente Enti Locali';
      case 'religione':
        return 'Docente di Religione';
      case 'ruolo_ex_precario':
        return 'Oggi di ruolo (ex precario)';
      default:
        return val;
    }
  };

  const buildEmailContent = () => {
    const profiloLabel = getQualificaLabel(qualifica);
    const subject = `Richiesta verifica trattenuta TFR 2,5% - ${nome.trim() || 'Nuovo contatto'}`;
    let body =
      'Buongiorno,\nrichiedo una valutazione preliminare sulla trattenuta del 2,50% TFR.\n\n';
    if (nome.trim()) body += `Nominativo: ${nome.trim()}\n`;
    if (email.trim()) body += `Email: ${email.trim()}\n`;
    if (telefono.trim()) body += `Telefono: ${telefono.trim()}\n`;
    if (profiloLabel) body += `Profilo / Qualifica: ${profiloLabel}\n`;
    if (note.trim()) {
      body += `\nNote sui contratti e sui periodi di servizio:\n${note.trim()}\n`;
    }
    return { subject, body };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { subject, body } = buildEmailContent();
    setSubmitted(true);
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyText = async () => {
    const { subject, body } = buildEmailContent();
    const fullText = `Destinatario: ${RECIPIENT_EMAIL}\nOggetto: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback silencioso se clipboard API non disponibile
    }
  };

  return (
    <div className="bg-white text-stone-800 rounded-xl p-6 sm:p-8 border border-stone-200 h-full flex flex-col justify-between">
      <div>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 mb-1.5">
          Richiedi una valutazione preliminare
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
          Compila il modulo per predisporre l’invio della tua richiesta allo Studio. Ti risponderemo indicando le modalità di trasmissione dei cedolini per il conteggio.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="user-name" className="block text-xs font-semibold text-navy-900 mb-1">
                Nome e Cognome *
              </label>
              <input
                type="text"
                id="user-name"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Mario Rossi"
                className="w-full px-3 py-2.5 min-h-[42px] rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-navy-900"
              />
            </div>

            <div>
              <label htmlFor="user-qualifica" className="block text-xs font-semibold text-navy-900 mb-1">
                Qualifica / Profilo *
              </label>
              <select
                id="user-qualifica"
                required
                value={qualifica}
                onChange={(e) => setQualifica(e.target.value)}
                className="w-full px-3 py-2.5 min-h-[42px] rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-navy-900 bg-white"
              >
                <option value="">Seleziona profilo...</option>
                <option value="docente">Docente (Scuola Statale)</option>
                <option value="ata">Personale ATA</option>
                <option value="educatore">Educatore / Docente Enti Locali</option>
                <option value="religione">Docente di Religione</option>
                <option value="ruolo_ex_precario">Oggi di ruolo (ex precario)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="user-email" className="block text-xs font-semibold text-navy-900 mb-1">
                Indirizzo Email *
              </label>
              <input
                type="email"
                id="user-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@esempio.it"
                className="w-full px-3 py-2.5 min-h-[42px] rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-navy-900"
              />
            </div>

            <div>
              <label htmlFor="user-phone" className="block text-xs font-semibold text-navy-900 mb-1">
                Telefono (facoltativo)
              </label>
              <input
                type="tel"
                id="user-phone"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+39 333 0000000"
                className="w-full px-3 py-2.5 min-h-[42px] rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-navy-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="user-notes" className="block text-xs font-semibold text-navy-900 mb-1">
              Breve descrizione dei periodi a termine svolti *
            </label>
            <textarea
              id="user-notes"
              rows={3}
              required
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Es. Ho svolto supplenze al 30 giugno negli ultimi 4 anni scolastici e ho riscontrato la voce TFR 2,500 su 80 nei cedolini..."
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:border-navy-900"
            />
          </div>

          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="privacy-consent"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 rounded border-stone-300 text-navy-900 focus:ring-navy-900"
            />
            <label htmlFor="privacy-consent" className="text-xs text-stone-600 leading-snug">
              Dichiaro di aver preso visione dell’informativa sul trattamento dei dati personali e comprendo che la presente richiesta ha finalità meramente orientative e non costituisce promessa di risultato.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 min-h-[44px] rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Invia richiesta di verifica documentale</span>
          </button>
        </form>
      </div>

      {submitted && (
        <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm leading-relaxed space-y-2.5">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="block font-semibold">Richiesta pronta per l’invio tramite email.</strong>
              <span>
                Il tuo programma di posta dovrebbe aprirsi automaticamente verso{' '}
                <span className="font-mono font-medium">{RECIPIENT_EMAIL}</span>. Se utilizzi una webmail o il client non si è aperto, puoi copiare il testo predisposto qui sotto.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold hover:bg-emerald-100/60 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Testo copiato negli appunti</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copia testo email e indirizzo</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
