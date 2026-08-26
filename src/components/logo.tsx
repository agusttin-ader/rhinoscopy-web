import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <a href="/" className={`group inline-flex items-center ${className}`}>
      <Image
        src="/logo-rhinoscopy.png"
        alt="Rhinoscopy"
        width={56}
        height={56}
        className="h-12 w-12 rounded-full"
        priority
      />
    </a>
  );
}
