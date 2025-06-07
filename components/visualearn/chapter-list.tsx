"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"

interface ChapterListProps {
  subjectId: string
}

export default function ChapterList({ subjectId }: ChapterListProps) {
  const { isAuthenticated } = useAuth()

  const getChapters = (subjectId: string) => {
    switch (subjectId) {
      case "physics":
        return [
          
            {
              id: "introduction-to-physics",
              title: "Introduction to Physics",
              description: "Fundamental concepts and principles of physics",
              topics: 5,
              image: "/physics/introduction to physics.jpg?height=120&width=240",
              progress: 0,
            },
            {
              id: "vector",
              title: "Vectors",
              description: "Study of vector quantities in physics and their applications",
              topics: 4,
              image: "/physics/vector.jpeg?height=120&width=240",
              progress: 0,
            },
            {
              id: "motion",
              title: "Motion",
              description: "Study of movement, velocity, acceleration, and kinematic equations",
              topics: 6,
              image: "/physics/motion.jpg?height=120&width=240",
              progress: 75,
            },
            {
              id: "force",
              title: "Force",
              description: "Understanding different types of forces and Newton's laws",
              topics: 5,
              image: "/physics/force.avif?height=120&width=240",
              progress: 0,
            },
            {
              id: "mechanics",
              title: "Mechanics",
              description: "Study of motion, forces, energy, and the fundamental principles of classical mechanics",
              topics: 8,
              image: "/physics/mechanics.jpg?height=120&width=240",
              progress: 75,
            },
            {
              id: "energy",
              title: "Energy",
              description: "Concepts of work, energy, power, and conservation principles",
              topics: 5,
              image: "/physics/energy.webp?height=120&width=240",
              progress: 0,
            },
            {
              id: "gravity",
              title: "Gravity",
              description: "Study of gravitational forces, orbital mechanics, and universal gravitation",
              topics: 4,
              image: "/physics/gravity.webp?height=120&width=240",
              progress: 0,
            },
            {
              id: "waves",
              title: "Waves and Oscillations",
              description: "Understand wave phenomena, sound, light, and periodic motion",
              topics: 7,
              image: "/physics/waves.webp?height=120&width=240",
              progress: 0,
            },
            {
              id: "ideal-gas",
              title: "Ideal Gas",
              description: "Study of gas laws, kinetic theory, and thermodynamic principles",
              topics: 4,
              image: "/physics/ideal gas.jpeg?height=120&width=240",
              progress: 0,
            },
            {
              id: "electricity",
              title: "Electricity",
              description: "Discover electric charges, currents, and electrical phenomena",
              topics: 7,
              image: "/physics/electricity.jpeg?height=120&width=240",
              progress: 10,
            },
            {
              id: "magnetics",
              title: "Magnetism",
              description: "Study of magnetic fields, forces, and electromagnetic induction",
              topics: 5,
              image: "/physics/magnetics.jpeg?height=120&width=240",
              progress: 0,
            },
            {
              id: "relativity",
              title: "Relativity",
              description: "Einstein's theories of special and general relativity",
              topics: 6,
              image: "/physics/relativity.jpg?height=120&width=240",
              progress: 0,
            },
            {
              id: "quantum",
              title: "Quantum Physics",
              description: "Principles of quantum mechanics and wave-particle duality",
              topics: 7,
              image: "/physics/quantum.jpg?height=120&width=240",
              progress: 0,
            },
            {
              id: "modern",
              title: "Modern Physics",
              description: "Explore relativity, quantum mechanics, and the physics of the 20th century",
              topics: 8,
              image: "/physics/modern.jpeg?height=120&width=240",
              progress: 0,
            },
            {
              id: "nuclear physics",
              title: "Nuclear Physics",
              description: "Study of atomic nuclei, radioactivity, and nuclear reactions",
              topics: 6,
              image: "/physics/nuclear.png?height=120&width=240",
              progress: 0,
            }
          
        ]
      case "chemistry":
        return [
          {
            id: "introduction to chemistry",
            title: "Introduction to Chemistry",
            description: "Fundamental concepts, matter, and the scientific method in chemistry",
            topics: 5,
            image: "/chemistry/Introduction to Chemistry.jpg?height=120&width=240",
            progress: 0,
          },
          {
            id: "atomic",
            title: "Atomic Structure",
            description: "Study of atoms, subatomic particles, and electron configurations",
            topics: 6,
            image: "/chemistry/Atomic Structure.jpg?height=120&width=240",
            progress: 0,
          },
          {
            id: "bonding",
            title: "Chemical Bonding",
            description: "Types of bonds (ionic, covalent, metallic) and molecular structures",
            topics: 7,
            image: "/chemistry/Chemical Bonding.jpg?height=120&width=240",
            progress: 0,
          },
          {
            id: "reaction",
            title: "Chemical Reactions",
            description: "Types of reactions, balancing equations, and stoichiometry",
            topics: 8,
            image: "/chemistry/Chemical Reactions.jpg?height=120&width=240",
            progress: 0,
          },
          {
            id: "periodic table",
            title: "Periodic Table",
            description: "Elements, trends, and properties organized in the periodic table",
            topics: 6,
            image: "/chemistry/Periodic Table.webp?height=120&width=240",
            progress: 0,
          },
          {
            id: "gases",
            title: "Gases",
            description: "Gas laws, kinetic molecular theory, and behavior of gases",
            topics: 5,
            image: "/chemistry/Gases.jpg?height=120&width=240",
            progress: 0,
          },
          {
            id: "organic",
            title: "Organic Chemistry",
            description: "Study of carbon compounds, hydrocarbons, and functional groups",
            topics: 9,
            image: "/chemistry/Organic Chemistry.jpg?height=120&width=240",
            progress: 0,
          },
          {
            id: "acid-base",
            title: "Acids and Bases",
            description: "pH, neutralization, buffers, and acid-base theories",
            topics: 6,
            image: "/chemistry/Acids and Bases.webp?height=120&width=240",
            progress: 0,
          },
          {
            id: "chemical energy",
            title: "Chemical Energy",
            description: "Thermochemistry, enthalpy, entropy, and Gibbs free energy",
            topics: 6,
            image: "/chemistry/Chemical Energy.avif?height=120&width=240",
            progress: 0,
          },
          {
            id: "industrial chemistry",
            title: "Industrial Chemistry",
            description: "Chemical processes, manufacturing, and applications in industry",
            topics: 7,
            image: "/chemistry/Industrial Chemistry.jpg?height=120&width=240",
            progress: 0,
          }
        ]
      case "biology":
  return [
    {
      id: "cell-biology",
      title: "Cell Biology",
      description: "Explore the structure and function of cells, the basic units of life",
      topics: 7,
      image: "/biology/Cell Biology.jpeg?height=120&width=240",
      progress: 80,
    },
    {
      id: "genetics",
      title: "Genetics",
      description: "Understand inheritance, DNA, and the molecular basis of heredity",
      topics: 8,
      image: "/biology/Genetics.jpeg?height=120&width=240",
      progress: 50,
    },
    {
      id: "human-physiology",
      title: "Human Physiology",
      description: "Learn about the functions and systems of the human body",
      topics: 9,
      image: "/biology/Human Physiology.jpg?height=120&width=240",
      progress: 20,
    },
    {
      id: "ecology",
      title: "Ecology",
      description: "Study the relationships between organisms and their environment",
      topics: 6,
      image: "/biology/Ecology.jpg?height=120&width=240",
      progress: 0,
    },
    {
      id: "evolution",
      title: "Evolution",
      description: "Discover the mechanisms of natural selection and speciation",
      topics: 5,
      image: "/biology/Evolution.jpg?height=120&width=240",
      progress: 10,
    },
    {
      id: "microbiology",
      title: "Microbiology",
      description: "Explore microorganisms like bacteria, viruses, and fungi",
      topics: 7,
      image: "/biology/Microbiology.jpg?height=120&width=240",
      progress: 0,
    },
    {
      id: "plant-biology",
      title: "Plant Biology",
      description: "Study photosynthesis, plant structures, and reproduction",
      topics: 6,
      image: "/biology/Plant Biology.jpeg?height=120&width=240",
      progress: 0,
    },
    {
      id: "biochemistry",
      title: "Biochemistry",
      description: "Examine biomolecules, enzymes, and metabolic pathways",
      topics: 8,
      image: "/biology/Biochemistry.jpg?height=120&width=240",
      progress: 30,
    }
  ];
      case "astronomy":
        return [
          {
            id: "solar-system",
            title: "Solar System",
            description: "Planets, moons, and small bodies in our cosmic neighborhood",
            topics: 6,
            image: "/astronomy/Solar System.jpg?height=120&width=240",
            progress: 25,
          },
          {
            id: "stars",
            title: "Stars & Stellar Evolution",
            description: "Life cycles of stars from birth to supernovae",
            topics: 5,
            image: "/astronomy/Stars & Stellar Evolution.jpg?height=120&width=240",
            progress: 10,
          },
          {
            id: "galaxies",
            title: "Galaxies & Cosmology",
            description: "Structure of galaxies and the large-scale universe",
            topics: 7,
            image: "/astronomy/Galaxies & Cosmology.webp?height=120&width=240",
            progress: 0,
          },
          {
            id: "telescopes",
            title: "Telescopes & Observation",
            description: "Tools and techniques for studying the cosmos",
            topics: 4,
            image: "/astronomy/Telescopes & Observation.jpeg?height=120&width=240",
            progress: 5,
          },
          {
            id: "space-exploration",
            title: "Space Exploration",
            description: "Missions, technology, and future of space travel",
            topics: 5,
            image: "/astronomy/Space Exploration.jpeg?height=120&width=240",
            progress: 15,
          }
        ];
      case "medical science":
        return [
          {
            id: "human-anatomy",
            title: "Human Anatomy",
            description: "Structure and organization of the human body",
            topics: 8,
            image: "/medical/anatomy.svg?height=120&width=240",
            progress: 20,
          },
          {
            id: "physiology",
            title: "Human Physiology",
            description: "Functions of organs and body systems",
            topics: 7,
            image: "/medical/physiology.svg?height=120&width=240",
            progress: 10,
          },
          {
            id: "pathology",
            title: "Pathology",
            description: "Study of disease causes and effects",
            topics: 6,
            image: "/medical/pathology.svg?height=120&width=240",
            progress: 5,
          },
          {
            id: "pharmacology",
            title: "Pharmacology",
            description: "Drug actions and therapeutic applications",
            topics: 5,
            image: "/medical/pharmacy.svg?height=120&width=240",
            progress: 0,
          },
          {
            id: "medical-diagnostics",
            title: "Medical Diagnostics",
            description: "Techniques for disease detection and analysis",
            topics: 4,
            image: "/medical/diagnostics.svg?height=120&width=240",
            progress: 15,
          }
        ];
      default:
        return [
          {
            id: "intro",
            title: "Introduction",
            description: "Basic concepts and principles of the subject",
            topics: 5,
            image: "/placeholder.svg?height=120&width=240",
            progress: 0,
          },
        ]
    }
  }

  const chapters = getChapters(subjectId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {chapters.map((chapter, index) => (
        <motion.div
          key={chapter.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-full">
                <img
                  src={chapter.image || "/placeholder.svg"}
                  alt={chapter.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{chapter.title}</CardTitle>
                    <Badge variant="outline">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {chapter.topics} topics
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{chapter.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  {isAuthenticated && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{chapter.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${chapter.progress}%` }} />
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={chapter.progress === 100 ? "outline" : "default"}>
                    <Link href={`/visualearn/${subjectId}/${chapter.id}`}>
                      {chapter.progress === 100 ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Review Chapter
                        </>
                      ) : (
                        <>
                          {chapter.progress > 0 ? "Continue Learning" : "Start Learning"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
