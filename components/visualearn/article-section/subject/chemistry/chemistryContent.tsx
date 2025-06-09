"use client"

import AcidsAndBasesContent from "./acid base/acid-baseContent"
import AtomicStructureContent from "./atomic structure/atomicStructureContent"
import ChemicalBondingContent from "./chemical bonding/chemicalBondingContent"
import ChemicalEnergyContent from "./chemical energy/chemicalEnergyContent"
import ChemicalReactionsContent from "./chemical reaction/chemicalReactionsContent"
import GasesContent from "./gases/gasesContent"
import IndustrialChemistryContent from "./industrial chemistry/industrialChemistryContent"
import OrganicChemistryContent from "./organic chemistry/organicChemistryContent"
import PeriodicTableContent from "./periodic table/periodicTableContent"



interface ChemistryContentProps {
  chapter: string
  topic: {
    id: string
    title: string
    description: string
    content: string
    hasSimulation: boolean
    hasQuiz: boolean
  }
}

export default function ChemistryContent({ chapter, topic }: ChemistryContentProps) {
  return (
    <div className="space-y-8">
        {/* {chapter === "introduction-to-chemistry" ? (
            <IntroductionContent topic={topic} />
        ) : null} */}
        {chapter === "atomic-structure" ? (
            <AtomicStructureContent topic={topic} />
        ) : null}
        {chapter === "bonding" ? (
            <ChemicalBondingContent topic={topic} />
        ) : null} 
        {chapter === "reaction" ? (
            <ChemicalReactionsContent topic={topic} />
        ) : null} 
        {chapter === "periodic-table" ? (
            <PeriodicTableContent topic={topic} />
        ) : null} 
        {chapter === "gases" ? (
            <GasesContent topic={topic} />
        ) : null}  
        {chapter === "organic" ? (
            <OrganicChemistryContent topic={topic} />
        ) : null}
        {chapter === "acid-base" ? (
            <AcidsAndBasesContent topic={topic} />
        ) : null}    
        {chapter === "chemical-energy" ? (
            <ChemicalEnergyContent topic={topic} />
        ) : null} 
        {chapter === "industrial-chemistry" ? (
            <IndustrialChemistryContent topic={topic} />
        ) : null}  

    </div>
  )
}