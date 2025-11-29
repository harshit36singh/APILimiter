

export default function Cards() {
  return (
    <section className="px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {cards.map((c, i) => (
        <div key={i} className="border border-white/10 rounded-xl p-6 bg-black hover:bg-white hover:text-black transition">
          <div className="text-sm">{c.time}</div>
          <h2 className="text-4xl font-bold">{c.title}</h2>
          <p className="mt-4 text-white/60">{c.desc}</p>
        </div>
      ))}
    </section>
  );
}
