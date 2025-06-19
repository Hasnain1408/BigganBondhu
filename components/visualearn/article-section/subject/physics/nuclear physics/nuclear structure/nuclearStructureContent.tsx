// components/topics/physics/nuclear/nuclearStructureContent.tsx

"use client"

export default function NuclearStructureContent() {
  return (
    <div className="prose max-w-none">
      <h1>Nuclear Structure</h1>
      <p>
        The nucleus is the central part of an atom, consisting of protons and neutrons, collectively known as nucleons. 
        Understanding nuclear structure is essential in nuclear physics, as it reveals insights into atomic behavior, stability, and energy.
      </p>

      <h2>Key Concepts</h2>
      <ul>
        <li><strong>Atomic Number (Z):</strong> Number of protons in the nucleus.</li>
        <li><strong>Mass Number (A):</strong> Total number of protons and neutrons.</li>
        <li><strong>Isotopes:</strong> Atoms with the same Z but different A.</li>
        <li><strong>Binding Energy:</strong> Energy required to break a nucleus into individual nucleons.</li>
      </ul>

      <h2>Nuclear Forces</h2>
      <p>
        The nuclear force is a short-range attractive force that binds protons and neutrons together, overcoming the electromagnetic repulsion between protons. This force is fundamental in maintaining the integrity of the nucleus.
      </p>

      <h2>Shell Model</h2>
      <p>
        The shell model describes nucleons as occupying discrete energy levels within the nucleus, similar to electron shells in atoms. Certain numbers of nucleons (magic numbers) lead to especially stable configurations.
      </p>

      <h2>Applications</h2>
      <ul>
        <li>Nuclear reactors and energy production</li>
        <li>Medical imaging and radiotherapy</li>
        <li>Radiocarbon dating in archaeology</li>
        <li>Nuclear weapons development</li>
      </ul>
    </div>
  )
}
