export const metadata = {
  title: 'Projects',
  description: 'A list of my projects and papers.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      <h2 className="text-xl mb-4">Papers</h2>
      <ul className="list-disc space-y-4">
      <li>
          
          <span className="transition-all italic">Algebraic Geometry Codes</span>
          {`, with Kevin Rizk, 2025, Stanford University, available `}
          <a 
            rel="noopener noreferrer"
            target="_blank"
            href="https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/CS250_Project-eZuEJUz7TRvZfL0CTah1gdBK3VAeB4.pdf"
            download>
          <span className="group transition duration-500 ease-in-out relative">
              <span className="absolute bg-gradient-to-r from-dirty-brown via-aztec-gold to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer">here.</span>
              <span className="relative text-white transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">here.</span>
            </span>
        </a>
        </li>
        <li>
          <span className="transition-all italic">PSPACE-hardness of Two-Player Games</span>
          {`, with Tanvi Deshpande, 2024, Stanford University, available `}
          <a 
            rel="noopener noreferrer"
            target="_blank"
            href="https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/PSPACE-hardness%20of%20Two-Player%20Games.pdf"
            download>
          <span className="group transition duration-500 ease-in-out relative">
              <span className="absolute bg-gradient-to-r from-dirty-brown via-aztec-gold to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer">here.</span>
              <span className="relative text-white transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">here.</span>
            </span>
        </a>
        </li>
        <li>
          <span className="transition-all italic">Riemann's Existence Theorem and Admissible Covers</span>
          {`, under the supervision of Mohan Swaminathan, Stanford 
          Undergraduate Research Institute in Mathematics, available `}
          <a 
            rel="noopener noreferrer"
            target="_blank"
            href="https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/SURIM_2024.pdf"
            download>
          <span className="group transition duration-500 ease-in-out relative">
              <span className="absolute bg-gradient-to-r from-dirty-brown via-aztec-gold to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer">here.</span>
              <span className="relative text-white transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">here.</span>
            </span>
        </a>
        </li>
        <li>
          <span className="transition-all italic">Supersingular Diagonal Curves and their Genera</span>
          {`, with A. Sukhadia and M. Machado, 2023, Stanford Undergraduate Research Institute in Mathematics, available `}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/SURIM_2023.pdf"
            download>
            <span className="group transition duration-500 ease-in-out relative">
              <span className="absolute bg-gradient-to-r from-dirty-brown via-aztec-gold to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer">here.</span>
              <span className="relative text-white transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">here.</span>
            </span>
        </a>
        </li>
      </ul>
    </section>
  )
}
