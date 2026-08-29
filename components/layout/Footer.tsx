export function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 text-sm text-ink-faint flex flex-col sm:flex-row gap-2 sm:gap-6 sm:items-center justify-between">
        <p className="max-w-xl">
          Educational use only. This application does not provide a medical or psychiatric diagnosis and cannot replace
          assessment by a qualified healthcare professional.
        </p>
        <p className="font-mono-label text-[11px] uppercase text-ink-faint shrink-0">ADHD Assessment &mdash; Simulator</p>
      </div>
    </footer>
  );
}
