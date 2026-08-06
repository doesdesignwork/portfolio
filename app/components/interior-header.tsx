import Image from "next/image";
import Link from "next/link";

export function InteriorHeader() {
  return (
    <header className="interior-header brand-header">
      <Link
        className="interior-wordmark brand-wordmark"
        href="/"
        aria-label="Gerard Teo, portfolio home"
      >
        <Image
          src="/assets/g-image.webp"
          alt=""
          width={640}
          height={640}
          sizes="48px"
          priority
        />
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/ux-ui/">UX/UI</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
        <Link href="/cv/">CV</Link>
      </nav>
    </header>
  );
}
