'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center', backgroundColor: '#f8fafc', color: '#0f172a' }}>
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e293b' }}>Application Error</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            A critical error occurred. We apologize for the inconvenience.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              width: '100%',
              transition: 'background-color 0.2s'
            }}
          >
            Try again
          </button>
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px border-dashed border-slate-100' }}>
            <a href="/" style={{ fontSize: '0.75rem', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>Back to Home</a>
          </div>
        </div>
      </body>
    </html>
  );
}
