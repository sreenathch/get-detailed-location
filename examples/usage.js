/**
 * get-detailed-location Examples
 * Run with: node examples/usage.js
 */

import geo from '../index.js';

console.log('🌍 get-detailed-location Examples\n');
console.log('='.repeat(50));

// ============================================================================
// 1. IP & LOCATION
// ============================================================================

console.log('\n📍 IP & Location\n');

try {
  // Get your public IP
  const { ip } = await geo.ipv4();
  console.log(`Your IPv4: ${ip}`);
  
  // Get location details
  const location = await geo.locationDetails();
  console.log(`Location: ${location.city}, ${location.region}, ${location.country_name}`);
  console.log(`Coordinates: ${location.latitude}, ${location.longitude}`);
  console.log(`Timezone: ${location.timezone}`);
} catch (error) {
  console.log('(Skipping IP fetch in offline mode)');
}

// ============================================================================
// 2. DISTANCE CALCULATIONS
// ============================================================================

console.log('\n📏 Distance Calculations\n');

const newYork = { lat: 40.7128, lng: -74.0060 };
const losAngeles = { lat: 34.0522, lng: -118.2437 };
const london = { lat: 51.5074, lng: -0.1278 };

const nycToLA = geo.haversineDistance(newYork, losAngeles);
const nycToLondon = geo.haversineDistance(newYork, london);

console.log(`NYC to LA: ${nycToLA.toFixed(2)} km (${geo.formatDistance(nycToLA, 'miles')})`);
console.log(`NYC to London: ${nycToLondon.toFixed(2)} km (${geo.formatDistance(nycToLondon, 'miles')})`);

// Using Vincenty for more accuracy
const vincentyDist = geo.vincentyDistance(newYork, losAngeles);
console.log(`NYC to LA (Vincenty): ${vincentyDist.toFixed(2)} km`);

// ============================================================================
// 3. COORDINATE CONVERSIONS
// ============================================================================

console.log('\n🔄 Coordinate Conversions\n');

const dms = geo.decimalToDMS(40.7128, -74.0060);
console.log(`NYC in DMS: ${dms.formatted}`);

const decimal = geo.dmsToDecimal(40, 42, 46.08, 'N');
console.log(`40°42'46.08"N = ${decimal}`);

// ============================================================================
// 4. BEARING & DIRECTION
// ============================================================================

console.log('\n🧭 Bearing & Direction\n');

const direction = geo.getDirection(newYork, losAngeles);
console.log(`NYC to LA: ${direction.bearing.toFixed(1)}° (${direction.compass})`);

const destPoint = geo.getDestinationPoint(newYork, 270, 100);
console.log(`100km West of NYC: ${destPoint.lat.toFixed(4)}, ${destPoint.lng.toFixed(4)}`);

// ============================================================================
// 5. GEOFENCING
// ============================================================================

console.log('\n🔲 Geofencing\n');

const manhattanPolygon = [
  { lat: 40.8, lng: -74.02 },
  { lat: 40.8, lng: -73.93 },
  { lat: 40.7, lng: -73.93 },
  { lat: 40.7, lng: -74.02 }
];

const timesSquare = { lat: 40.758, lng: -73.985 };
const brooklyn = { lat: 40.6782, lng: -73.9442 };

console.log(`Times Square in Manhattan: ${geo.isPointInPolygon(timesSquare, manhattanPolygon)}`);
console.log(`Brooklyn in Manhattan: ${geo.isPointInPolygon(brooklyn, manhattanPolygon)}`);

// Circular geofence
const result = geo.isPointInCircle(timesSquare, newYork, 10);
console.log(`Times Square within 10km of NYC center: ${result.inside} (${result.distance.toFixed(2)} km away)`);

// ============================================================================
// 6. GEOHASH
// ============================================================================

console.log('\n#️⃣ Geohash\n');

const hash = geo.encodeGeohash(40.7128, -74.0060, 8);
console.log(`NYC geohash: ${hash}`);

const decoded = geo.decodeGeohash(hash);
console.log(`Decoded: ${decoded.lat.toFixed(4)}, ${decoded.lng.toFixed(4)}`);

const neighbors = geo.getGeohashNeighbors(hash);
console.log(`Neighbors: N=${neighbors.n}, S=${neighbors.s}, E=${neighbors.e}, W=${neighbors.w}`);

// ============================================================================
// 7. BOUNDING BOX
// ============================================================================

console.log('\n📦 Bounding Box\n');

const bbox = geo.getBoundingBox(newYork, 50);
console.log(`50km radius around NYC:`);
console.log(`  North: ${bbox.north.toFixed(4)}`);
console.log(`  South: ${bbox.south.toFixed(4)}`);
console.log(`  East: ${bbox.east.toFixed(4)}`);
console.log(`  West: ${bbox.west.toFixed(4)}`);

// ============================================================================
// 8. CLUSTERING
// ============================================================================

console.log('\n📊 Clustering\n');

const locations = [
  { lat: 40.7128, lng: -74.0060, name: 'NYC' },
  { lat: 40.7580, lng: -73.9855, name: 'Times Square' },
  { lat: 40.7484, lng: -73.9857, name: 'Empire State' },
  { lat: 34.0522, lng: -118.2437, name: 'LA' },
  { lat: 34.1018, lng: -118.3427, name: 'Hollywood' }
];

const clusters = geo.clusterPoints(locations, 50);
console.log(`Found ${clusters.length} clusters:`);
clusters.forEach((cluster, i) => {
  console.log(`  Cluster ${i + 1}: ${cluster.count} points`);
  cluster.points.forEach(p => console.log(`    - ${p.name}`));
});

// ============================================================================
// 9. TRAVEL ESTIMATION
// ============================================================================

console.log('\n🚗 Travel Estimation\n');

const travel = geo.estimateTravelTime(newYork, losAngeles, 100);
console.log(`NYC to LA at 100 km/h:`);
console.log(`  Distance: ${travel.distance.km.toFixed(0)} km`);
console.log(`  Duration: ${travel.duration.formatted}`);

// ============================================================================
// 10. GOOGLE MAPS
// ============================================================================

console.log('\n🗺️ Google Maps\n');

const mapsUrl = geo.getGoogleMapsUrl(newYork);
console.log(`NYC on Maps: ${mapsUrl}`);

const directionsUrl = geo.getGoogleMapsDirectionsUrl(newYork, losAngeles);
console.log(`Directions: ${directionsUrl.substring(0, 60)}...`);

// ============================================================================
// 11. UNIT CONVERSIONS
// ============================================================================

console.log('\n🔄 Unit Conversions\n');

console.log(`100 km = ${geo.convertDistance(100, 'km', 'miles').toFixed(2)} miles`);
console.log(`1 nautical mile = ${geo.convertDistance(1, 'nautical', 'km').toFixed(3)} km`);
console.log(`60 mph = ${geo.convertSpeed(60, 'mph', 'kmh').toFixed(2)} km/h`);

// ============================================================================
// 12. RANDOM POINTS
// ============================================================================

console.log('\n🎲 Random Points\n');

console.log('Random points within 10km of NYC:');
const randomPoints = geo.generateRandomPoints(newYork, 10, 3);
randomPoints.forEach((p, i) => {
  const dist = geo.haversineDistance(newYork, p);
  console.log(`  ${i + 1}. ${p.lat.toFixed(4)}, ${p.lng.toFixed(4)} (${dist.toFixed(2)} km away)`);
});

// ============================================================================
// 13. PATH UTILITIES
// ============================================================================

console.log('\n📈 Path Utilities\n');

const path = [
  { lat: 40.7128, lng: -74.0060 },
  { lat: 40.7580, lng: -73.9855 },
  { lat: 40.7484, lng: -73.9857 }
];

const pathDistance = geo.calculatePathDistance(path);
console.log(`Total path distance: ${pathDistance.toFixed(2)} km`);

const simplified = geo.simplifyPath(path, 0.1);
console.log(`Simplified path: ${path.length} points → ${simplified.length} points`);

// ============================================================================
// 14. MIDPOINT
// ============================================================================

console.log('\n📍 Midpoint\n');

const midpoint = geo.getMidpoint(newYork, losAngeles);
console.log(`Midpoint NYC-LA: ${midpoint.lat.toFixed(4)}, ${midpoint.lng.toFixed(4)}`);

// Generate waypoints
const waypoints = geo.generatePathPoints(newYork, losAngeles, 4);
console.log(`Waypoints on path (5 points):`);
waypoints.forEach((p, i) => {
  console.log(`  ${i + 1}. ${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}`);
});

// ============================================================================
// 15. COUNTRY INFO
// ============================================================================

console.log('\n🌐 Country Info\n');

const usa = geo.getCountryInfo('US');
console.log(`US: ${usa.name}, ${usa.continent}, Phone: ${usa.phone}`);

const europeanCountries = geo.getCountriesByContinent('Europe');
console.log(`European countries: ${europeanCountries.length}`);

// ============================================================================
// COMPLETE
// ============================================================================

console.log('\n' + '='.repeat(50));
console.log('✅ All examples completed!\n');
