export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      <h2 className="text-xl mb-4">Papers</h2>
      <ul className="list-disc space-y-4">
        <li className="font-serif">
          <p className="font-semibold">“PSPACE-hardness of Two-Player Games”</p>, with Tanvi Deshpande, 2024, Stanford University, available 
            <a className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/PSPACE-hardness%20of%20Two-Player%20Games.pdf"
              download>
             {` here`}
            </a>.
          </li>
          <li className="font-serif">
          <p className="font-semibold">“Riemann's Existence Theorem and Admissible Covers"</p>, 2024, under the supervision of Mohan Swaminathan, Stanford 
          Undergraduate Research Institute in Mathematics, available 
            <a className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/SURIM_2024.pdf"
              download>
             {` here`}
            </a>.
          </li>
          <li className="font-serif">
          <p className="font-semibold">"Supersingular Diagonal Curves and their Genera"</p>, with A. Sukhadia and M. Machado, 2023, Stanford 
          Undergraduate Research Institute in Mathematics, available 
            <a className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/SURIM_2023.pdf"
              download>
             {` here`}
            </a>.
          </li>
          
      </ul>
    </section>
  )
}
