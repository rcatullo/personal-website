function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:rcatullo@stanford.edu"
          >
            <ArrowIcon />
            <span className="group transition duration-500 ease-in-out relative ml-2 h-7">
              <span className="absolute bg-gradient-to-r from-dirty-brown via-aztec-gold to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer">email</span>
              <span className="relative transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">email</span>
            </span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center"
            rel="noopener noreferrer"
            target="_blank"
            href="https://obnh745pyfptrm8z.public.blob.vercel-storage.com/resume.pdf"
            download="resume.pdf">
              <ArrowIcon />
            <span className="group transition duration-500 ease-in-out relative ml-2 h-7">
              <span className="absolute bg-gradient-to-r from-dirty-brown via-aztec-gold to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer">resume</span>
              <span className="relative transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">resume</span>
            </span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/rcatullo"
          >
            <ArrowIcon />
            <span className="group transition duration-500 ease-in-out relative ml-2 h-7">
              <span className="absolute bg-gradient-to-r from-dirty-brown via-aztec-gold to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer">github</span>
              <span className="relative transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">github</span>
            </span>
          </a>
        </li>
      </ul>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  )
}
