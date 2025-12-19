/**
 * get-detailed-location
 * A comprehensive location utilities library
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Point {
  lat: number;
  lng: number;
}

export interface TimestampedPoint extends Point {
  timestamp: number;
}

export interface PointWithData extends Point {
  [key: string]: any;
}

export interface IPResponse {
  ip: string;
}

export interface DMSComponent {
  degrees: number;
  minutes: number;
  seconds: number;
  direction: 'N' | 'S' | 'E' | 'W';
  formatted: string;
}

export interface DMSCoordinate {
  latitude: DMSComponent;
  longitude: DMSComponent;
  formatted: string;
}

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
  center?: Point;
  radius?: number;
}

export interface GeofenceResult {
  inside: boolean;
  distance: number;
  distanceFromEdge: number;
}

export interface DirectionResult {
  bearing: number;
  compass: string;
  compassDetailed: string;
  cardinal: string;
}

export interface TravelTimeResult {
  distance: {
    km: number;
    miles: number;
  };
  duration: {
    hours: number;
    minutes: number;
    formatted: string;
  };
  speed: {
    kmh: number;
    mph: number;
  };
}

export interface SpeedResult {
  speed: {
    kmh: number;
    mph: number;
    mps: number;
  };
  distance: {
    km: number;
    miles: number;
  };
  time: {
    seconds: number;
    minutes: number;
    hours: number;
  };
}

export interface ClusterResult {
  center: Point;
  points: PointWithData[];
  bounds: BoundingBox;
  count: number;
}

export interface CountryInfo {
  code: string;
  name: string;
  continent: string;
  phone: string;
}

export interface TimezoneResult {
  offset: number;
  utcOffset: string;
  approximateTimezone: string;
}

export interface GeohashResult {
  lat: number;
  lng: number;
  bounds: BoundingBox;
}

export interface GeohashNeighbors {
  n: string;
  ne: string;
  e: string;
  se: string;
  s: string;
  sw: string;
  w: string;
  nw: string;
}

export interface ElevationImpact {
  horizontalDistance: number;
  verticalDistance: number;
  actualDistance: number;
  equivalentFlatDistance: number;
  gradient: number;
}

export interface LocationDetails {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_code: string;
  country_code_iso3: string;
  country_name: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  languages: string;
  asn: string;
  org: string;
}

export interface EnrichedLocationProfile extends LocationDetails {
  enriched: {
    continent: string | null;
    phoneCode: string | null;
    hemispheres: {
      latitude: 'Northern' | 'Southern';
      longitude: 'Eastern' | 'Western';
    };
    coordinates: {
      decimal: Point;
      dms: DMSCoordinate;
    };
  };
}

export type DistanceUnit = 'km' | 'miles' | 'meters' | 'feet' | 'nautical';
export type SpeedUnit = 'kmh' | 'mph' | 'mps' | 'knots';
export type CoordinateFormat = 'decimal' | 'dms' | 'short';
export type TravelMode = 'driving' | 'walking' | 'bicycling' | 'transit';
export type SortOrder = 'asc' | 'desc';
export type IPType = 'IPv4' | 'IPv6' | 'Invalid';

// ============================================================================
// IP ADDRESS UTILITIES
// ============================================================================

export function ipv4(): Promise<IPResponse>;
export function ipv6(): Promise<IPResponse>;
export function isValidIPv4(ip: string): boolean;
export function isValidIPv6(ip: string): boolean;
export function isPrivateIP(ip: string): boolean;
export function getIPType(ip: string): IPType;

// ============================================================================
// LOCATION DETAILS
// ============================================================================

export function locationDetails(ip?: string): Promise<LocationDetails>;
export function getFullLocationProfile(ip?: string): Promise<EnrichedLocationProfile>;

// ============================================================================
// COORDINATE UTILITIES
// ============================================================================

export function decimalToDMS(lat: number, lng: number): DMSCoordinate;
export function dmsToDecimal(degrees: number, minutes: number, seconds: number, direction: 'N' | 'S' | 'E' | 'W'): number;
export function parseCoordinate(coordString: string): number;
export function isValidCoordinate(lat: number, lng: number): boolean;
export function normalizeLongitude(lng: number): number;

// ============================================================================
// DISTANCE CALCULATIONS
// ============================================================================

export function haversineDistance(point1: Point, point2: Point, unit?: DistanceUnit): number;
export function vincentyDistance(point1: Point, point2: Point, unit?: DistanceUnit): number;
export function manhattanDistance(point1: Point, point2: Point, unit?: DistanceUnit): number;

// ============================================================================
// BEARING & DIRECTION
// ============================================================================

export function calculateBearing(from: Point, to: Point): number;
export function bearingToCompass(bearing: number, precision?: 4 | 8 | 16): string;
export function getDirection(from: Point, to: Point): DirectionResult;

// ============================================================================
// MIDPOINT & INTERPOLATION
// ============================================================================

export function getMidpoint(point1: Point, point2: Point): Point;
export function interpolatePoint(start: Point, end: Point, fraction: number): Point;
export function generatePathPoints(start: Point, end: Point, numPoints: number): Point[];

// ============================================================================
// BOUNDING BOX
// ============================================================================

export function getBoundingBox(center: Point, radius: number): BoundingBox;
export function getBoundsFromPoints(points: Point[]): BoundingBox;
export function isPointInBounds(point: Point, bounds: BoundingBox): boolean;
export function expandBounds(bounds: BoundingBox, percentage: number): BoundingBox;

// ============================================================================
// GEOFENCING
// ============================================================================

export function isPointInPolygon(point: Point, polygon: Point[]): boolean;
export function isPointInCircle(point: Point, center: Point, radius: number): GeofenceResult;
export function calculatePolygonArea(polygon: Point[]): number;

// ============================================================================
// DESTINATION POINT
// ============================================================================

export function getDestinationPoint(start: Point, bearing: number, distance: number): Point;
export function generateCirclePoints(center: Point, radius: number, numPoints?: number): Point[];

// ============================================================================
// CLUSTERING
// ============================================================================

export function clusterPoints(points: PointWithData[], radius: number): ClusterResult[];
export function getCentroid(points: Point[]): Point;

// ============================================================================
// RANDOM LOCATION
// ============================================================================

export function randomCoordinate(): Point;
export function randomPointInBounds(bounds: BoundingBox): Point;
export function randomPointInRadius(center: Point, radius: number): Point;
export function generateRandomPoints(center: Point, radius: number, count: number): Point[];

// ============================================================================
// SORTING & FILTERING
// ============================================================================

export function sortByDistance<T extends Point>(reference: Point, points: T[], order?: SortOrder): (T & { distance: number })[];
export function filterByRadius<T extends Point>(center: Point, points: T[], radius: number): T[];
export function findNearestPoint<T extends Point>(reference: Point, points: T[]): T & { distance: number };
export function findFarthestPoint<T extends Point>(reference: Point, points: T[]): T & { distance: number };

// ============================================================================
// TRAVEL & SPEED
// ============================================================================

export function estimateTravelTime(from: Point, to: Point, speed?: number): TravelTimeResult;
export function calculateSpeed(point1: TimestampedPoint, point2: TimestampedPoint): SpeedResult;

// ============================================================================
// COUNTRY & REGION
// ============================================================================

export function getCountryInfo(code: string): CountryInfo | null;
export function getCountriesByContinent(continent: string): CountryInfo[];
export function isValidCountryCode(code: string): boolean;

// ============================================================================
// TIMEZONE
// ============================================================================

export function getTimezoneFromCoords(lng: number): TimezoneResult;
export function getCurrentTimezone(): Promise<object>;

// ============================================================================
// FORMATTING
// ============================================================================

export function formatCoordinates(lat: number, lng: number, format?: CoordinateFormat): string;
export function formatDistance(km: number, unit?: 'km' | 'miles' | 'meters' | 'auto'): string;
export function formatBearing(bearing: number): string;

// ============================================================================
// CONVERSION
// ============================================================================

export function convertDistance(value: number, from: DistanceUnit, to: DistanceUnit): number;
export function convertSpeed(value: number, from: SpeedUnit, to: SpeedUnit): number;

// ============================================================================
// GOOGLE MAPS
// ============================================================================

export function getGoogleMapsUrl(point: Point, zoom?: number): string;
export function getGoogleMapsDirectionsUrl(from: Point, to: Point, mode?: TravelMode): string;
export function getStaticMapUrl(center: Point, options?: {
  zoom?: number;
  size?: string;
  maptype?: 'roadmap' | 'satellite' | 'terrain' | 'hybrid';
  markers?: boolean;
}): string;

// ============================================================================
// LOCATION CODES
// ============================================================================

export function createLocationCode(point: Point, precision?: number): string;
export function decodeLocationCode(code: string, precision?: number): Point;

// ============================================================================
// GEOHASH
// ============================================================================

export function encodeGeohash(lat: number, lng: number, precision?: number): string;
export function decodeGeohash(hash: string): GeohashResult;
export function getGeohashNeighbors(hash: string): GeohashNeighbors;

// ============================================================================
// PATH UTILITIES
// ============================================================================

export function calculatePathDistance(points: Point[], unit?: DistanceUnit): number;
export function simplifyPath(points: Point[], tolerance: number): Point[];
export function doesPathIntersect(points: Point[]): boolean;

// ============================================================================
// ELEVATION
// ============================================================================

export function calculateElevationImpact(horizontalDistance: number, elevationGain: number): ElevationImpact;

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

declare const _default: {
  ipv4: typeof ipv4;
  ipv6: typeof ipv6;
  isValidIPv4: typeof isValidIPv4;
  isValidIPv6: typeof isValidIPv6;
  isPrivateIP: typeof isPrivateIP;
  getIPType: typeof getIPType;
  locationDetails: typeof locationDetails;
  getFullLocationProfile: typeof getFullLocationProfile;
  decimalToDMS: typeof decimalToDMS;
  dmsToDecimal: typeof dmsToDecimal;
  parseCoordinate: typeof parseCoordinate;
  isValidCoordinate: typeof isValidCoordinate;
  normalizeLongitude: typeof normalizeLongitude;
  haversineDistance: typeof haversineDistance;
  vincentyDistance: typeof vincentyDistance;
  manhattanDistance: typeof manhattanDistance;
  calculateBearing: typeof calculateBearing;
  bearingToCompass: typeof bearingToCompass;
  getDirection: typeof getDirection;
  getMidpoint: typeof getMidpoint;
  interpolatePoint: typeof interpolatePoint;
  generatePathPoints: typeof generatePathPoints;
  getBoundingBox: typeof getBoundingBox;
  getBoundsFromPoints: typeof getBoundsFromPoints;
  isPointInBounds: typeof isPointInBounds;
  expandBounds: typeof expandBounds;
  isPointInPolygon: typeof isPointInPolygon;
  isPointInCircle: typeof isPointInCircle;
  calculatePolygonArea: typeof calculatePolygonArea;
  getDestinationPoint: typeof getDestinationPoint;
  generateCirclePoints: typeof generateCirclePoints;
  clusterPoints: typeof clusterPoints;
  getCentroid: typeof getCentroid;
  randomCoordinate: typeof randomCoordinate;
  randomPointInBounds: typeof randomPointInBounds;
  randomPointInRadius: typeof randomPointInRadius;
  generateRandomPoints: typeof generateRandomPoints;
  sortByDistance: typeof sortByDistance;
  filterByRadius: typeof filterByRadius;
  findNearestPoint: typeof findNearestPoint;
  findFarthestPoint: typeof findFarthestPoint;
  estimateTravelTime: typeof estimateTravelTime;
  calculateSpeed: typeof calculateSpeed;
  getCountryInfo: typeof getCountryInfo;
  getCountriesByContinent: typeof getCountriesByContinent;
  isValidCountryCode: typeof isValidCountryCode;
  getTimezoneFromCoords: typeof getTimezoneFromCoords;
  getCurrentTimezone: typeof getCurrentTimezone;
  formatCoordinates: typeof formatCoordinates;
  formatDistance: typeof formatDistance;
  formatBearing: typeof formatBearing;
  convertDistance: typeof convertDistance;
  convertSpeed: typeof convertSpeed;
  getGoogleMapsUrl: typeof getGoogleMapsUrl;
  getGoogleMapsDirectionsUrl: typeof getGoogleMapsDirectionsUrl;
  getStaticMapUrl: typeof getStaticMapUrl;
  createLocationCode: typeof createLocationCode;
  decodeLocationCode: typeof decodeLocationCode;
  encodeGeohash: typeof encodeGeohash;
  decodeGeohash: typeof decodeGeohash;
  getGeohashNeighbors: typeof getGeohashNeighbors;
  calculatePathDistance: typeof calculatePathDistance;
  simplifyPath: typeof simplifyPath;
  doesPathIntersect: typeof doesPathIntersect;
  calculateElevationImpact: typeof calculateElevationImpact;
};

export default _default;
