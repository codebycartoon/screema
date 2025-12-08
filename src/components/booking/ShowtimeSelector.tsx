import { useState } from "react";
import { Showtime } from "@/types/cinema";
import { theaters } from "@/data/movies";
import { cn } from "@/lib/utils";
import { MapPin, Calendar } from "lucide-react";

interface ShowtimeSelectorProps {
  showtimes: Showtime[];
  selectedShowtime: Showtime | null;
  onSelect: (showtime: Showtime) => void;
}

const ShowtimeSelector = ({ showtimes, selectedShowtime, onSelect }: ShowtimeSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Group by theater
  const groupedByTheater = showtimes.reduce((acc, showtime) => {
    const theater = theaters.find(t => t.id === showtime.theaterId);
    if (!theater) return acc;
    
    if (!acc[theater.id]) {
      acc[theater.id] = {
        theater,
        showtimes: []
      };
    }
    acc[theater.id].showtimes.push(showtime);
    return acc;
  }, {} as Record<string, { theater: typeof theaters[0], showtimes: Showtime[] }>);

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  return (
    <div className="space-y-8">
      {/* Date Selector */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg font-semibold">Select Date</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {dates.map((d) => (
            <button
              key={d.value}
              onClick={() => setSelectedDate(d.value)}
              className={cn(
                "flex flex-col items-center min-w-[70px] py-3 px-4 rounded-xl transition-all",
                selectedDate === d.value
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-secondary hover:bg-secondary/80"
              )}
            >
              <span className="text-xs font-medium opacity-80">{d.day}</span>
              <span className="text-2xl font-bold">{d.date}</span>
              <span className="text-xs opacity-80">{d.month}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theater & Showtimes */}
      <div className="space-y-6">
        {Object.values(groupedByTheater).map(({ theater, showtimes: theaterShowtimes }) => (
          <div key={theater.id} className="glass rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-display text-lg font-semibold">{theater.name}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{theater.location}</span>
                </div>
              </div>
            </div>

            {/* Group by screen */}
            <div className="space-y-4">
              {theater.screens.map((screen) => {
                const screenShowtimes = theaterShowtimes.filter(s => s.screenId === screen.id);
                if (screenShowtimes.length === 0) return null;

                return (
                  <div key={screen.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded",
                        screen.type === 'IMAX' && "bg-accent/20 text-accent",
                        screen.type === 'Dolby' && "bg-primary/20 text-primary",
                        screen.type === '4DX' && "bg-green-500/20 text-green-400",
                        screen.type === 'Standard' && "bg-muted text-muted-foreground"
                      )}>
                        {screen.type}
                      </span>
                      <span className="text-sm text-muted-foreground">{screen.name}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {screenShowtimes.map((showtime) => (
                        <button
                          key={showtime.id}
                          onClick={() => onSelect(showtime)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            selectedShowtime?.id === showtime.id
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                              : "bg-secondary hover:bg-secondary/80 border border-border"
                          )}
                        >
                          <span>{showtime.time}</span>
                          <span className="block text-xs opacity-70 mt-0.5">
                            ${showtime.price.standard}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowtimeSelector;
