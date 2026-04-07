import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import PageTransition from '@/components/PageTransition';
import './globals.css';
// Fonts are loaded via CSS @import in globals.css (Josefin Sans, Space Grotesk, JetBrains Mono).
// next/font/google is avoided here because the build environment has no outbound network access.

export const metadata: Metadata = {
  title: 'Gerard Teo — Portfolio',
  description:
    'Multidisciplinary designer crafting brand identities, graphic systems, and digital experiences.',
};

const inputBase =
  'w-full px-4 py-3 rounded-sm text-sm transition-colors duration-200 outline-none focus:ring-1';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />

        {/* Offset for fixed nav */}
        <div className="pt-[72px]">
          <PageTransition>{children}</PageTransition>
        </div>

        {/* ── Footer / Contact ── */}
        <footer
          id="contact"
          className="border-t mt-32"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="mx-auto max-w-7xl px-6 py-24 md:px-16 lg:px-24">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              {/* Left */}
              <div>
                <p
                  className="text-xs tracking-[0.2em] uppercase mb-4"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                >
                  Get in touch
                </p>
                <h2
                  className="mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Let&apos;s make something
                  <br />
                  <span style={{ color: 'var(--color-neon-cyan)' }}>worth remembering.</span>
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Available for brand identity, spatial graphics, and digital product design
                  engagements. Based in Singapore — working globally.
                </p>
              </div>

              {/* Right: form */}
              <form className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="f-name"
                      className="text-xs tracking-widest uppercase"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                    >
                      Name
                    </label>
                    <input
                      id="f-name"
                      name="name"
                      type="text"
                      required
                      className={inputBase}
                      style={{
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="f-email"
                      className="text-xs tracking-widest uppercase"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                    >
                      Email
                    </label>
                    <input
                      id="f-email"
                      name="email"
                      type="email"
                      required
                      className={inputBase}
                      style={{
                        background: 'var(--color-bg-surface)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="f-message"
                    className="text-xs tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="f-message"
                    name="message"
                    rows={5}
                    required
                    className={inputBase}
                    style={{
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-primary)',
                      resize: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 self-start px-8 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:glow-cyan"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    border: '1px solid var(--color-neon-cyan)',
                    color: 'var(--color-neon-cyan)',
                    background: 'transparent',
                  }}
                >
                  Send Message →
                </button>
              </form>
            </div>

            <div
              className="mt-16 pt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t"
              style={{ borderColor: 'var(--color-border-subtle)' }}
            >
              <p
                className="text-xs tracking-widest"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                © {new Date().getFullYear()} Gerard Teo. All rights reserved.
              </p>
              <a
                href="https://www.linkedin.com/in/gerard-teo-0b106429/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest hover:text-neon-cyan transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
