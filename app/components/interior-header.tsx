import Image from "next/image";
import Link from "next/link";

export function InteriorHeader() {
  return (
    <header className="interior-header">
      <Link className="interior-wordmark" href="/" aria-label="Gerard Teo, portfolio home">
        <Image
          src="/assets/g-image.webp"
          alt=""
          width={640}
          height={640}
          sizes="54px"
          priority
        />
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
        <a href="https://doesdesignwork.github.io/gerard-teo-cv/" target="_blank" rel="noopener noreferrer">CV</a>
      </nav>
    </header>
  );
}
