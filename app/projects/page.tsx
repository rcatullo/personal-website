export const metadata = {
  title: 'Projects',
  description: 'A list of my projects and papers.',
}

const projItems = {
  'Rizk25': {
    title: 'Algebraic Geometry Codes',
    coauthors: 'Kevin Rizk',
    date: '2025',
    institution: 'Stanford University',
    link: 'https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/CS250_Project-eZuEJUz7TRvZfL0CTah1gdBK3VAeB4.pdf',
  },
  'Deshpande24': {
    title: 'PSPACE-hardness of Two-Player Games',
    coauthors: 'Tanvi Deshpande',
    date: '2024',
    institution: 'Stanford University',
    link: 'https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/PSPACE-hardness%20of%20Two-Player%20Games.pdf',
  },
  'Swaminathan24': {
    title: 'Riemann\'s Existence Theorem and Admissible Covers',
    coauthors: 'Mohan Swaminathan',
    date: '2024',
    institution: 'Stanford Undergraduate Research Institute in Mathematics',
    link: 'https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/SURIM_2024.pdf',
  },
  'SukhadiaMachado23': {
    title: 'Supersingular Diagonal Curves and their Genera',
    coauthors: 'A. Sukhadia and M. Machado',
    date: '2023',
    institution: 'Stanford Undergraduate Research Institute in Mathematics',
    link: 'https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/SURIM_2023.pdf',
  },
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      <h2 className="text-xl mb-4">Papers</h2>
      <ul className="list-disc space-y-4">
        {Object.values(projItems).map((proj) => {
          return (
            <li key={proj.title}>
              <span className="italic">{proj.title}</span>
              {`, with ${proj.coauthors}, ${proj.date}, ${proj.institution}, available `}
              <a 
              rel="noopener noreferrer"
              target="_blank"
              href={proj.link}
              download>
                <span className="group transition duration-500 ease-in-out relative inline-flex">
                    <span className="absolute bg-gradient-to-r from-dirty-brown via-aztec-gold to-platinum bg-clip-text text-transparent transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 cursor-pointer top-0 bottom-0">here.</span>
                    <span className="relative text-white transition-opacity duration-500 ease-in-out group-hover:opacity-0 cursor-pointer">here.</span>
                  </span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
