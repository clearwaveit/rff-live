import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug, articles } from "@/data/news"

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) return notFound()

  return (
    <main className="min-h-screen">
      <section className="relative min-h-[40vh] overflow-hidden">
        <Image src="/hero-bg.svg" alt={article.title} fill priority className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1600px] px-[2%] pb-16">
          <div className="max-w-4xl">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 backdrop-blur px-3 py-1 text-xs font-semibold text-gray-700">
                <span className="inline-block h-2 w-2 rounded-sm bg-green-500" />
                {article.category} · {article.date}
              </span>
            </div>
            <h1 className="text-white text-3xl sm:text-5xl font-light tracking-tight">{article.title}</h1>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-[1600px] px-[2%] py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="relative h-72 sm:h-80 md:h-96 rounded-[1.5rem] overflow-hidden ring-1 ring-black/5">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
              </div>
              <div className="prose prose-teal max-w-none mt-8">
                {article.content.map((p, i) => (
                  <p key={i} className="text-teal-900 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
            <aside className="lg:col-span-1">
              <div className="rounded-[1.5rem] bg-white ring-1 ring-black/5 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-teal-900">More News</h3>
                <ul className="mt-4 space-y-3">
                  {articles.filter((a) => a.slug !== article.slug).slice(0, 5).map((a) => (
                    <li key={a.slug}>
                      <Link href={`/newsroom/${a.slug}`} className="text-sm font-medium text-[#0D0D0D] hover:text-teal-800">
                        {a.title}
                      </Link>
                      <div className="text-xs text-gray-500">{a.category} · {a.date}</div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href="/newsroom" className="inline-block rounded-xl bg-gray-900 text-white px-5 py-3 text-sm font-medium">Back to Newsroom</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

