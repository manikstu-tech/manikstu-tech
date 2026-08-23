const stats = [
  { value: "50+", label: "Partner Organizations" },
  { value: "700+", label: "Villages Reached" },
  { value: "10,000+", label: "Farmers Engaged" },
  { value: "3+", label: "States Covered" },
];

export default function CollaborateImpact() {
  return (
    <section className="bg-manikstu-green py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-manikstu-gold">
            Our Network
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold md:text-4xl">
            Collaboration That Reaches the Last Mile
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-4xl font-bold md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/85">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
