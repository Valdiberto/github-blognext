import Image from 'next/image'

export function Header() {
  return (
    <header className="flex h-74 w-full justify-center bg-[url('/assets/headerCover.png')] bg-cover bg-center">
      <Image
        className="mb-20"
        src="/assets/logo.svg"
        width={148}
        height={98}
        alt=""
      />
    </header>
  )
}
