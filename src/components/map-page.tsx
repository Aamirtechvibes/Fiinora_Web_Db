import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Search, DollarSign, Coffee, Utensils, Hotel, Plane, Car, Activity, Zap, Target } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
    dailyBudget: {
      budget: 120,
      midRange: 180,
      luxury: 350
    },
    costs: {
      coffee: { min: 3, max: 6 },
      meal: { min: 15, max: 45 },
      hotel: { min: 80, max: 400 },
      transport: { min: 1.90, max: 15 }
    }
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    dailyBudget: {
      budget: 90,
      midRange: 150,
      luxury: 300
    },
    costs: {
      coffee: { min: 2, max: 5 },
      meal: { min: 8, max: 40 },
      hotel: { min: 60, max: 350 },
      transport: { min: 1.50, max: 12 }
    }
  },
  {
    id: 3,
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    dailyBudget: {
      budget: 140,
      midRange: 220,
      luxury: 450
    },
    costs: {
      coffee: { min: 3, max: 7 },
      meal: { min: 12, max: 60 },
      hotel: { min: 100, max: 500 },
      transport: { min: 2.90, max: 25 }
    }
  }
];

const nearbyPlaces = [
  { name: "Starbucks Coffee", type: "cafe", distance: "0.2 miles", priceRange: "$3-6", rating: 4.2 },
  { name: "The Local Bistro", type: "restaurant", distance: "0.3 miles", priceRange: "$15-35", rating: 4.5 },
  { name: "Budget Inn", type: "hotel", distance: "0.5 miles", priceRange: "$80-120", rating: 3.8 },
  { name: "Luxury Resort", type: "hotel", distance: "1.2 miles", priceRange: "$250-400", rating: 4.8 },
  { name: "City Mall", type: "shopping", distance: "0.7 miles", priceRange: "$10-200", rating: 4.1 },
];

export function MapPage() {
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tripDuration, setTripDuration] = useState('7');
  const [budgetType, setBudgetType] = useState<'budget' | 'midRange' | 'luxury'>('midRange');

  const totalTripCost = selectedDestination.dailyBudget[budgetType] * parseInt(tripDuration);

  const filteredPlaces = nearbyPlaces.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Cost Explorer
        </h1>
        <p className="text-muted-foreground mt-1">Discover costs for places and plan your smart financial trips</p>
      </div>

      {/* Search Bar */}
      <Card className="glass-card border-primary/20">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                placeholder="Search for places, cafes, restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card border-primary/20 bg-input-background"
              />
            </div>
            <Button className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
              <MapPin className="h-4 w-4 mr-2" />
              Near Me
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trip Planner */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            Smart Trip Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-semibold mb-3 block text-foreground">Destination</label>
              <Select value={selectedDestination.id.toString()} onValueChange={(value) => {
                const dest = destinations.find(d => d.id.toString() === value);
                if (dest) setSelectedDestination(dest);
              }}>
                <SelectTrigger className="glass-card border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.id} value={dest.id.toString()}>
                      {dest.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-3 block text-foreground">Duration (days)</label>
              <Select value={tripDuration} onValueChange={setTripDuration}>
                <SelectTrigger className="glass-card border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">1 week</SelectItem>
                  <SelectItem value="14">2 weeks</SelectItem>
                  <SelectItem value="30">1 month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-3 block text-foreground">Budget Type</label>
              <Select value={budgetType} onValueChange={(value: any) => setBudgetType(value)}>
                <SelectTrigger className="glass-card border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="midRange">Mid-range</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/30 money-glow">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="text-primary/80 text-sm font-medium">Estimated Total Cost</span>
                </div>
                <p className="text-sm text-muted-foreground">{tripDuration} days in {selectedDestination.name}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">${totalTripCost.toLocaleString()}</p>
                <p className="text-sm text-primary/80">${selectedDestination.dailyBudget[budgetType]}/day</p>
                <div className="flex items-center gap-1 justify-end mt-1">
                  <Activity className="h-3 w-3 text-primary animate-pulse" />
                  <span className="text-xs text-primary">Live Rates</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Destination Preview */}
      <Card className="glass-card border-primary/20">
        <CardContent className="p-6">
          <div className="flex gap-6">
            <ImageWithFallback 
              src={selectedDestination.image} 
              alt={selectedDestination.name}
              className="w-32 h-32 rounded-2xl object-cover border border-primary/20"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">{selectedDestination.name}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-xs text-muted-foreground mb-1">Budget</div>
                  <div className="font-semibold text-foreground">${selectedDestination.dailyBudget.budget}/day</div>
                </div>
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-xs text-muted-foreground mb-1">Mid-range</div>
                  <div className="font-semibold text-foreground">${selectedDestination.dailyBudget.midRange}/day</div>
                </div>
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="text-xs text-muted-foreground mb-1">Luxury</div>
                  <div className="font-semibold text-foreground">${selectedDestination.dailyBudget.luxury}/day</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Cost Breakdown - {selectedDestination.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <Coffee className="h-4 w-4 text-yellow-600" />
                </div>
                <span className="font-semibold text-foreground">Coffee</span>
              </div>
              <p className="text-sm text-muted-foreground">
                ${selectedDestination.costs.coffee.min} - ${selectedDestination.costs.coffee.max}
              </p>
            </div>
            <div className="p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <Utensils className="h-4 w-4 text-orange-500" />
                </div>
                <span className="font-semibold text-foreground">Meals</span>
              </div>
              <p className="text-sm text-muted-foreground">
                ${selectedDestination.costs.meal.min} - ${selectedDestination.costs.meal.max}
              </p>
            </div>
            <div className="p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <Hotel className="h-4 w-4 text-purple-500" />
                </div>
                <span className="font-semibold text-foreground">Hotels</span>
              </div>
              <p className="text-sm text-muted-foreground">
                ${selectedDestination.costs.hotel.min} - ${selectedDestination.costs.hotel.max}
              </p>
            </div>
            <div className="p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                  <Car className="h-4 w-4 text-primary" />
                </div>
                <span className="font-semibold text-foreground">Transport</span>
              </div>
              <p className="text-sm text-muted-foreground">
                ${selectedDestination.costs.transport.min} - ${selectedDestination.costs.transport.max}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Places */}
      <Card className="glass-card border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Nearby Places & Costs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredPlaces.map((place, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-2xl glass-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl border ${
                  place.type === 'cafe' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600' :
                  place.type === 'restaurant' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                  place.type === 'hotel' ? 'bg-purple-500/10 border-purple-500/20 text-purple-500' :
                  'bg-primary/10 border-primary/20 text-primary'
                }`}>
                  {place.type === 'cafe' && <Coffee className="h-4 w-4" />}
                  {place.type === 'restaurant' && <Utensils className="h-4 w-4" />}
                  {place.type === 'hotel' && <Hotel className="h-4 w-4" />}
                  {place.type === 'shopping' && <DollarSign className="h-4 w-4" />}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{place.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                      {place.distance}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      ⭐ {place.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground text-lg">{place.priceRange}</p>
                <Button size="sm" variant="outline" className="mt-2 border-primary/20 text-primary hover:bg-primary/10">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Savings Tip */}
      <Card className="glass-card bg-gradient-to-br from-primary/5 to-green-500/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-primary">Smart Savings Intelligence</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Based on your trip to {selectedDestination.name}, you could save $240 by choosing budget accommodations 
            and eating at local places instead of tourist restaurants. Start saving now with a dedicated travel fund!
          </p>
          <div className="flex items-center gap-3">
            <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
              <Target className="h-3 w-3 mr-1" />
              Create Travel Savings Goal
            </Button>
            <div className="flex items-center gap-1">
              <Activity className="h-3 w-3 text-primary animate-pulse" />
              <span className="text-xs text-primary">AI Optimized</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}