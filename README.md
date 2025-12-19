<p align="center">
  <img src="https://raw.githubusercontent.com/sreenathch/get-detailed-location/main/assets/logo.svg" alt="get-detailed-location" width="200"/>
</p>

<h1 align="center">get-detailed-location</h1>

<p align="center">
  <strong>🌍 The Ultimate Location Utilities Library for JavaScript</strong>
</p>

<p align="center">
  A comprehensive, zero-dependency location toolkit with 60+ utilities for IP geolocation, distance calculations, geofencing, geohash encoding, coordinate conversions, and more.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/get-detailed-location">
    <img src="https://img.shields.io/npm/v/get-detailed-location.svg?style=flat-square&color=blue" alt="npm version"/>
  </a>
  <a href="https://www.npmjs.com/package/get-detailed-location">
    <img src="https://img.shields.io/npm/dm/get-detailed-location.svg?style=flat-square&color=green" alt="npm downloads"/>
  </a>
  <a href="https://github.com/sreenathch/get-detailed-location/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/get-detailed-location.svg?style=flat-square" alt="license"/>
  </a>
  <a href="https://bundlephobia.com/package/get-detailed-location">
    <img src="https://img.shields.io/bundlephobia/minzip/get-detailed-location?style=flat-square&color=orange" alt="bundle size"/>
  </a>
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Node.js->=14-green?style=flat-square&logo=node.js" alt="Node.js"/>
</p>

<p align="center">
  <a href="#-installation">Installation</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-examples">Examples</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

| Category | Features |
|----------|----------|
| 🌐 **IP & Location** | IPv4/IPv6 detection, IP geolocation, location profiles |
| 📍 **Coordinates** | DMS conversion, validation, parsing, normalization |
| 📏 **Distance** | Haversine, Vincenty, Manhattan calculations |
| 🧭 **Navigation** | Bearing, compass directions, destination points |
| 📦 **Bounding Box** | Create, validate, expand bounding boxes |
| 🔲 **Geofencing** | Point-in-polygon, circular geofence, area calculation |
| #️⃣ **Geohash** | Encode, decode, get neighbors |
| 🗺️ **Maps** | Google Maps URLs, static maps, directions |
| 🚗 **Travel** | Time estimation, speed calculation |
| 📊 **Clustering** | Group nearby points, find centroid |
| 🎲 **Random** | Generate random coordinates, points in radius |
| 🔄 **Conversion** | Distance units, speed units, coordinates |

---

## 📦 Installation

```bash
# npm
npm install get-detailed-location

# yarn
yarn add get-detailed-location

# pnpm
pnpm add get-detailed-location
```

---

## 🚀 Quick Start

### ESM (Recommended)

```javascript
import { 
  ipv4, 
  locationDetails, 
  haversineDistance,
  isPointInPolygon 
} from 'get-detailed-location';

// Get your IP
const { ip } = await ipv4();
console.log(ip); // "203.0.113.42"

// Get location from IP
const location = await locationDetails();
console.log(location.city, location.country); // "Dallas" "US"

// Calculate distance between two cities
const distance = haversineDistance(
  { lat: 40.7128, lng: -74.0060 },  // New York
  { lat: 34.0522, lng: -118.2437 }  // Los Angeles
);
console.log(distance); // 3935.75 km
```

### CommonJS

```javascript
const geo = require('get-detailed-location');

geo.ipv4().then(({ ip }) => {
  console.log(ip);
});
```

### Default Export

```javascript
import geo from 'get-detailed-location';

const distance = geo.haversineDistance(point1, point2);
```

---

## 📚 API Reference

### 🌐 IP Address Utilities

#### `ipv4()` / `ipv6()`
Get public IP address.

```javascript
const { ip } = await ipv4();
// { ip: "203.0.113.42" }

const { ip: ipv6Addr } = await ipv6();
// { ip: "2001:0db8:85a3:0000:0000:8a2e:0370:7334" }
```

#### `isValidIPv4(ip)` / `isValidIPv6(ip)`
Validate IP address format.

```javascript
isValidIPv4("192.168.1.1");     // true
isValidIPv4("256.1.1.1");       // false
isValidIPv6("::1");              // true
```

#### `isPrivateIP(ip)`
Check if IP is private/local.

```javascript
isPrivateIP("192.168.1.1");  // true
isPrivateIP("8.8.8.8");      // false
isPrivateIP("10.0.0.1");     // true
isPrivateIP("127.0.0.1");    // true (loopback)
```

#### `getIPType(ip)`
Determine IP type.

```javascript
getIPType("192.168.1.1");                          // "IPv4"
getIPType("2001:0db8:85a3::8a2e:0370:7334");       // "IPv6"
getIPType("invalid");                               // "Invalid"
```

---

### 📍 Location Details

#### `locationDetails(ip?)`
Get comprehensive location data from IP.

```javascript
const location = await locationDetails();
// Or with specific IP:
const location = await locationDetails("8.8.8.8");

/* Returns:
{
  ip: "8.8.8.8",
  city: "Mountain View",
  region: "California",
  country: "US",
  country_name: "United States",
  latitude: 37.3860,
  longitude: -122.0838,
  timezone: "America/Los_Angeles",
  org: "Google LLC",
  ...
}
*/
```

#### `getFullLocationProfile(ip?)`
Get enriched location data with additional metadata.

```javascript
const profile = await getFullLocationProfile();

/* Returns:
{
  ...locationDetails,
  enriched: {
    continent: "North America",
    phoneCode: "+1",
    hemispheres: {
      latitude: "Northern",
      longitude: "Western"
    },
    coordinates: {
      decimal: { lat: 37.386, lng: -122.084 },
      dms: { formatted: "37°23'9.60\"N 122°5'1.20\"W" }
    }
  }
}
*/
```

---

### 📐 Coordinate Utilities

#### `decimalToDMS(lat, lng)`
Convert decimal degrees to DMS format.

```javascript
const dms = decimalToDMS(40.7128, -74.0060);
/* Returns:
{
  latitude: { degrees: 40, minutes: 42, seconds: 46.08, direction: "N", formatted: "40°42'46.08\"N" },
  longitude: { degrees: 74, minutes: 0, seconds: 21.60, direction: "W", formatted: "74°0'21.60\"W" },
  formatted: "40°42'46.08\"N 74°0'21.60\"W"
}
*/
```

#### `dmsToDecimal(degrees, minutes, seconds, direction)`
Convert DMS to decimal degrees.

```javascript
dmsToDecimal(40, 42, 46.08, 'N');  // 40.712800
dmsToDecimal(74, 0, 21.60, 'W');   // -74.006000
```

#### `parseCoordinate(coordString)`
Parse coordinate string to decimal.

```javascript
parseCoordinate("40°42'46\"N");   // 40.7128
parseCoordinate("40.7128");       // 40.7128
parseCoordinate("-74.006");       // -74.006
```

#### `isValidCoordinate(lat, lng)`
Validate coordinate values.

```javascript
isValidCoordinate(40.7128, -74.006);   // true
isValidCoordinate(91, 0);               // false (lat > 90)
isValidCoordinate(0, 181);              // false (lng > 180)
```

---

### 📏 Distance Calculations

#### `haversineDistance(point1, point2, unit?)`
Calculate great-circle distance using Haversine formula.

```javascript
const nyc = { lat: 40.7128, lng: -74.0060 };
const la = { lat: 34.0522, lng: -118.2437 };

haversineDistance(nyc, la);           // 3935.7463 km
haversineDistance(nyc, la, 'miles');  // 2445.5592 miles
haversineDistance(nyc, la, 'meters'); // 3935746.3 meters
```

#### `vincentyDistance(point1, point2, unit?)`
More accurate distance using Vincenty formula (for long distances).

```javascript
vincentyDistance(nyc, la);  // 3944.4217 km (more accurate)
```

#### `manhattanDistance(point1, point2, unit?)`
Grid-based distance (sum of lat + lng distances).

```javascript
manhattanDistance(nyc, la);  // 5158.2839 km
```

---

### 🧭 Bearing & Direction

#### `calculateBearing(from, to)`
Calculate initial bearing between two points.

```javascript
calculateBearing(
  { lat: 40.7128, lng: -74.0060 },  // NYC
  { lat: 34.0522, lng: -118.2437 }  // LA
);  // 273.43 (degrees)
```

#### `bearingToCompass(bearing, precision?)`
Convert bearing to compass direction.

```javascript
bearingToCompass(45);       // "NE"
bearingToCompass(45, 16);   // "NE"
bearingToCompass(90);       // "E"
bearingToCompass(270);      // "W"
```

#### `getDirection(from, to)`
Get complete direction information.

```javascript
const direction = getDirection(nyc, la);
/* Returns:
{
  bearing: 273.43,
  compass: "W",
  compassDetailed: "W",
  cardinal: "W"
}
*/
```

---

### 🔲 Bounding Box

#### `getBoundingBox(center, radius)`
Create bounding box from center and radius.

```javascript
const bbox = getBoundingBox({ lat: 40.7128, lng: -74.006 }, 10);
/* Returns:
{
  north: 40.8026,
  south: 40.6230,
  east: -73.8884,
  west: -74.1236,
  center: { lat: 40.7128, lng: -74.006 },
  radius: 10
}
*/
```

#### `getBoundsFromPoints(points)`
Get bounding box from array of points.

```javascript
const bounds = getBoundsFromPoints([
  { lat: 40.7, lng: -74.0 },
  { lat: 40.8, lng: -73.9 },
  { lat: 40.6, lng: -74.1 }
]);
```

#### `isPointInBounds(point, bounds)`
Check if point is within bounding box.

```javascript
isPointInBounds({ lat: 40.75, lng: -73.95 }, bounds);  // true
```

---

### 🔲 Geofencing

#### `isPointInPolygon(point, polygon)`
Check if point is inside a polygon (Ray casting algorithm).

```javascript
const manhattan = [
  { lat: 40.8, lng: -74.02 },
  { lat: 40.8, lng: -73.93 },
  { lat: 40.7, lng: -73.97 },
  { lat: 40.7, lng: -74.02 }
];

isPointInPolygon({ lat: 40.75, lng: -73.98 }, manhattan);  // true
isPointInPolygon({ lat: 40.6, lng: -74.0 }, manhattan);     // false
```

#### `isPointInCircle(point, center, radius)`
Check if point is within circular geofence.

```javascript
const result = isPointInCircle(
  { lat: 40.758, lng: -73.985 },  // Times Square
  { lat: 40.7484, lng: -73.9857 }, // Empire State
  1  // 1km radius
);
/* Returns:
{
  inside: true,
  distance: 0.89,
  distanceFromEdge: 0.11
}
*/
```

#### `calculatePolygonArea(polygon)`
Calculate area of a polygon in square kilometers.

```javascript
calculatePolygonArea(manhattan);  // 23.4521 sq km
```

---

### #️⃣ Geohash

#### `encodeGeohash(lat, lng, precision?)`
Encode coordinates to geohash.

```javascript
encodeGeohash(40.7128, -74.0060);      // "dr5regw3p"
encodeGeohash(40.7128, -74.0060, 6);   // "dr5reg"
```

#### `decodeGeohash(hash)`
Decode geohash to coordinates.

```javascript
const result = decodeGeohash("dr5regw3p");
/* Returns:
{
  lat: 40.712799,
  lng: -74.005997,
  bounds: { north: 40.7128, south: 40.7127, east: -74.0059, west: -74.006 }
}
*/
```

#### `getGeohashNeighbors(hash)`
Get all 8 neighboring geohashes.

```javascript
const neighbors = getGeohashNeighbors("dr5reg");
/* Returns:
{
  n: "dr5rew", ne: "dr5rey", e: "dr5rem",
  se: "dr5rek", s: "dr5red", sw: "dr5re6",
  w: "dr5re4", nw: "dr5re5"
}
*/
```

---

### 🚗 Travel & Speed

#### `estimateTravelTime(from, to, speed?)`
Estimate travel time between points.

```javascript
const travel = estimateTravelTime(nyc, la, 100); // 100 km/h
/* Returns:
{
  distance: { km: 3935.75, miles: 2445.56 },
  duration: { hours: 39.36, minutes: 2361, formatted: "39h 21m" },
  speed: { kmh: 100, mph: 62.14 }
}
*/
```

#### `calculateSpeed(point1, point2)`
Calculate speed between timestamped points.

```javascript
const speed = calculateSpeed(
  { lat: 40.7, lng: -74.0, timestamp: 1700000000000 },
  { lat: 40.8, lng: -73.9, timestamp: 1700003600000 }
);
/* Returns:
{
  speed: { kmh: 14.86, mph: 9.23, mps: 4.13 },
  distance: { km: 14.86, miles: 9.23 },
  time: { seconds: 3600, minutes: 60, hours: 1 }
}
*/
```

---

### 📊 Clustering & Sorting

#### `clusterPoints(points, radius)`
Group nearby points into clusters.

```javascript
const locations = [
  { lat: 40.7128, lng: -74.006, name: "NYC" },
  { lat: 40.7138, lng: -74.005, name: "Near NYC" },
  { lat: 34.0522, lng: -118.243, name: "LA" }
];

const clusters = clusterPoints(locations, 10);
// Returns 2 clusters: NYC area and LA
```

#### `sortByDistance(reference, points, order?)`
Sort points by distance from reference.

```javascript
const sorted = sortByDistance({ lat: 40, lng: -74 }, locations);
// Returns locations sorted by distance (ascending)

const farthestFirst = sortByDistance({ lat: 40, lng: -74 }, locations, 'desc');
```

#### `findNearestPoint(reference, points)`
Find the nearest point.

```javascript
const nearest = findNearestPoint({ lat: 40, lng: -74 }, locations);
// Returns nearest location with distance
```

---

### 🗺️ Google Maps Integration

#### `getGoogleMapsUrl(point, zoom?)`
Generate Google Maps URL.

```javascript
getGoogleMapsUrl({ lat: 40.7128, lng: -74.006 });
// "https://www.google.com/maps/@40.7128,-74.006,15z"
```

#### `getGoogleMapsDirectionsUrl(from, to, mode?)`
Generate directions URL.

```javascript
getGoogleMapsDirectionsUrl(nyc, la, 'driving');
// "https://www.google.com/maps/dir/?api=1&origin=40.7128,-74.006&destination=34.0522,-118.2437&travelmode=driving"
```

---

### 🔄 Conversions

#### `convertDistance(value, from, to)`
Convert between distance units.

```javascript
convertDistance(10, 'km', 'miles');      // 6.213712
convertDistance(1, 'nautical', 'km');    // 1.852
convertDistance(5280, 'feet', 'miles');  // 1.0
```

#### `convertSpeed(value, from, to)`
Convert between speed units.

```javascript
convertSpeed(100, 'kmh', 'mph');    // 62.1371
convertSpeed(50, 'knots', 'kmh');   // 92.6
```

---

### 🎲 Random Generation

```javascript
// Random coordinate anywhere
const coord = randomCoordinate();
// { lat: -23.456789, lng: 145.123456 }

// Random point within 50km of NYC
const nearby = randomPointInRadius({ lat: 40.7128, lng: -74.006 }, 50);

// Generate 10 random points
const points = generateRandomPoints({ lat: 40.7128, lng: -74.006 }, 50, 10);
```

---

## 💡 Real-World Examples

### 🏪 Store Locator

```javascript
import { 
  locationDetails, 
  sortByDistance, 
  filterByRadius,
  formatDistance 
} from 'get-detailed-location';

async function findNearbyStores(stores, maxDistance = 25) {
  // Get user's location from IP
  const userLocation = await locationDetails();
  const userPoint = { 
    lat: userLocation.latitude, 
    lng: userLocation.longitude 
  };
  
  // Filter stores within radius
  const nearbyStores = filterByRadius(userPoint, stores, maxDistance);
  
  // Sort by distance
  const sorted = sortByDistance(userPoint, nearbyStores);
  
  // Format for display
  return sorted.map(store => ({
    ...store,
    distanceText: formatDistance(store.distance)
  }));
}
```

### 🚚 Delivery Zone Check

```javascript
import { isPointInPolygon, isPointInCircle } from 'get-detailed-location';

const deliveryZone = [
  { lat: 40.8, lng: -74.05 },
  { lat: 40.85, lng: -73.9 },
  { lat: 40.7, lng: -73.85 },
  { lat: 40.65, lng: -74.0 }
];

const warehouse = { lat: 40.75, lng: -73.95 };
const maxDeliveryRadius = 15; // km

function canDeliver(customerLocation) {
  // Check if in polygon zone
  const inZone = isPointInPolygon(customerLocation, deliveryZone);
  
  // Check if within warehouse radius
  const { inside, distance } = isPointInCircle(
    customerLocation, 
    warehouse, 
    maxDeliveryRadius
  );
  
  return {
    canDeliver: inZone || inside,
    estimatedDeliveryFee: distance * 2 // $2 per km
  };
}
```

### 📱 GPS Tracking

```javascript
import { calculateSpeed, calculatePathDistance, simplifyPath } from 'get-detailed-location';

class GPSTracker {
  constructor() {
    this.track = [];
  }
  
  addPoint(lat, lng) {
    const point = { lat, lng, timestamp: Date.now() };
    
    if (this.track.length > 0) {
      const lastPoint = this.track[this.track.length - 1];
      const { speed } = calculateSpeed(lastPoint, point);
      point.speed = speed.kmh;
    }
    
    this.track.push(point);
    return point;
  }
  
  getTotalDistance() {
    return calculatePathDistance(this.track);
  }
  
  getSimplifiedTrack(tolerance = 0.01) {
    return simplifyPath(this.track, tolerance);
  }
}
```

### 🌍 Timezone-Aware Scheduling

```javascript
import { getTimezoneFromCoords, locationDetails } from 'get-detailed-location';

async function scheduleGlobalMeeting(participants) {
  const timezones = await Promise.all(
    participants.map(async (p) => {
      const location = await locationDetails(p.ip);
      return {
        name: p.name,
        timezone: getTimezoneFromCoords(location.longitude),
        localTime: new Date().toLocaleString('en-US', { 
          timeZone: location.timezone 
        })
      };
    })
  );
  
  return timezones;
}
```

---

## 🔧 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import { 
  Point, 
  BoundingBox, 
  haversineDistance,
  isPointInPolygon 
} from 'get-detailed-location';

const point: Point = { lat: 40.7128, lng: -74.006 };
const polygon: Point[] = [
  { lat: 40.8, lng: -74.02 },
  { lat: 40.8, lng: -73.93 },
  { lat: 40.7, lng: -74.02 }
];

const distance: number = haversineDistance(point, polygon[0]);
const inside: boolean = isPointInPolygon(point, polygon);
```

---

## 🌐 Browser Support

Works in modern browsers with native `fetch` support:

```html
<script type="module">
  import { haversineDistance } from 'https://unpkg.com/get-detailed-location/index.js';
  
  const distance = haversineDistance(
    { lat: 40.7128, lng: -74.006 },
    { lat: 34.0522, lng: -118.2437 }
  );
  console.log(distance);
</script>
```

---

## 📊 Performance

| Operation | Time (1M iterations) |
|-----------|---------------------|
| haversineDistance | ~450ms |
| isPointInPolygon (10 vertices) | ~120ms |
| encodeGeohash | ~380ms |
| decimalToDMS | ~95ms |

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

```bash
# Clone the repo
git clone https://github.com/sreenathch/get-detailed-location.git

# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint
```

---

## 📄 License

MIT © [Shreenath Chakinala](https://github.com/sreenathch)

---

## 🙏 Acknowledgments

- [ipify](https://www.ipify.org/) - IP address API
- [ipapi](https://ipapi.co/) - IP geolocation API

---

<p align="center">
  Made by <a href="https://github.com/sreenathch">Shreenath Chakinala</a>
</p>

<p align="center">
  <a href="https://github.com/sreenathch/get-detailed-location/stargazers">⭐ Star this project</a> •
  <a href="https://github.com/sreenathch/get-detailed-location/issues">🐛 Report Bug</a> •
  <a href="https://github.com/sreenathch/get-detailed-location/issues">✨ Request Feature</a>
</p>
