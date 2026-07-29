import Image from "next/image";

export function InteriorHeader() {
  return (
    <header className="interior-header">
      <a className="interior-wordmark" href="/" aria-label="Gerard Teo, portfolio home">
        <Image
          src="/assets/g-image.webp"
          alt=""
          width={640}
          height={640}
          sizes="54px"
          priority
        />
      </a>
      <nav aria-label="Primary navigation">
        <a href="/#work">Work</a>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
        <a href="https://doesdesignwork.github.io/gerard-teo-cv/" target="_blank" rel="noopener noreferrer">CV</a>
      </nav>
    </header>
  );
}
