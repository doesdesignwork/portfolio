import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gerard Teo — Portfolio',
  description:
    'Multidisciplinary designer crafting brand identities, graphic systems, and digital experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Gerard Teo</Link>
            <ul>
              <li>
                <Link href="/">Work</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>

        <footer id="contact">
          <h2>Get in Touch</h2>
          <form>
            <div>
              <label htmlFor="footer-name">Name</label>
              <input id="footer-name" name="name" type="text" required />
            </div>
            <div>
              <label htmlFor="footer-email">Email</label>
              <input id="footer-email" name="email" type="email" required />
            </div>
            <div>
              <label htmlFor="footer-message">Message</label>
              <textarea id="footer-message" name="message" rows={5} required />
            </div>
            <button type="submit">Send Message</button>
          </form>
        </footer>
      </body>
    </html>
  );
}
