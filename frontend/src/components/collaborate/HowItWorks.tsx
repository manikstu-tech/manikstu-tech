const steps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We listen to communities and partners to understand local needs, assets and gaps.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We co-create programs that blend our livestock expertise with partner strengths.",
  },
  {
    step: "03",
    title: "Deploy",
    description:
      "We implement on the ground with training, infrastructure and continuous handholding.",
  },
  {
    step: "04",
    title: "Measure",
    description:
      "We track outcomes and refine together to ensure durable, scalable impact.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-green">
            How It Works
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold text-charcoal md:text-4xl">
            From First Conversation to{" "}
            <span className="text-manikstu-green">Shared Impact</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-grey">
            A simple, transparent process that keeps communities and partners
            aligned at every stage.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-xl border border-light-grey bg-manikstu-cream p-6"
            >
              <span className="font-heading text-3xl font-bold text-manikstu-green/40">
                {item.step}
              </span>
              <h3 className="mt-3 text-base font-semibold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-grey">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
