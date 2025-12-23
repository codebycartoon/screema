import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Movie Enthusiast",
      rating: 5,
      comment: "The booking experience is seamless and the seat selection is incredibly intuitive. Love the digital tickets!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Customer",
      rating: 5,
      comment: "Best cinema experience in the city. The IMAX screens and sound quality are absolutely phenomenal.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Family Moviegoer",
      rating: 5,
      comment: "The rewards program is fantastic! We've earned so many free snacks and tickets. Highly recommend!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "500K+", label: "Tickets Sold" },
    { number: "4.9/5", label: "Customer Rating" },
    { number: "15+", label: "Cinema Locations" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied moviegoers who trust SCREEMA for their entertainment needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-16 pt-8 border-t border-border/50">
          <Badge variant="outline" className="px-4 py-2">
            <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
            4.9/5 Rating
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            🔒 Secure Payments
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            📱 Mobile Tickets
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            🎯 Instant Booking
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;