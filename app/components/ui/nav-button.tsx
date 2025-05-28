

export default function NavButton({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
    return (
    <button 
        onClick={onClick}
        className="inline-block flex align-middle relative py-1 px-2 m-1"
    >
        <span className="group transition duration-500 ease-in-out relative">
            <span className="absolute bg-gradient-to-r from-light-platinum via-light-aztec-gold to-light-dirty-brown dark:from-dirty-brown dark:via-aztec-gold dark:to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer">
                {children}
            </span>
            <span className="relative text-black dark:text-white transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">
                {children}
            </span>
        </span>
    </button>
    );
}