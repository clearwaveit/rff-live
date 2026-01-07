export type Article = {
  slug: string
  title: string
  category: string
  date: string
  excerpt: string
  image: string
  content: string[]
}

export const articles: Article[] = [
  {
    slug: "driving-circular-economy",
    title: "Driving a Circular Economy Through Smarter Recycling",
    category: "FEATURED ARTICLE",
    date: "Dec 2025",
    excerpt:
      "We are committed to transforming plastic waste into valuable resources through advanced processing and responsible sourcing.",
    image: "/service-1.svg",
    content: [
      "At Recycle for Future Ltd, our mission is to reduce environmental impact by turning post-industrial and post-consumer plastics into high‑quality inputs for manufacturing.",
      "Through careful sourcing, sorting, cleaning, and extrusion, we deliver reliable recycled pellets and compounds that help partners participate in the circular economy.",
      "Our approach integrates stringent QA, traceability, and adaptable logistics so organisations can scale recycling without compromising performance or compliance.",
    ],
  },
  {
    slug: "uk-capacity-expansion-partnerships",
    title: "New partnerships to expand recycling capacity across UK",
    category: "COMPANY UPDATE",
    date: "Dec 2025",
    excerpt: "We are partnering with regional processors to increase throughput and coverage.",
    image: "/service-2.svg",
    content: [
      "We have entered strategic agreements with multiple UK processors to expand capacity and shorten lead times.",
      "The partnerships will unlock additional volume for HDPE, LDPE, HIPS, PS and ABS streams, with new QA checkpoints at each stage.",
    ],
  },
  {
    slug: "sourcing-best-practices-post-industrial-plastic",
    title: "Best practices for sourcing post-industrial plastic efficiently",
    category: "INSIGHTS",
    date: "Nov 2025",
    excerpt: "Practical guidance for consistent feedstock quality and stable pricing.",
    image: "/service-3.svg",
    content: [
      "Establishing specification windows and supplier scorecards drives predictable quality across lots.",
      "Aligned incentives and transparent grading help reduce variance and support steady production planning.",
    ],
  },
  {
    slug: "sustainable-materials-expo-highlights",
    title: "RFF at the Sustainable Materials Expo: Highlights",
    category: "EVENTS",
    date: "Oct 2025",
    excerpt: "Key takeaways from panels on circular design and recycled inputs.",
    image: "/service-1.svg",
    content: [
      "From design for disassembly to recycled content standards, the Expo showcased pragmatic steps to scale circularity.",
    ],
  },
  {
    slug: "qa-processes-for-consistent-pellet-performance",
    title: "How our QA processes ensure consistent pellet performance",
    category: "QUALITY",
    date: "Sep 2025",
    excerpt: "Why testing and traceability matter for recycled polymers.",
    image: "/service-2.svg",
    content: [
      "We apply melt flow, contamination, and mechanical property checks on each batch to ensure suitability for downstream use.",
    ],
  },
  {
    slug: "optimising-export-routes-recycled-materials",
    title: "Optimising export routes for recycled materials",
    category: "LOGISTICS",
    date: "Aug 2025",
    excerpt: "Reducing transit times and emissions via smarter routing.",
    image: "/service-3.svg",
    content: [
      "Network analysis and flexible consolidation strategies lower cost while maintaining delivery reliability.",
    ],
  },
  {
    slug: "local-initiatives-reduce-landfill-dependency",
    title: "Local initiatives to reduce landfill dependency",
    category: "COMMUNITY",
    date: "Jul 2025",
    excerpt: "Community programmes proving the impact of recycling participation.",
    image: "/service-1.svg",
    content: [
      "Targeted education and convenient collection points dramatically improve participation and material quality.",
    ],
  },
  {
    slug: "novel-antibiotics-design-with-deep-learning",
    title: "A fun deep learning approach to whip up new antibiotics",
    category: "PUBLICATIONS",
    date: "Aug 14, 2025",
    excerpt: "Exploring generative models for molecular discovery.",
    image: "/service-2.svg",
    content: [
      "We review modern generative techniques and their role in accelerating discovery workflows.",
    ],
  },
  {
    slug: "conversation-with-nobel-laureate-david-macmillan",
    title: "Conversation with Nobel Laureate Sir David MacMillan",
    category: "NEWS",
    date: "Nov 21, 2025",
    excerpt: "A look at our collaboration and why it matters.",
    image: "/service-3.svg",
    content: [
      "We discuss catalytic strategies, scale‑up, and how industry partnerships translate research into impact.",
    ],
  },
]

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug)
}

export function getLatestArticles(limit?: number) {
  const items = articles.slice(1)
  return typeof limit === "number" ? items.slice(0, limit) : items
}

