import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Star, Gift } from "lucide-react";
import { snackItems, snackCategories, SnackItem } from "@/data/snacks";

export interface SelectedSnack extends SnackItem {
  quantity: number;
}

interface SnacksSectionProps {
  selectedSnacks: SelectedSnack[];
  onSnacksChange: (snacks: SelectedSnack[]) => void;
}

const SnacksSection = ({ selectedSnacks, onSnacksChange }: SnacksSectionProps) => {
  const [activeCategory, setActiveCategory] = useState('combos');

  const getSnackQuantity = (snackId: string) => {
    const snack = selectedSnacks.find(s => s.id === snackId);
    return snack ? snack.quantity : 0;
  };

  const updateSnackQuantity = (snack: SnackItem, change: number) => {
    const currentQuantity = getSnackQuantity(snack.id);
    const newQuantity = Math.max(0, currentQuantity + change);
    
    const updatedSnacks = selectedSnacks.filter(s => s.id !== snack.id);
    
    if (newQuantity > 0) {
      updatedSnacks.push({ ...snack, quantity: newQuantity });
    }
    
    onSnacksChange(updatedSnacks);
  };

  const filteredSnacks = snackItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-16 bg-gradient-to-b from-card/30 to-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Complete Your <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Add delicious snacks and beverages to make your movie experience perfect
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {snackCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card hover:bg-card/80 text-muted-foreground hover:text-foreground border border-border/50'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Snacks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredSnacks.map((snack) => {
            const quantity = getSnackQuantity(snack.id);
            
            return (
              <div 
                key={snack.id}
                className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={snack.image}
                    alt={snack.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Popular Badge */}
                  {snack.popular && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-accent text-accent-foreground">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  {/* Quantity Badge */}
                  {quantity > 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-primary-foreground">
                        {quantity}
                      </Badge>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {snack.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {snack.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">KES {snack.price}</span>
                      {snack.points && (
                        <Badge variant="outline" className="text-accent border-accent/30 text-xs">
                          <Gift className="w-3 h-3 mr-1" />
                          {snack.points}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    {quantity === 0 ? (
                      <Button
                        variant="cinema"
                        size="sm"
                        className="w-full"
                        onClick={() => updateSnackQuantity(snack, 1)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Order
                      </Button>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateSnackQuantity(snack, -1)}
                          className="h-10 w-10 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <span className="font-semibold text-lg px-4">
                          {quantity}
                        </span>
                        
                        <Button
                          variant="cinema"
                          size="sm"
                          onClick={() => updateSnackQuantity(snack, 1)}
                          className="h-10 w-10 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {selectedSnacks.length > 0 && (
          <div className="mt-12 max-w-md mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
              <h3 className="font-semibold mb-4 text-center">Snacks Added</h3>
              <div className="space-y-2">
                {selectedSnacks.map((snack) => (
                  <div key={snack.id} className="flex justify-between text-sm">
                    <span>{snack.name} × {snack.quantity}</span>
                    <span className="font-medium">KES {snack.price * snack.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/50 mt-4 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Snacks Total</span>
                  <span className="text-primary">
                    KES {selectedSnacks.reduce((total, snack) => total + (snack.price * snack.quantity), 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SnacksSection;