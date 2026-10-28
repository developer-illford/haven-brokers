interface Testimonial {
  name: string;
  location: string;
  quote: string;
  service: string;
}

interface TestimonialsProps {
  testimonials: readonly Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-navy-950 sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-navy-900/70">
            Real stories from Australians who trusted Haven Brokers with their finance goals.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="flex flex-col rounded-xl border border-navy-900/10 bg-white p-8 shadow-sm"
            >
              <svg className="h-8 w-8 text-gold-500/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Z" />
              </svg>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-navy-900/80">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-6 border-t border-navy-900/10 pt-4">
                <p className="font-semibold text-navy-950">{item.name}</p>
                <p className="text-xs text-navy-900/50">{item.location} · {item.service}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
