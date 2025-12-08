import { Armchair, CreditCard, QrCode, Smartphone } from "lucide-react";

const features = [
  {
    icon: Armchair,
    title: "Premium Seating",
    description: "Choose from Standard, Premium, or VIP luxury recliners with extra legroom"
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Multiple payment options including cards, digital wallets, and BOGO offers"
  },
  {
    icon: QrCode,
    title: "Instant E-Tickets",
    description: "Get your tickets instantly with QR codes for seamless theater entry"
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Book anywhere, anytime with our responsive mobile experience"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            The <span className="text-gradient">Ultimate</span> Cinema Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From booking to viewing, we've crafted every detail to make your movie experience extraordinary
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass rounded-xl p-6 text-center group hover:shadow-glow transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
