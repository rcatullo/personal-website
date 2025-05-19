import FooterLink from "./ui/footer-link";

type FooterItem = {
  name: string;
  href: string;
  download?: string;
}

const footerItems: Record<string, FooterItem> = {
  'email': {
    name: 'email',
    href: 'mailto:rcatullo@stanford.edu',
  },
  'resume': {
    name: 'resume',
    href: 'https://obnh745pyfptrm8z.public.blob.vercel-storage.com/resume.pdf',
    download: 'resume.pdf',
  },
  'github': {
    name: 'github',
    href: 'https://github.com/rcatullo',
  },
}

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        {Object.entries(footerItems).map(([label, { name, href, download }]) => {
          return (
            <li key={label}>
              <FooterLink
                href={href}
                name={name}
                download={download}
              />
            </li>
          )
        })}
      </ul>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  )
}
