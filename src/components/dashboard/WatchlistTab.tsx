import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Calendar, 
  Star,
  Trash2,
  Bell,
  Ticket
} from "lucide-react";
import { mockWatchlist, WatchlistItem } from "@/data/dashboard";

const WatchlistTab = () => {
  const [watchlist, setWatchlist] = useState(mockWatchlist);

  const removeFromWatchlist = (id: string) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'now_showing':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Now Showing</Badge>;
      case 'coming_soon':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <p className="text-muted-foreground mt-1">
          Movies you want to watch • {watchlist.length} items
        </p>
      </div>

      {watchlist.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your watchlist is empty</h3>
            <p className="text-muted-foreground mb-6">
              Start adding movies you want to watch to keep track of them
            </p>
            <Button>Browse Movies</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                  <img
                    src={item.moviePoster}
                    alt={item.movieTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Remove Button */}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromWatchlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    {getStatusBadge(item.status)}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {item.movieTitle}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        <span>{item.rating}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{item.releaseDate.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.genre.slice(0, 2).map((g) => (
                      <Badge key={g} variant="secondary" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {item.status === 'now_showing' ? (
                      <Button className="flex-1" size="sm">
                        <Ticket className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Get Notified
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Added {item.addedAt.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistTab;