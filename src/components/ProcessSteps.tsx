interface Step {
  step: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: readonly Step[];
  title?: string;
  subtitle?: string;
}

export default function ProcessSteps({
  steps,
  title = "Our Simple Process",
  subtitle = "From first conversation to settlement, we make finance straightforward.",
}: ProcessStepsProps) {
  return (
    <section className="bg-cream-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-navy-950 sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-navy-900/70">{subtitle}</p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-950 font-serif text-xl font-bold text-gold-400 shadow-lg shadow-navy-950/20">
                {item.step}
              </div>
              <h3 className="mt-5 font-serif text-lg font-semibold text-navy-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
