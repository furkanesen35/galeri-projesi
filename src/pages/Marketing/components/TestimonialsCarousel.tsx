import { useState, useEffect } from 'react';
import { mockApi } from '../../../services/mockApi';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.marketing.getTestimonials().then((response) => {
      setTestimonials(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-6 animate-pulse">
          <div className="h-8 bg-border rounded w-64 mx-auto mb-4"></div>
          <div className="h-40 bg-border rounded"></div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          What Our Customers Say
        </h2>

        <div className="relative">
          {/* Testimonial content */}
          <div className="bg-surface border border-border rounded-xl p-8 md:p-12 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-primary">
                  {currentTestimonial?.author.charAt(0)}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  {currentTestimonial?.author}
                </h3>
                <p className="text-sm text-text-secondary">
                  {currentTestimonial?.role} at {currentTestimonial?.company}
                </p>
                <div className="flex gap-1 mt-2">
                  {[...Array(currentTestimonial?.rating || 5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-warning fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <blockquote className="text-lg text-foreground leading-relaxed">
              "{currentTestimonial?.content}"
            </blockquote>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-border hover:bg-border-hover'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
