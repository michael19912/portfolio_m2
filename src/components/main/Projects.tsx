'use client'

import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { Badge } from '../ui/badge'
import { BentoGrid, BentoGridItem } from '../ui/bento-grid'
import { Tags } from 'lucide-react'
import { useState, useMemo } from 'react'

const projectsData = [
  {
    title: 'SquareSigns',
    description: 'Collaborated with team members to develop a full stack web application using React and Node.js, implementing modular components, REST APIs, database integration and scalable, maintainable backend architecture.',
    imageURL: '/2.jpg',
    live:'https://www.squaresigns.com/',
    tags: ['Javascript', 'React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'City Drinks',
    description: 'CityDrinks’ ecommerce platform features a React/Redux and Tailwind CSS frontend, Node.js/Express backend with MongoDB, integrated Stripe/PayPal payments, JWT authentication, REST APIs and CI/CD pipelines.',
    imageURL: '/1.jpg',
    tags: ['React', 'Redux', 'Tailwind CSS', 'Node', 'Express', 'MongoDB'],
    live:'https://citydrinks.com/'
  },
  {
    title: 'Riverben',
    description: 'For Andrews Acres, I contributed build a responsive ecommerce platform featuring a React frontend with Redux and Tailwind CSS, a Node.js/Express backend with MongoDB, integrated Stripe/PayPal payments, JWT authentication, REST APIs.',
    imageURL: '/6.jpg',
    tags: ['React', 'Redux', 'Tailwind CSS', 'Node', 'Express', 'MongoDB','AWS'],
    live:'https://riverbendhome.com/'
  },
  {
    title: 'Riverbend Home',
    description: 'Built a responsive ecommerce platform for Riverbend Home using Vue.js, Laravel, MySQL, and Tailwind CSS, integrating Stripe payments, inventory APIs and optimizing frontend performance and backend scalability.',
    imageURL: '/work10.jpg',
    live: 'https://riverbendhome.com/',
    github: '',
    blog: '',
    tags: ['Vue', 'Laravel', 'MySQL', 'Tailwind CSS',],
  },
  {
    title: 'BonniesBarkery',
    description: 'Collaborated with team members to develop modular Vue.js components and Laravel controllers, applying clean architecture, reusable logic and API driven workflows to improve maintainability and accelerate feature delivery.',
    imageURL: '/work7.jpg',
    tags: ['Vue','Php','Laravel', 'MySQL', 'Tailwind CSS',],
    live:'https://bonniesbarkery.com/'
  },
  {
    title: 'Fultongrace',
    description: 'Worked with colleagues to build Fulton Grace site using React/Redux frontend, Tailwind CSS, Django/PostgreSQL backend, REST APIs, JWT auth, Elasticsearch search, responsive design and CI/CD pipelines.',
    imageURL: '/12.jpg',
    tags: ['React', 'Django', 'Terraform', 'Tailwind CSS', 'PostgreSQL','AWS'],
    live:'https://fultongrace.com'
  },
  {
    title: 'Thoroughbredford',
    description: 'Developed and managed the Thoroughbred Ford platform with Svelte frontend and Node.js backend, integrating Stripe payments, Google Maps, REST APIs, and delivering scalable, high performance solutions.',
    imageURL: '/13.jpg',
    tags: ['Svelte', 'Node', 'MySQL', 'Google Maps',],
    live:'https://www.thoroughbredford.com/'
  },

    {
    title: 'Roistat',
    description: 'Collaborated with a team to develop a dynamic full stack platform using React frontend and Django/Python backend, styled with Bootstrap & AnimateCSS, deployed on AWS for high performance and responsive user experience',
    imageURL: '/18.jpg',
    tags: ['React', 'Python', 'Django', 'Bootstrap','AnimateCSS', 'AWS'],
    live:'https://roistat.com/'
  },

     {
    title: 'Guideline Central',
    description: 'I contributed to building Guideline Central web platform with Laravel, developing modular components, integrating APIs and databases and delivering a scalable, high performance solution.',
    imageURL: '/19.jpg',
    tags: ['Php', 'Laravel', 'AWS', 'AMP',],
    live:'https://www.guidelinecentral.com/'
  },
]

// Extract all unique tags from projects
const allTags = Array.from(
  new Set(projectsData.flatMap(project => project.tags))
).sort();

const LiveIndicator = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
  </span>
)

const VideoIndicator = () => (
  <svg fill="#000000" width="15px" height="15px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <title>youtube</title>
      <path d="M12.932 20.459v-8.917l7.839 4.459zM30.368 8.735c-0.354-1.301-1.354-2.307-2.625-2.663l-0.027-0.006c-3.193-0.406-6.886-0.638-10.634-0.638-0.381 0-0.761 0.002-1.14 0.007l0.058-0.001c-0.322-0.004-0.701-0.007-1.082-0.007-3.748 0-7.443 0.232-11.070 0.681l0.434-0.044c-1.297 0.363-2.297 1.368-2.644 2.643l-0.006 0.026c-0.4 2.109-0.628 4.536-0.628 7.016 0 0.088 0 0.176 0.001 0.263l-0-0.014c-0 0.074-0.001 0.162-0.001 0.25 0 2.48 0.229 4.906 0.666 7.259l-0.038-0.244c0.354 1.301 1.354 2.307 2.625 2.663l0.027 0.006c3.193 0.406 6.886 0.638 10.634 0.638 0.38 0 0.76-0.002 1.14-0.007l-0.058 0.001c0.322 0.004 0.702 0.007 1.082 0.007 3.749 0 7.443-0.232 11.070-0.681l-0.434 0.044c1.298-0.362 2.298-1.368 2.646-2.643l0.006-0.026c0.399-2.109 0.627-4.536 0.627-7.015 0-0.088-0-0.176-0.001-0.263l0 0.013c0-0.074 0.001-0.162 0.001-0.25 0-2.48-0.229-4.906-0.666-7.259l0.038 0.244z"></path>
    </g>
  </svg>
)

const BlogIndicator = () => (
  <svg fill="#000000" height="15px" width="15px" viewBox="0 0 32 32">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <path d="M17.8,18H15c-0.6,0-1-0.4-1-1v-2.8c0-0.3,0.1-0.5,0.3-0.7L24.9,2.9c0.2-0.2,0.4-0.3,0.7-0.3l0,0c0.3,0,0.5,0.1,0.7,0.3 l2.8,2.8c0.4,0.4,0.4,1,0,1.4L18.5,17.7C18.3,17.9,18.1,18,17.8,18z"></path>
      </g>
      <path d="M19.9,19.1c-0.6,0.6-1.3,0.9-2.1,0.9H15c-1.7,0-3-1.3-3-3v-2.8c0-0.8,0.3-1.6,0.9-2.1L18.9,6H9c0.7,0,1.3,0.3,1.3,0v14 c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-9.9L19.9,19.1z"></path>
    </g>
  </svg>
)

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showAll, setShowAll] = useState(false)

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projectsData
    return projectsData.filter(project =>
      selectedTags.every(tag => project.tags.includes(tag))
    )
  }, [selectedTags])

  const projectsToDisplay = useMemo(() => {
    if (showAll) return filteredProjects
    return filteredProjects.slice(0, 5)
  }, [filteredProjects, showAll])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => setSelectedTags([])
  const toggleShowAll = () => setShowAll(!showAll)

  let lastColSpan2Index = 0
  const isColSpan2 = (index: number) => {
    if (index === lastColSpan2Index + 3) {
      lastColSpan2Index = index
      return true
    }
    return false
  }

  const totalProjects = projectsData.length

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 left-16 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-80 right-24 w-20 h-20 bg-blue-500/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-60 left-1/3 w-16 h-16 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-1/4 w-24 h-24 bg-blue-400/10 rounded-lg rotate-12 float-animation"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-1/4 right-1/2 translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-l from-blue-400/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text text-transparent mb-4">
            My Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
            A collection of innovative projects showcasing technical expertise & creativity.
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            Total projects: {totalProjects}
          </p>
        </motion.div>

        {/* Tags Filter Section */}
        {/* <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col items-center">
            <div className="relative bg-card/60 backdrop-blur-md border border-primary/20 rounded-3xl p-6 shadow-xl w-full max-w-3xl transition-transform hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Tags className="h-6 w-6 text-primary" />
                <h3 title="Filter by tags" className="text-lg font-semibold text-foreground">
                  Filter by Tags
                </h3>
                {selectedTags.length > 0 && (
                  <button
                    title="Clear all filters"
                    onClick={clearFilters}
                    className="ml-3 text-sm text-muted-foreground hover:text-primary underline transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    title={`Filter by ${tag}`}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-1 rounded-full font-medium transition-all 
                                hover:scale-105 hover:shadow-md
                                ${selectedTags.includes(tag) ? 'bg-primary text-primary-foreground border-none' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>

      <BentoGrid className="max-w-6xl mx-auto [@media(max-width:425px)]:grid-cols-1">
        {projectsToDisplay.map((project, i) => {
          const isFifthProject = !showAll && i === 4
          const isHiddenProject = !showAll && i >= 5

          if (isHiddenProject) return null

          return (
            <div key={project.title} className="relative">
              <BentoGridItem
                title={project.title}
                description={
                  <div className="space-y-1 text-sm text-foreground">
                    <p>{project.description}<br /><br />Skill: {project.tags.join(', ')}</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {"live" in project && (
                        <a
                          title={`View ${project.title} live demo`}
                          href={project.live as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <LiveIndicator />
                          Live
                        </a>
                      )}
                      {"video" in project && (
                        <a
                          title={`Watch ${project.title} video demo`}
                          href={project.video as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50" >
                          <VideoIndicator />
                          Video
                        </a>
                      )}
                    </div>
                  </div>
                }
                header={
                  <div className="relative w-full h-full [@media(max-width:425px)]:min-h-[9rem] min-h-[6rem] rounded-xl overflow-hidden">
                    <Image
                      src={project.imageURL}
                      alt={project.title}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={80}
                      fill
                    />
                  </div>
                }
                className={isFifthProject ? 'blur-[3px] pointer-events-none' : ''}
              />

              {isFifthProject && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    title={`Show All Projects (${filteredProjects.length - 4})`}
                    onClick={toggleShowAll}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Show All ({filteredProjects.length}) Projects
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects match the selected tags. Try selecting different tags.
            </p>
          </div>
        )}

        {showAll && filteredProjects.length > 5 && (
          <div className="col-span-full text-center mt-8">
            <button
              title="Show Less Projects"
              onClick={toggleShowAll}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Show Less
            </button>
          </div>
        )}
      </BentoGrid>
    </section>
  )
}

export default Projects
