'use client';

export default function MainFooter() {
  return (
    <footer className="w-full py-8 bg-[var(--card)] border-t border-[var(--border)]">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center gap-4 max-w-full">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-[var(--foreground)] font-poppins">
            Ngân Phạm
          </span>
          <span className="text-sm text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
