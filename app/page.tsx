import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
        Ryan Catullo
      </h1>
      <h2 className="mb-8 text-1xl italic tracking-tight">
        Mathematics and Computer Science @ Stanford University
      </h2>
      <p className="mb-4">
        {`I am interested broadly in algebraic geometry and symplectic topology. 
        Specifically, I am interested in problems related to counting curves on 
        rational surfaces, as well as the geometric Langland's program which 
        studies roughly the correspondence between sheaves on the space of 
        LG-local systems and D-modules (modules over regular differential 
        operators) on the space of principal G-bundles, where LG is a sort of 
        "Langland's dual group" to G.

        I also study theoretical computer science, particularly computational 
        complexity. One area of research I find interesting is worst-case to 
        average-case reductions, which roughly takes NP-hard problems and constructs 
        polynomials using them such that the average-case complexity of evaluating 
        these polynomials on random inputs (with respect to some chosen probability 
        distribution) is equal to the worst-case complexity of the NP-hard problem. 
        This is really useful in generating cryptographic primitives for encryption 
        algorithms, which is increasingly relevant as we enter the dawn of quantum 
        computing.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
