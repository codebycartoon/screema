import { useState, useMemo } from "react";
import { Seat } from "@/types/cinema";
import { cn } from "@/lib/utils";

interface SeatMapProps {
  rows: number;
  seatsPerRow: number;
  bookedSeats?: string[];
  onSelectionChange: (seats: Seat[]) => void;
  screenType?: string;
}

const SeatMap = ({ 
  rows, 
  seatsPerRow, 
  bookedSeats = [], 
  onSelectionChange,
  screenType = "Standard"
}: SeatMapProps) => {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const seats = useMemo(() => {
    const seatArray: Seat[][] = [];
    const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let i = 0; i < rows; i++) {
      const row: Seat[] = [];
      const rowLabel = rowLabels[i];
      
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatId = `${rowLabel}${j}`;
        const isVip = i >= rows - 2;
        const isPremium = i >= rows - 4 && i < rows - 2;
        
        row.push({
          id: seatId,
          row: rowLabel,
          number: j,
          type: isVip ? 'vip' : isPremium ? 'premium' : 'standard',
          status: bookedSeats.includes(seatId) ? 'booked' : 'available'
        });
      }
      seatArray.push(row);
    }
    
    return seatArray;
  }, [rows, seatsPerRow, bookedSeats]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;
    
    const newSelected = new Set(selectedSeats);
    if (newSelected.has(seat.id)) {
      newSelected.delete(seat.id);
    } else {
      if (newSelected.size >= 10) {
        return; // Max 10 seats
      }
      newSelected.add(seat.id);
    }
    
    setSelectedSeats(newSelected);
    
    const selectedSeatObjects = seats
      .flat()
      .filter(s => newSelected.has(s.id))
      .map(s => ({ ...s, status: 'selected' as const }));
    
    onSelectionChange(selectedSeatObjects);
  };

  const getSeatStyles = (seat: Seat) => {
    const isSelected = selectedSeats.has(seat.id);
    const isBooked = seat.status === 'booked';
    
    const baseStyles = "w-7 h-7 md:w-8 md:h-8 rounded-t-lg transition-all duration-200 text-xs font-medium flex items-center justify-center cursor-pointer";
    
    if (isBooked) {
      return cn(baseStyles, "bg-muted/50 cursor-not-allowed opacity-50");
    }
    
    if (isSelected) {
      return cn(baseStyles, "bg-primary text-primary-foreground shadow-lg shadow-primary/50 scale-110");
    }
    
    switch (seat.type) {
      case 'vip':
        return cn(baseStyles, "bg-accent/20 border-2 border-accent hover:bg-accent hover:text-accent-foreground");
      case 'premium':
        return cn(baseStyles, "bg-primary/20 border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground");
      default:
        return cn(baseStyles, "bg-secondary hover:bg-secondary/80 border border-border");
    }
  };

  return (
    <div className="space-y-8">
      {/* Screen */}
      <div className="relative">
        <div className="mx-auto w-4/5 h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        <div className="mx-auto w-3/5 h-8 bg-gradient-to-b from-primary/20 to-transparent rounded-b-[100%] -mt-1" />
        <p className="text-center text-sm text-muted-foreground mt-2">{screenType} Screen</p>
      </div>

      {/* Seats Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="flex flex-col gap-2 items-center min-w-fit">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-1.5">
              <span className="w-6 text-xs text-muted-foreground font-medium">
                {row[0]?.row}
              </span>
              <div className="flex gap-1.5">
                {row.map((seat, seatIndex) => {
                  // Add aisle gap
                  const hasGap = seatIndex === Math.floor(seatsPerRow / 2) - 1;
                  return (
                    <div key={seat.id} className={cn("flex", hasGap && "mr-4")}>
                      <button
                        onClick={() => handleSeatClick(seat)}
                        disabled={seat.status === 'booked'}
                        className={getSeatStyles(seat)}
                        title={`${seat.id} - ${seat.type}`}
                      >
                        {seat.number}
                      </button>
                    </div>
                  );
                })}
              </div>
              <span className="w-6 text-xs text-muted-foreground font-medium">
                {row[0]?.row}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-secondary border border-border" />
          <span className="text-muted-foreground">Standard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-primary/20 border-2 border-primary/50" />
          <span className="text-muted-foreground">Premium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-accent/20 border-2 border-accent" />
          <span className="text-muted-foreground">VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-primary shadow-lg shadow-primary/50" />
          <span className="text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-t-lg bg-muted/50 opacity-50" />
          <span className="text-muted-foreground">Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
