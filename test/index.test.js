/**
 * Tests for get-detailed-location
 * Run with: node --experimental-vm-modules node_modules/jest/bin/jest.js
 */

import {
  isValidIPv4,
  isValidIPv6,
  isPrivateIP,
  getIPType,
  decimalToDMS,
  dmsToDecimal,
  parseCoordinate,
  isValidCoordinate,
  normalizeLongitude,
  haversineDistance,
  vincentyDistance,
  manhattanDistance,
  calculateBearing,
  bearingToCompass,
  getDirection,
  getMidpoint,
  interpolatePoint,
  generatePathPoints,
  getBoundingBox,
  getBoundsFromPoints,
  isPointInBounds,
  expandBounds,
  isPointInPolygon,
  isPointInCircle,
  calculatePolygonArea,
  getDestinationPoint,
  generateCirclePoints,
  clusterPoints,
  getCentroid,
  randomCoordinate,
  randomPointInBounds,
  randomPointInRadius,
  sortByDistance,
  filterByRadius,
  findNearestPoint,
  findFarthestPoint,
  estimateTravelTime,
  getCountryInfo,
  getCountriesByContinent,
  isValidCountryCode,
  getTimezoneFromCoords,
  formatCoordinates,
  formatDistance,
  formatBearing,
  convertDistance,
  convertSpeed,
  getGoogleMapsUrl,
  getGoogleMapsDirectionsUrl,
  createLocationCode,
  decodeLocationCode,
  encodeGeohash,
  decodeGeohash,
  getGeohashNeighbors,
  calculatePathDistance,
  simplifyPath,
  doesPathIntersect,
  calculateElevationImpact
} from '../index.js';

// ============================================================================
// IP UTILITIES
// ============================================================================

describe('IP Utilities', () => {
  describe('isValidIPv4', () => {
    it('should validate correct IPv4 addresses', () => {
      expect(isValidIPv4('192.168.1.1')).toBe(true);
      expect(isValidIPv4('10.0.0.1')).toBe(true);
      expect(isValidIPv4('255.255.255.255')).toBe(true);
      expect(isValidIPv4('0.0.0.0')).toBe(true);
    });

    it('should reject invalid IPv4 addresses', () => {
      expect(isValidIPv4('256.1.1.1')).toBe(false);
      expect(isValidIPv4('1.1.1')).toBe(false);
      expect(isValidIPv4('1.1.1.1.1')).toBe(false);
      expect(isValidIPv4('abc.def.ghi.jkl')).toBe(false);
    });
  });

  describe('isPrivateIP', () => {
    it('should identify private IPs', () => {
      expect(isPrivateIP('192.168.1.1')).toBe(true);
      expect(isPrivateIP('10.0.0.1')).toBe(true);
      expect(isPrivateIP('172.16.0.1')).toBe(true);
      expect(isPrivateIP('127.0.0.1')).toBe(true);
    });

    it('should identify public IPs', () => {
      expect(isPrivateIP('8.8.8.8')).toBe(false);
      expect(isPrivateIP('1.1.1.1')).toBe(false);
    });
  });

  describe('getIPType', () => {
    it('should correctly identify IP types', () => {
      expect(getIPType('192.168.1.1')).toBe('IPv4');
      expect(getIPType('::1')).toBe('IPv6');
      expect(getIPType('invalid')).toBe('Invalid');
    });
  });
});

// ============================================================================
// COORDINATE UTILITIES
// ============================================================================

describe('Coordinate Utilities', () => {
  describe('decimalToDMS', () => {
    it('should convert decimal to DMS correctly', () => {
      const result = decimalToDMS(40.7128, -74.006);
      expect(result.latitude.degrees).toBe(40);
      expect(result.latitude.direction).toBe('N');
      expect(result.longitude.direction).toBe('W');
    });
  });

  describe('dmsToDecimal', () => {
    it('should convert DMS to decimal correctly', () => {
      expect(dmsToDecimal(40, 42, 46.08, 'N')).toBeCloseTo(40.7128, 4);
      expect(dmsToDecimal(74, 0, 21.6, 'W')).toBeCloseTo(-74.006, 4);
    });
  });

  describe('isValidCoordinate', () => {
    it('should validate correct coordinates', () => {
      expect(isValidCoordinate(0, 0)).toBe(true);
      expect(isValidCoordinate(90, 180)).toBe(true);
      expect(isValidCoordinate(-90, -180)).toBe(true);
    });

    it('should reject invalid coordinates', () => {
      expect(isValidCoordinate(91, 0)).toBe(false);
      expect(isValidCoordinate(0, 181)).toBe(false);
    });
  });

  describe('normalizeLongitude', () => {
    it('should normalize longitude to -180 to 180', () => {
      expect(normalizeLongitude(200)).toBe(-160);
      expect(normalizeLongitude(-200)).toBe(160);
      expect(normalizeLongitude(180)).toBe(180);
    });
  });
});

// ============================================================================
// DISTANCE CALCULATIONS
// ============================================================================

describe('Distance Calculations', () => {
  const nyc = { lat: 40.7128, lng: -74.006 };
  const la = { lat: 34.0522, lng: -118.2437 };

  describe('haversineDistance', () => {
    it('should calculate distance correctly', () => {
      const distance = haversineDistance(nyc, la);
      expect(distance).toBeCloseTo(3935.75, 0);
    });

    it('should support different units', () => {
      const km = haversineDistance(nyc, la, 'km');
      const miles = haversineDistance(nyc, la, 'miles');
      expect(miles).toBeCloseTo(km * 0.621371, 0);
    });

    it('should return 0 for same point', () => {
      expect(haversineDistance(nyc, nyc)).toBe(0);
    });
  });

  describe('vincentyDistance', () => {
    it('should calculate distance more accurately', () => {
      const distance = vincentyDistance(nyc, la);
      expect(distance).toBeCloseTo(3944, 0);
    });
  });
});

// ============================================================================
// BEARING & DIRECTION
// ============================================================================

describe('Bearing & Direction', () => {
  describe('calculateBearing', () => {
    it('should calculate bearing correctly', () => {
      const bearing = calculateBearing(
        { lat: 0, lng: 0 },
        { lat: 0, lng: 1 }
      );
      expect(bearing).toBeCloseTo(90, 0);
    });
  });

  describe('bearingToCompass', () => {
    it('should convert bearing to compass', () => {
      expect(bearingToCompass(0)).toBe('N');
      expect(bearingToCompass(90)).toBe('E');
      expect(bearingToCompass(180)).toBe('S');
      expect(bearingToCompass(270)).toBe('W');
      expect(bearingToCompass(45)).toBe('NE');
    });
  });
});

// ============================================================================
// BOUNDING BOX
// ============================================================================

describe('Bounding Box', () => {
  describe('getBoundingBox', () => {
    it('should create bounding box from center and radius', () => {
      const bbox = getBoundingBox({ lat: 40, lng: -74 }, 10);
      expect(bbox.north).toBeGreaterThan(40);
      expect(bbox.south).toBeLessThan(40);
      expect(bbox.east).toBeGreaterThan(-74);
      expect(bbox.west).toBeLessThan(-74);
    });
  });

  describe('isPointInBounds', () => {
    const bounds = { north: 41, south: 39, east: -73, west: -75 };

    it('should detect point inside bounds', () => {
      expect(isPointInBounds({ lat: 40, lng: -74 }, bounds)).toBe(true);
    });

    it('should detect point outside bounds', () => {
      expect(isPointInBounds({ lat: 42, lng: -74 }, bounds)).toBe(false);
    });
  });
});

// ============================================================================
// GEOFENCING
// ============================================================================

describe('Geofencing', () => {
  const triangle = [
    { lat: 0, lng: 0 },
    { lat: 0, lng: 2 },
    { lat: 2, lng: 1 }
  ];

  describe('isPointInPolygon', () => {
    it('should detect point inside polygon', () => {
      expect(isPointInPolygon({ lat: 0.5, lng: 1 }, triangle)).toBe(true);
    });

    it('should detect point outside polygon', () => {
      expect(isPointInPolygon({ lat: 3, lng: 1 }, triangle)).toBe(false);
    });
  });

  describe('isPointInCircle', () => {
    it('should detect point inside circle', () => {
      const result = isPointInCircle(
        { lat: 40.75, lng: -74 },
        { lat: 40.7128, lng: -74.006 },
        10
      );
      expect(result.inside).toBe(true);
    });
  });
});

// ============================================================================
// GEOHASH
// ============================================================================

describe('Geohash', () => {
  describe('encodeGeohash', () => {
    it('should encode coordinates to geohash', () => {
      const hash = encodeGeohash(40.7128, -74.006, 6);
      expect(hash).toBe('dr5reg');
    });
  });

  describe('decodeGeohash', () => {
    it('should decode geohash to coordinates', () => {
      const result = decodeGeohash('dr5reg');
      expect(result.lat).toBeCloseTo(40.7, 1);
      expect(result.lng).toBeCloseTo(-74.0, 1);
    });
  });

  describe('getGeohashNeighbors', () => {
    it('should return 8 neighbors', () => {
      const neighbors = getGeohashNeighbors('dr5reg');
      expect(Object.keys(neighbors)).toHaveLength(8);
      expect(neighbors).toHaveProperty('n');
      expect(neighbors).toHaveProperty('s');
      expect(neighbors).toHaveProperty('e');
      expect(neighbors).toHaveProperty('w');
    });
  });
});

// ============================================================================
// CLUSTERING & SORTING
// ============================================================================

describe('Clustering & Sorting', () => {
  const points = [
    { lat: 40.7, lng: -74.0, name: 'A' },
    { lat: 40.71, lng: -74.01, name: 'B' },
    { lat: 34.0, lng: -118.0, name: 'C' }
  ];

  describe('clusterPoints', () => {
    it('should cluster nearby points', () => {
      const clusters = clusterPoints(points, 10);
      expect(clusters.length).toBe(2);
    });
  });

  describe('sortByDistance', () => {
    it('should sort points by distance', () => {
      const sorted = sortByDistance({ lat: 40.7, lng: -74.0 }, points);
      expect(sorted[0].name).toBe('A');
    });
  });

  describe('findNearestPoint', () => {
    it('should find nearest point', () => {
      const nearest = findNearestPoint({ lat: 40.7, lng: -74.0 }, points);
      expect(nearest.name).toBe('A');
    });
  });
});

// ============================================================================
// CONVERSIONS
// ============================================================================

describe('Conversions', () => {
  describe('convertDistance', () => {
    it('should convert km to miles', () => {
      expect(convertDistance(1, 'km', 'miles')).toBeCloseTo(0.621371, 4);
    });

    it('should convert miles to km', () => {
      expect(convertDistance(1, 'miles', 'km')).toBeCloseTo(1.60934, 4);
    });
  });

  describe('convertSpeed', () => {
    it('should convert kmh to mph', () => {
      expect(convertSpeed(100, 'kmh', 'mph')).toBeCloseTo(62.137, 2);
    });
  });
});

// ============================================================================
// FORMATTING
// ============================================================================

describe('Formatting', () => {
  describe('formatCoordinates', () => {
    it('should format as decimal', () => {
      const result = formatCoordinates(40.7128, -74.006, 'decimal');
      expect(result).toBe('40.712800, -74.006000');
    });

    it('should format as DMS', () => {
      const result = formatCoordinates(40.7128, -74.006, 'dms');
      expect(result).toContain('N');
      expect(result).toContain('W');
    });
  });

  describe('formatDistance', () => {
    it('should auto-format distance', () => {
      expect(formatDistance(0.5, 'auto')).toBe('500 m');
      expect(formatDistance(50, 'auto')).toBe('50.0 km');
    });
  });
});

// ============================================================================
// PATH UTILITIES
// ============================================================================

describe('Path Utilities', () => {
  const path = [
    { lat: 40.7, lng: -74.0 },
    { lat: 40.8, lng: -73.9 },
    { lat: 40.9, lng: -73.8 }
  ];

  describe('calculatePathDistance', () => {
    it('should calculate total path distance', () => {
      const distance = calculatePathDistance(path);
      expect(distance).toBeGreaterThan(0);
    });
  });

  describe('simplifyPath', () => {
    it('should simplify path', () => {
      const simplified = simplifyPath(path, 0.5);
      expect(simplified.length).toBeLessThanOrEqual(path.length);
    });
  });
});

// ============================================================================
// GOOGLE MAPS
// ============================================================================

describe('Google Maps Integration', () => {
  describe('getGoogleMapsUrl', () => {
    it('should generate valid URL', () => {
      const url = getGoogleMapsUrl({ lat: 40.7128, lng: -74.006 });
      expect(url).toContain('google.com/maps');
      expect(url).toContain('40.7128');
    });
  });

  describe('getGoogleMapsDirectionsUrl', () => {
    it('should generate directions URL', () => {
      const url = getGoogleMapsDirectionsUrl(
        { lat: 40.7128, lng: -74.006 },
        { lat: 34.0522, lng: -118.2437 },
        'driving'
      );
      expect(url).toContain('travelmode=driving');
    });
  });
});

// ============================================================================
// COUNTRY UTILITIES
// ============================================================================

describe('Country Utilities', () => {
  describe('getCountryInfo', () => {
    it('should return country info', () => {
      const info = getCountryInfo('US');
      expect(info.name).toBe('United States');
      expect(info.continent).toBe('North America');
    });

    it('should return null for invalid code', () => {
      expect(getCountryInfo('XX')).toBeNull();
    });
  });

  describe('isValidCountryCode', () => {
    it('should validate country codes', () => {
      expect(isValidCountryCode('US')).toBe(true);
      expect(isValidCountryCode('XX')).toBe(false);
    });
  });
});
