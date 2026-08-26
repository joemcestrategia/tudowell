'use client';

import { useState, useEffect } from 'react';

const slides = [
  {
    image: '/images/hero_megastore.jpg',
    title: 'O Que Você Precisa. Tudo em um só lugar.',
    subtitle: 'Tecnologia, casa, estilo e espiritualidade.',
  },
  {
    image: '/images/cat_tech.jpg',
    title: 'Inovação e Tecnologia',
    subtitle: 'Os melhores smartphones do mercado.',
  },
  {
    image: '/images/hero.jpg',
    title: 'O Seu Estilo. O Seu Time.',
    subtitle: 'Design icônico. Feito para todos os fãs.',
  },
  {
    image: '/images/cat_home.jpg',
    title: 'Sua Casa. Mais Inteligente.',
    subtitle: 'Os melhores eletroportáteis para o seu dia a dia.',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" style={{ overflow: 'hidden', position: 'relative' }}>
      <div 
        className="carousel-container" 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="container hero-content">
              {/* Resetting animation class by using a key forces it to re-run */}
              <h1 key={`title-${current}`} className="hero-title animate-slide-up">{slide.title}</h1>
              <p key={`sub-${current}`} className="hero-subtitle animate-slide-up-delayed">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
