import { Component, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Errore di rendering:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9F8F5] text-stone-800 p-6">
          <div className="max-w-md bg-white border border-stone-200 rounded-2xl p-6 text-center space-y-3">
            <h1 className="font-serif text-xl font-bold text-navy-900">
              Impossibile caricare la pagina
            </h1>
            <p className="text-sm text-stone-600">
              Si è verificato un errore imprevisto nel caricamento dell’interfaccia. Prova ad aggiornare la pagina.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors"
            >
              Ricarica pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
  );
}
