export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      <h2 className="text-xl mb-4">Papers</h2>
      <ul className="list-disc">
        <li className="font-serif">
          “PSPACE-hardness of Two-Player Games”, with Tanvi Deshpande, 2024, Stanford University, available 
            <a className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://obnh745pyfptrm8z.public.blob.vercel-storage.com/papers/PSPACE-hardness%20of%20Two-Player%20Games.pdf"
              download>
            here
            </a>.
          </li>
      </ul>
    </section>
  )
}
