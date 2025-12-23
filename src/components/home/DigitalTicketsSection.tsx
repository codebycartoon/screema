import { Button } from "@/components/ui/button";
import { Smartphone, QrCode, Download, CheckCircle } from "lucide-react";

const DigitalTicketsSection = () => {
  const features = [
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code Tickets",
      description: "Instant digital tickets delivered to your phone"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Friendly",
      description: "Works on any smartphone, no app required"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Quick Entry",
      description: "Skip the queue, just scan and enter"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-card/50 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Digital <span className="text-gradient">Tickets</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              No printing. No hassle. Just scan your phone and enjoy the show.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="cinema" size="lg">
                Book Your First Ticket
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Sample
              </Button>
            </div>
          </div>

          {/* Mock Phone with QR Ticket */}
          <div className="relative">
            <div className="mx-auto w-80 h-[600px] bg-card rounded-[3rem] p-6 shadow-elevated">
              {/* Phone Screen */}
              <div className="w-full h-full bg-background rounded-[2rem] p-6 overflow-hidden">
                {/* Ticket Header */}
                <div className="text-center mb-6">
                  <div className="font-display text-xl font-bold text-primary mb-2">SCREEMA</div>
                  <div className="text-sm text-muted-foreground">Digital Ticket</div>
                </div>

                {/* Movie Info */}
                <div className="bg-card rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-lg mb-2">Dune: Part Two</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>CinePlex Grand - Screen 1 (IMAX)</p>
                    <p>Today, 7:15 PM</p>
                    <p>Seats: A12, A13</p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-white p-6 rounded-lg text-center mb-4">
                  <div className="w-32 h-32 mx-auto bg-black rounded-lg flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-white" />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Scan at entrance</p>
                </div>

                {/* Booking Reference */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Booking Reference</p>
                  <p className="font-mono text-sm font-bold">CM-2024-001234</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-16 border-t border-border/50">
          <div className="text-center mb-8">
            <h3 className="font-display text-xl font-semibold mb-2">Trusted by thousands</h3>
            <p className="text-muted-foreground">Join over 50,000 movie lovers using digital tickets</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">2s</div>
              <div className="text-sm text-muted-foreground">Avg. Scan Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Digital Tickets</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">0</div>
              <div className="text-sm text-muted-foreground">Paper Waste</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalTicketsSection;