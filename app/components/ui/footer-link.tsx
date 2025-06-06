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

export default function FooterLink({ href, name, download }: { href: string, name: string, download?: string }) {
    return (
        <a
            className="flex items-center"
            rel="noopener noreferrer"
            target="_blank"
            href={href}
            {...download ? {download: download} : {}}>
            <ArrowIcon />
            <span className="group transition duration-500 ease-in-out relative ml-2 h-7">
                <span className="absolute bg-gradient-to-r from-light-platinum via-light-aztec-gold to-light-dirty-brown dark:from-dirty-brown dark:via-aztec-gold dark:to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer">{name}</span>
                <span className="relative transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">{name}</span>
            </span>
        </a>
    )
}
