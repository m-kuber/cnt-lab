import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to BookStore</h1>
          <p>Discover your next great read with us.</p>
          <button className="btn">Browse Catalogue</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
