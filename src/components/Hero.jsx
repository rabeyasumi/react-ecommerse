export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-in">
        <div>
          <h1>Fashion <span>2026</span></h1>
          <p>Pellentesque libero nisl, aliquet quis libero et, posuere consectetur diam metus.</p>
        </div>
      </div>
      <img className="hero-img" src="/hero.png" alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
    </section>
  );
}
