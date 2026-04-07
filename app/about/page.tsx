export default function AboutPage() {
  return (
    <section>
      <h1>About</h1>

      <p>
        I&apos;m Gerard Teo — a multidisciplinary designer with over two decades of experience
        working across brand identity, environmental graphics, packaging, and digital product design.
        Based in Singapore, I partner with organisations ranging from government agencies to startups
        to build design systems that are both strategically sound and visually distinctive.
      </p>

      <p>
        My practice sits at the intersection of rigorous research and expressive craft. I believe
        the most effective design work is born from a deep understanding of people — their
        motivations, contexts, and the friction they face — translated into visual language with
        intentionality and precision.
      </p>

      <h2>Disciplines</h2>
      <ul>
        <li>Brand Strategy &amp; Identity</li>
        <li>UX Research &amp; Product Design</li>
        <li>Environmental &amp; Spatial Graphics</li>
        <li>Graphic Design &amp; Art Direction</li>
        <li>Motion &amp; 3D Visualisation</li>
      </ul>

      <h2>Recognition</h2>
      <ul>
        <li>Singapore Creative Circle Awards — Multiple medalist</li>
        <li>Marketing Events Awards Singapore — Best Government Event 2023</li>
        <li>Design for Good Awards — Bronze 2022</li>
        <li>App Store "Apps We Love" — SG/MY Region</li>
      </ul>

      <h2>Contact</h2>
      <p>Available for freelance, consulting, and full-time opportunities.</p>
      <form>
        <div>
          <label htmlFor="about-name">Name</label>
          <input id="about-name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="about-email">Email</label>
          <input id="about-email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="about-message">Message</label>
          <textarea id="about-message" name="message" rows={5} required />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}
