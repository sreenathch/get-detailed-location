/**
 * get-detailed-location
 * A comprehensive location utilities library for Node.js
 * 
 * @author Shreenath Chakinala
 * @license MIT
 * @version 2.0.0
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const EARTH_RADIUS = {
  km: 6371,
  miles: 3959,
  meters: 6371000,
  feet: 20902231
};

const ENDPOINTS = {
  ipv4: "https://api.ipify.org?format=json",
  ipv6: "https://api6.ipify.org?format=json",
  location: "https://ipapi.co/{ip}/json/",
  timezone: "https://worldtimeapi.org/api/ip"
};

// Country data for validation and lookup
const COUNTRY_CODES = {
  "US": { name: "United States", continent: "North America", phone: "+1" },
  "GB": { name: "United Kingdom", continent: "Europe", phone: "+44" },
  "CA": { name: "Canada", continent: "North America", phone: "+1" },
  "AU": { name: "Australia", continent: "Oceania", phone: "+61" },
  "DE": { name: "Germany", continent: "Europe", phone: "+49" },
  "FR": { name: "France", continent: "Europe", phone: "+33" },
  "JP": { name: "Japan", continent: "Asia", phone: "+81" },
  "CN": { name: "China", continent: "Asia", phone: "+86" },
  "IN": { name: "India", continent: "Asia", phone: "+91" },
  "BR": { name: "Brazil", continent: "South America", phone: "+55" },
  "MX": { name: "Mexico", continent: "North America", phone: "+52" },
  "ES": { name: "Spain", continent: "Europe", phone: "+34" },
  "IT": { name: "Italy", continent: "Europe", phone: "+39" },
  "NL": { name: "Netherlands", continent: "Europe", phone: "+31" },
  "SE": { name: "Sweden", continent: "Europe", phone: "+46" },
  "NO": { name: "Norway", continent: "Europe", phone: "+47" },
  "DK": { name: "Denmark", continent: "Europe", phone: "+45" },
  "FI": { name: "Finland", continent: "Europe", phone: "+358" },
  "PL": { name: "Poland", continent: "Europe", phone: "+48" },
  "RU": { name: "Russia", continent: "Europe", phone: "+7" },
  "KR": { name: "South Korea", continent: "Asia", phone: "+82" },
  "SG": { name: "Singapore", continent: "Asia", phone: "+65" },
  "NZ": { name: "New Zealand", continent: "Oceania", phone: "+64" },
  "ZA": { name: "South Africa", continent: "Africa", phone: "+27" },
  "AE": { name: "United Arab Emirates", continent: "Asia", phone: "+971" },
  "SA": { name: "Saudi Arabia", continent: "Asia", phone: "+966" },
  "IL": { name: "Israel", continent: "Asia", phone: "+972" },
  "TH": { name: "Thailand", continent: "Asia", phone: "+66" },
  "MY": { name: "Malaysia", continent: "Asia", phone: "+60" },
  "ID": { name: "Indonesia", continent: "Asia", phone: "+62" },
  "PH": { name: "Philippines", continent: "Asia", phone: "+63" },
  "VN": { name: "Vietnam", continent: "Asia", phone: "+84" },
  "AR": { name: "Argentina", continent: "South America", phone: "+54" },
  "CL": { name: "Chile", continent: "South America", phone: "+56" },
  "CO": { name: "Colombia", continent: "South America", phone: "+57" },
  "PE": { name: "Peru", continent: "South America", phone: "+51" },
  "EG": { name: "Egypt", continent: "Africa", phone: "+20" },
  "NG": { name: "Nigeria", continent: "Africa", phone: "+234" },
  "KE": { name: "Kenya", continent: "Africa", phone: "+254" },
  "GH": { name: "Ghana", continent: "Africa", phone: "+233" },
  "IE": { name: "Ireland", continent: "Europe", phone: "+353" },
  "PT": { name: "Portugal", continent: "Europe", phone: "+351" },
  "GR": { name: "Greece", continent: "Europe", phone: "+30" },
  "TR": { name: "Turkey", continent: "Asia", phone: "+90" },
  "AT": { name: "Austria", continent: "Europe", phone: "+43" },
  "CH": { name: "Switzerland", continent: "Europe", phone: "+41" },
  "BE": { name: "Belgium", continent: "Europe", phone: "+32" },
  "CZ": { name: "Czech Republic", continent: "Europe", phone: "+420" },
  "HU": { name: "Hungary", continent: "Europe", phone: "+36" },
  "RO": { name: "Romania", continent: "Europe", phone: "+40" },
  "UA": { name: "Ukraine", continent: "Europe", phone: "+380" }
};

// ============================================================================
// IP ADDRESS UTILITIES
// ============================================================================

/**
 * Get the public IPv4 address
 * @returns {Promise<{ip: string}>}
 */
export const ipv4 = async () => {
  try {
    const response = await fetch(ENDPOINTS.ipv4);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch IPv4: ${error.message}`);
  }
};

/**
 * Get the public IPv6 address
 * @returns {Promise<{ip: string}>}
 */
export const ipv6 = async () => {
  try {
    const response = await fetch(ENDPOINTS.ipv6);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch IPv6: ${error.message}`);
  }
};

/**
 * Validate an IPv4 address
 * @param {string} ip - The IP address to validate
 * @returns {boolean}
 */
export const isValidIPv4 = (ip) => {
  const pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return pattern.test(ip);
};

/**
 * Validate an IPv6 address
 * @param {string} ip - The IP address to validate
 * @returns {boolean}
 */
export const isValidIPv6 = (ip) => {
  const pattern = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$|^(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}$|^(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}$|^(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}$|^:(?::[0-9a-fA-F]{1,4}){1,7}$|^::(?:[fF]{4}:)?(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return pattern.test(ip);
};

/**
 * Check if an IP is private/local
 * @param {string} ip - The IP address to check
 * @returns {boolean}
 */
export const isPrivateIP = (ip) => {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4) return false;
  
  // 10.0.0.0 - 10.255.255.255
  if (parts[0] === 10) return true;
  // 172.16.0.0 - 172.31.255.255
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  // 192.168.0.0 - 192.168.255.255
  if (parts[0] === 192 && parts[1] === 168) return true;
  // 127.0.0.0 - 127.255.255.255 (loopback)
  if (parts[0] === 127) return true;
  
  return false;
};

/**
 * Get IP type (IPv4 or IPv6)
 * @param {string} ip - The IP address
 * @returns {'IPv4' | 'IPv6' | 'Invalid'}
 */
export const getIPType = (ip) => {
  if (isValidIPv4(ip)) return 'IPv4';
  if (isValidIPv6(ip)) return 'IPv6';
  return 'Invalid';
};

// ============================================================================
// LOCATION DETAILS
// ============================================================================

/**
 * Get detailed location information from IP
 * @param {string} [ip] - Optional IP address (uses current IP if not provided)
 * @returns {Promise<Object>}
 */
export const locationDetails = async (ip = null) => {
  try {
    let targetIP = ip;
    if (!targetIP) {
      const ipData = await ipv4();
      targetIP = ipData.ip;
    }
    const response = await fetch(ENDPOINTS.location.replace("{ip}", targetIP));
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch location details: ${error.message}`);
  }
};

/**
 * Get comprehensive location data including enriched information
 * @param {string} [ip] - Optional IP address
 * @returns {Promise<Object>}
 */
export const getFullLocationProfile = async (ip = null) => {
  const location = await locationDetails(ip);
  const countryInfo = COUNTRY_CODES[location.country_code] || {};
  
  return {
    ...location,
    enriched: {
      continent: countryInfo.continent || null,
      phoneCode: countryInfo.phone || null,
      hemispheres: {
        latitude: location.latitude >= 0 ? 'Northern' : 'Southern',
        longitude: location.longitude >= 0 ? 'Eastern' : 'Western'
      },
      coordinates: {
        decimal: { lat: location.latitude, lng: location.longitude },
        dms: decimalToDMS(location.latitude, location.longitude)
      }
    }
  };
};

// ============================================================================
// COORDINATE UTILITIES
// ============================================================================

/**
 * Convert decimal degrees to DMS (Degrees, Minutes, Seconds)
 * @param {number} lat - Latitude in decimal degrees
 * @param {number} lng - Longitude in decimal degrees
 * @returns {Object}
 */
export const decimalToDMS = (lat, lng) => {
  const convertToDMS = (decimal, isLat) => {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
    
    let direction;
    if (isLat) {
      direction = decimal >= 0 ? 'N' : 'S';
    } else {
      direction = decimal >= 0 ? 'E' : 'W';
    }
    
    return {
      degrees,
      minutes,
      seconds: parseFloat(seconds),
      direction,
      formatted: `${degrees}°${minutes}'${seconds}"${direction}`
    };
  };
  
  return {
    latitude: convertToDMS(lat, true),
    longitude: convertToDMS(lng, false),
    formatted: `${convertToDMS(lat, true).formatted} ${convertToDMS(lng, false).formatted}`
  };
};

/**
 * Convert DMS to decimal degrees
 * @param {number} degrees 
 * @param {number} minutes 
 * @param {number} seconds 
 * @param {string} direction - 'N', 'S', 'E', or 'W'
 * @returns {number}
 */
export const dmsToDecimal = (degrees, minutes, seconds, direction) => {
  let decimal = degrees + minutes / 60 + seconds / 3600;
  if (direction === 'S' || direction === 'W') {
    decimal = -decimal;
  }
  return parseFloat(decimal.toFixed(6));
};

/**
 * Parse coordinate string to decimal
 * @param {string} coordString - e.g., "40°26'46\"N" or "40.446195"
 * @returns {number}
 */
export const parseCoordinate = (coordString) => {
  // Check if already decimal
  if (/^-?\d+\.?\d*$/.test(coordString.trim())) {
    return parseFloat(coordString);
  }
  
  // Parse DMS format
  const match = coordString.match(/(\d+)[°]\s*(\d+)?[']?\s*(\d+\.?\d*)?[""]?\s*([NSEW])?/i);
  if (match) {
    const degrees = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseFloat(match[3]) || 0;
    const direction = (match[4] || '').toUpperCase();
    return dmsToDecimal(degrees, minutes, seconds, direction);
  }
  
  throw new Error('Invalid coordinate format');
};

/**
 * Validate coordinates
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {boolean}
 */
export const isValidCoordinate = (lat, lng) => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

/**
 * Normalize longitude to -180 to 180 range
 * @param {number} lng - Longitude
 * @returns {number}
 */
export const normalizeLongitude = (lng) => {
  while (lng > 180) lng -= 360;
  while (lng < -180) lng += 360;
  return lng;
};

// ============================================================================
// DISTANCE CALCULATIONS
// ============================================================================

/**
 * Calculate distance between two points using Haversine formula
 * @param {Object} point1 - {lat, lng}
 * @param {Object} point2 - {lat, lng}
 * @param {string} [unit='km'] - 'km', 'miles', 'meters', 'feet'
 * @returns {number}
 */
export const haversineDistance = (point1, point2, unit = 'km') => {
  const toRad = (deg) => deg * (Math.PI / 180);
  
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);
  
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(point1.lat)) * 
            Math.cos(toRad(point2.lat)) * 
            Math.sin(dLng / 2) ** 2;
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return parseFloat((EARTH_RADIUS[unit] * c).toFixed(4));
};

/**
 * Calculate distance using Vincenty formula (more accurate for long distances)
 * @param {Object} point1 - {lat, lng}
 * @param {Object} point2 - {lat, lng}
 * @param {string} [unit='km'] - 'km', 'miles', 'meters', 'feet'
 * @returns {number}
 */
export const vincentyDistance = (point1, point2, unit = 'km') => {
  const a = 6378137; // semi-major axis (meters)
  const f = 1 / 298.257223563; // flattening
  const b = (1 - f) * a; // semi-minor axis
  
  const toRad = (deg) => deg * (Math.PI / 180);
  
  const L = toRad(point2.lng - point1.lng);
  const U1 = Math.atan((1 - f) * Math.tan(toRad(point1.lat)));
  const U2 = Math.atan((1 - f) * Math.tan(toRad(point2.lat)));
  
  const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
  const sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
  
  let lambda = L, lambdaP, iterLimit = 100;
  let sinSigma, cosSigma, sigma, sinAlpha, cosSqAlpha, cos2SigmaM;
  
  do {
    const sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
    sinSigma = Math.sqrt(
      (cosU2 * sinLambda) ** 2 +
      (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) ** 2
    );
    
    if (sinSigma === 0) return 0; // coincident points
    
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
    cosSqAlpha = 1 - sinAlpha ** 2;
    cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
    
    if (isNaN(cos2SigmaM)) cos2SigmaM = 0;
    
    const C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    lambdaP = lambda;
    lambda = L + (1 - C) * f * sinAlpha * (
      sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM ** 2))
    );
  } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
  
  if (iterLimit === 0) return haversineDistance(point1, point2, unit); // fallback
  
  const uSq = cosSqAlpha * (a ** 2 - b ** 2) / (b ** 2);
  const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  
  const deltaSigma = B * sinSigma * (
    cos2SigmaM + B / 4 * (
      cosSigma * (-1 + 2 * cos2SigmaM ** 2) -
      B / 6 * cos2SigmaM * (-3 + 4 * sinSigma ** 2) * (-3 + 4 * cos2SigmaM ** 2)
    )
  );
  
  let distance = b * A * (sigma - deltaSigma); // in meters
  
  // Convert to desired unit
  const conversions = {
    km: distance / 1000,
    miles: distance / 1609.344,
    meters: distance,
    feet: distance * 3.28084
  };
  
  return parseFloat(conversions[unit].toFixed(4));
};

/**
 * Calculate Manhattan distance (grid-based)
 * @param {Object} point1 - {lat, lng}
 * @param {Object} point2 - {lat, lng}
 * @param {string} [unit='km']
 * @returns {number}
 */
export const manhattanDistance = (point1, point2, unit = 'km') => {
  const latDist = haversineDistance(
    { lat: point1.lat, lng: point1.lng },
    { lat: point2.lat, lng: point1.lng },
    unit
  );
  const lngDist = haversineDistance(
    { lat: point2.lat, lng: point1.lng },
    { lat: point2.lat, lng: point2.lng },
    unit
  );
  return parseFloat((latDist + lngDist).toFixed(4));
};

// ============================================================================
// BEARING & DIRECTION
// ============================================================================

/**
 * Calculate initial bearing between two points
 * @param {Object} from - {lat, lng}
 * @param {Object} to - {lat, lng}
 * @returns {number} Bearing in degrees (0-360)
 */
export const calculateBearing = (from, to) => {
  const toRad = (deg) => deg * (Math.PI / 180);
  const toDeg = (rad) => rad * (180 / Math.PI);
  
  const dLng = toRad(to.lng - from.lng);
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  let bearing = toDeg(Math.atan2(y, x));
  return (bearing + 360) % 360;
};

/**
 * Get compass direction from bearing
 * @param {number} bearing - Bearing in degrees
 * @param {number} [precision=8] - 4, 8, or 16 point compass
 * @returns {string}
 */
export const bearingToCompass = (bearing, precision = 8) => {
  const directions = {
    4: ['N', 'E', 'S', 'W'],
    8: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
    16: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
         'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  };
  
  const dir = directions[precision] || directions[8];
  const index = Math.round(bearing / (360 / dir.length)) % dir.length;
  return dir[index];
};

/**
 * Get direction details between two points
 * @param {Object} from - {lat, lng}
 * @param {Object} to - {lat, lng}
 * @returns {Object}
 */
export const getDirection = (from, to) => {
  const bearing = calculateBearing(from, to);
  return {
    bearing: parseFloat(bearing.toFixed(2)),
    compass: bearingToCompass(bearing, 8),
    compassDetailed: bearingToCompass(bearing, 16),
    cardinal: bearingToCompass(bearing, 4)
  };
};

// ============================================================================
// MIDPOINT & INTERPOLATION
// ============================================================================

/**
 * Calculate midpoint between two coordinates
 * @param {Object} point1 - {lat, lng}
 * @param {Object} point2 - {lat, lng}
 * @returns {Object}
 */
export const getMidpoint = (point1, point2) => {
  const toRad = (deg) => deg * (Math.PI / 180);
  const toDeg = (rad) => rad * (180 / Math.PI);
  
  const lat1 = toRad(point1.lat);
  const lng1 = toRad(point1.lng);
  const lat2 = toRad(point2.lat);
  const dLng = toRad(point2.lng - point1.lng);
  
  const Bx = Math.cos(lat2) * Math.cos(dLng);
  const By = Math.cos(lat2) * Math.sin(dLng);
  
  const lat = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + Bx) ** 2 + By ** 2)
  );
  const lng = lng1 + Math.atan2(By, Math.cos(lat1) + Bx);
  
  return {
    lat: parseFloat(toDeg(lat).toFixed(6)),
    lng: parseFloat(toDeg(normalizeLongitude(toDeg(lng))).toFixed(6))
  };
};

/**
 * Get point along a path at a given fraction
 * @param {Object} start - {lat, lng}
 * @param {Object} end - {lat, lng}
 * @param {number} fraction - 0 to 1
 * @returns {Object}
 */
export const interpolatePoint = (start, end, fraction) => {
  const toRad = (deg) => deg * (Math.PI / 180);
  const toDeg = (rad) => rad * (180 / Math.PI);
  
  const lat1 = toRad(start.lat);
  const lng1 = toRad(start.lng);
  const lat2 = toRad(end.lat);
  const lng2 = toRad(end.lng);
  
  const d = 2 * Math.asin(Math.sqrt(
    Math.sin((lat2 - lat1) / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng2 - lng1) / 2) ** 2
  ));
  
  if (d === 0) return { lat: start.lat, lng: start.lng };
  
  const A = Math.sin((1 - fraction) * d) / Math.sin(d);
  const B = Math.sin(fraction * d) / Math.sin(d);
  
  const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
  const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
  const z = A * Math.sin(lat1) + B * Math.sin(lat2);
  
  const lat = Math.atan2(z, Math.sqrt(x ** 2 + y ** 2));
  const lng = Math.atan2(y, x);
  
  return {
    lat: parseFloat(toDeg(lat).toFixed(6)),
    lng: parseFloat(toDeg(lng).toFixed(6))
  };
};

/**
 * Generate points along a path
 * @param {Object} start - {lat, lng}
 * @param {Object} end - {lat, lng}
 * @param {number} numPoints - Number of points to generate
 * @returns {Array}
 */
export const generatePathPoints = (start, end, numPoints) => {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    points.push(interpolatePoint(start, end, i / numPoints));
  }
  return points;
};

// ============================================================================
// BOUNDING BOX
// ============================================================================

/**
 * Calculate bounding box from center point and radius
 * @param {Object} center - {lat, lng}
 * @param {number} radius - Radius in km
 * @returns {Object}
 */
export const getBoundingBox = (center, radius) => {
  const latChange = radius / 111.32; // 1 degree = ~111.32 km
  const lngChange = radius / (111.32 * Math.cos(center.lat * Math.PI / 180));
  
  return {
    north: parseFloat((center.lat + latChange).toFixed(6)),
    south: parseFloat((center.lat - latChange).toFixed(6)),
    east: parseFloat(normalizeLongitude(center.lng + lngChange).toFixed(6)),
    west: parseFloat(normalizeLongitude(center.lng - lngChange).toFixed(6)),
    center: center,
    radius: radius
  };
};

/**
 * Get bounding box from array of points
 * @param {Array} points - Array of {lat, lng} objects
 * @returns {Object}
 */
export const getBoundsFromPoints = (points) => {
  if (!points.length) throw new Error('No points provided');
  
  let minLat = Infinity, maxLat = -Infinity;
  let minLng = Infinity, maxLng = -Infinity;
  
  points.forEach(point => {
    minLat = Math.min(minLat, point.lat);
    maxLat = Math.max(maxLat, point.lat);
    minLng = Math.min(minLng, point.lng);
    maxLng = Math.max(maxLng, point.lng);
  });
  
  return {
    north: maxLat,
    south: minLat,
    east: maxLng,
    west: minLng,
    center: {
      lat: (maxLat + minLat) / 2,
      lng: (maxLng + minLng) / 2
    }
  };
};

/**
 * Check if a point is within a bounding box
 * @param {Object} point - {lat, lng}
 * @param {Object} bounds - {north, south, east, west}
 * @returns {boolean}
 */
export const isPointInBounds = (point, bounds) => {
  return point.lat >= bounds.south &&
         point.lat <= bounds.north &&
         point.lng >= bounds.west &&
         point.lng <= bounds.east;
};

/**
 * Expand bounding box by a percentage
 * @param {Object} bounds - {north, south, east, west}
 * @param {number} percentage - Percentage to expand (e.g., 10 for 10%)
 * @returns {Object}
 */
export const expandBounds = (bounds, percentage) => {
  const latPadding = (bounds.north - bounds.south) * (percentage / 100);
  const lngPadding = (bounds.east - bounds.west) * (percentage / 100);
  
  return {
    north: bounds.north + latPadding,
    south: bounds.south - latPadding,
    east: bounds.east + lngPadding,
    west: bounds.west - lngPadding
  };
};

// ============================================================================
// GEOFENCING
// ============================================================================

/**
 * Check if a point is inside a polygon (Ray casting algorithm)
 * @param {Object} point - {lat, lng}
 * @param {Array} polygon - Array of {lat, lng} vertices
 * @returns {boolean}
 */
export const isPointInPolygon = (point, polygon) => {
  let inside = false;
  const n = polygon.length;
  
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i].lng, yi = polygon[i].lat;
    const xj = polygon[j].lng, yj = polygon[j].lat;
    
    if (((yi > point.lat) !== (yj > point.lat)) &&
        (point.lng < (xj - xi) * (point.lat - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  
  return inside;
};

/**
 * Check if a point is within a circular geofence
 * @param {Object} point - {lat, lng}
 * @param {Object} center - {lat, lng}
 * @param {number} radius - Radius in km
 * @returns {Object}
 */
export const isPointInCircle = (point, center, radius) => {
  const distance = haversineDistance(point, center, 'km');
  return {
    inside: distance <= radius,
    distance: distance,
    distanceFromEdge: radius - distance
  };
};

/**
 * Calculate area of a polygon in sq km
 * @param {Array} polygon - Array of {lat, lng} vertices
 * @returns {number}
 */
export const calculatePolygonArea = (polygon) => {
  const toRad = (deg) => deg * (Math.PI / 180);
  
  if (polygon.length < 3) return 0;
  
  let total = 0;
  const n = polygon.length;
  
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const xi = toRad(polygon[i].lng);
    const yi = toRad(polygon[i].lat);
    const xj = toRad(polygon[j].lng);
    const yj = toRad(polygon[j].lat);
    
    total += xi * Math.sin(yj) - xj * Math.sin(yi);
  }
  
  const area = Math.abs(total * EARTH_RADIUS.km ** 2 / 2);
  return parseFloat(area.toFixed(4));
};

// ============================================================================
// DESTINATION POINT
// ============================================================================

/**
 * Calculate destination point given start, bearing, and distance
 * @param {Object} start - {lat, lng}
 * @param {number} bearing - Bearing in degrees
 * @param {number} distance - Distance in km
 * @returns {Object}
 */
export const getDestinationPoint = (start, bearing, distance) => {
  const toRad = (deg) => deg * (Math.PI / 180);
  const toDeg = (rad) => rad * (180 / Math.PI);
  
  const lat1 = toRad(start.lat);
  const lng1 = toRad(start.lng);
  const brng = toRad(bearing);
  const d = distance / EARTH_RADIUS.km;
  
  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(d) +
    Math.cos(lat1) * Math.sin(d) * Math.cos(brng)
  );
  
  const lng2 = lng1 + Math.atan2(
    Math.sin(brng) * Math.sin(d) * Math.cos(lat1),
    Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
  );
  
  return {
    lat: parseFloat(toDeg(lat2).toFixed(6)),
    lng: parseFloat(normalizeLongitude(toDeg(lng2)).toFixed(6))
  };
};

/**
 * Generate points in a circle around a center
 * @param {Object} center - {lat, lng}
 * @param {number} radius - Radius in km
 * @param {number} [numPoints=36] - Number of points
 * @returns {Array}
 */
export const generateCirclePoints = (center, radius, numPoints = 36) => {
  const points = [];
  const step = 360 / numPoints;
  
  for (let i = 0; i < numPoints; i++) {
    points.push(getDestinationPoint(center, i * step, radius));
  }
  
  return points;
};

// ============================================================================
// CLUSTERING
// ============================================================================

/**
 * Group nearby points into clusters
 * @param {Array} points - Array of {lat, lng, ...data}
 * @param {number} radius - Cluster radius in km
 * @returns {Array}
 */
export const clusterPoints = (points, radius) => {
  const clusters = [];
  const visited = new Set();
  
  points.forEach((point, i) => {
    if (visited.has(i)) return;
    
    const cluster = {
      center: { lat: point.lat, lng: point.lng },
      points: [point],
      bounds: null
    };
    
    visited.add(i);
    
    points.forEach((other, j) => {
      if (visited.has(j)) return;
      
      const dist = haversineDistance(point, other, 'km');
      if (dist <= radius) {
        cluster.points.push(other);
        visited.add(j);
      }
    });
    
    // Recalculate center as centroid
    const sumLat = cluster.points.reduce((sum, p) => sum + p.lat, 0);
    const sumLng = cluster.points.reduce((sum, p) => sum + p.lng, 0);
    cluster.center = {
      lat: parseFloat((sumLat / cluster.points.length).toFixed(6)),
      lng: parseFloat((sumLng / cluster.points.length).toFixed(6))
    };
    cluster.bounds = getBoundsFromPoints(cluster.points);
    cluster.count = cluster.points.length;
    
    clusters.push(cluster);
  });
  
  return clusters;
};

/**
 * Find the centroid of multiple points
 * @param {Array} points - Array of {lat, lng}
 * @returns {Object}
 */
export const getCentroid = (points) => {
  if (!points.length) throw new Error('No points provided');
  
  const sum = points.reduce((acc, p) => ({
    lat: acc.lat + p.lat,
    lng: acc.lng + p.lng
  }), { lat: 0, lng: 0 });
  
  return {
    lat: parseFloat((sum.lat / points.length).toFixed(6)),
    lng: parseFloat((sum.lng / points.length).toFixed(6))
  };
};

// ============================================================================
// RANDOM LOCATION
// ============================================================================

/**
 * Generate random coordinates
 * @returns {Object}
 */
export const randomCoordinate = () => ({
  lat: parseFloat((Math.random() * 180 - 90).toFixed(6)),
  lng: parseFloat((Math.random() * 360 - 180).toFixed(6))
});

/**
 * Generate random point within bounds
 * @param {Object} bounds - {north, south, east, west}
 * @returns {Object}
 */
export const randomPointInBounds = (bounds) => ({
  lat: parseFloat((bounds.south + Math.random() * (bounds.north - bounds.south)).toFixed(6)),
  lng: parseFloat((bounds.west + Math.random() * (bounds.east - bounds.west)).toFixed(6))
});

/**
 * Generate random point within radius of center
 * @param {Object} center - {lat, lng}
 * @param {number} radius - Max radius in km
 * @returns {Object}
 */
export const randomPointInRadius = (center, radius) => {
  const randomBearing = Math.random() * 360;
  const randomDistance = Math.random() * radius;
  return getDestinationPoint(center, randomBearing, randomDistance);
};

/**
 * Generate multiple random points in an area
 * @param {Object} center - {lat, lng}
 * @param {number} radius - Max radius in km
 * @param {number} count - Number of points
 * @returns {Array}
 */
export const generateRandomPoints = (center, radius, count) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push(randomPointInRadius(center, radius));
  }
  return points;
};

// ============================================================================
// SORTING & FILTERING
// ============================================================================

/**
 * Sort points by distance from a reference point
 * @param {Object} reference - {lat, lng}
 * @param {Array} points - Array of {lat, lng, ...data}
 * @param {string} [order='asc'] - 'asc' or 'desc'
 * @returns {Array}
 */
export const sortByDistance = (reference, points, order = 'asc') => {
  return points
    .map(point => ({
      ...point,
      distance: haversineDistance(reference, point, 'km')
    }))
    .sort((a, b) => order === 'asc' ? a.distance - b.distance : b.distance - a.distance);
};

/**
 * Filter points within a radius
 * @param {Object} center - {lat, lng}
 * @param {Array} points - Array of {lat, lng, ...data}
 * @param {number} radius - Radius in km
 * @returns {Array}
 */
export const filterByRadius = (center, points, radius) => {
  return points.filter(point => 
    haversineDistance(center, point, 'km') <= radius
  );
};

/**
 * Find nearest point to a reference
 * @param {Object} reference - {lat, lng}
 * @param {Array} points - Array of {lat, lng}
 * @returns {Object}
 */
export const findNearestPoint = (reference, points) => {
  if (!points.length) throw new Error('No points provided');
  
  let nearest = null;
  let minDistance = Infinity;
  
  points.forEach(point => {
    const dist = haversineDistance(reference, point, 'km');
    if (dist < minDistance) {
      minDistance = dist;
      nearest = { ...point, distance: dist };
    }
  });
  
  return nearest;
};

/**
 * Find farthest point from a reference
 * @param {Object} reference - {lat, lng}
 * @param {Array} points - Array of {lat, lng}
 * @returns {Object}
 */
export const findFarthestPoint = (reference, points) => {
  if (!points.length) throw new Error('No points provided');
  
  let farthest = null;
  let maxDistance = -Infinity;
  
  points.forEach(point => {
    const dist = haversineDistance(reference, point, 'km');
    if (dist > maxDistance) {
      maxDistance = dist;
      farthest = { ...point, distance: dist };
    }
  });
  
  return farthest;
};

// ============================================================================
// TRAVEL & SPEED
// ============================================================================

/**
 * Estimate travel time between two points
 * @param {Object} from - {lat, lng}
 * @param {Object} to - {lat, lng}
 * @param {number} [speed=50] - Average speed in km/h
 * @returns {Object}
 */
export const estimateTravelTime = (from, to, speed = 50) => {
  const distance = haversineDistance(from, to, 'km');
  const hours = distance / speed;
  const minutes = hours * 60;
  
  return {
    distance: {
      km: distance,
      miles: parseFloat((distance * 0.621371).toFixed(2))
    },
    duration: {
      hours: parseFloat(hours.toFixed(2)),
      minutes: parseFloat(minutes.toFixed(0)),
      formatted: `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`
    },
    speed: {
      kmh: speed,
      mph: parseFloat((speed * 0.621371).toFixed(2))
    }
  };
};

/**
 * Calculate speed between two timestamped points
 * @param {Object} point1 - {lat, lng, timestamp}
 * @param {Object} point2 - {lat, lng, timestamp}
 * @returns {Object}
 */
export const calculateSpeed = (point1, point2) => {
  const distance = haversineDistance(point1, point2, 'km');
  const timeDiff = Math.abs(point2.timestamp - point1.timestamp) / 1000 / 3600; // hours
  
  if (timeDiff === 0) throw new Error('Time difference cannot be zero');
  
  const speedKmh = distance / timeDiff;
  
  return {
    speed: {
      kmh: parseFloat(speedKmh.toFixed(2)),
      mph: parseFloat((speedKmh * 0.621371).toFixed(2)),
      mps: parseFloat((speedKmh / 3.6).toFixed(2))
    },
    distance: {
      km: distance,
      miles: parseFloat((distance * 0.621371).toFixed(4))
    },
    time: {
      seconds: parseFloat((timeDiff * 3600).toFixed(0)),
      minutes: parseFloat((timeDiff * 60).toFixed(2)),
      hours: parseFloat(timeDiff.toFixed(4))
    }
  };
};

// ============================================================================
// COUNTRY & REGION UTILITIES
// ============================================================================

/**
 * Get country info by code
 * @param {string} code - ISO 3166-1 alpha-2 code
 * @returns {Object|null}
 */
export const getCountryInfo = (code) => {
  const country = COUNTRY_CODES[code.toUpperCase()];
  if (!country) return null;
  
  return {
    code: code.toUpperCase(),
    ...country
  };
};

/**
 * Get all countries in a continent
 * @param {string} continent 
 * @returns {Array}
 */
export const getCountriesByContinent = (continent) => {
  return Object.entries(COUNTRY_CODES)
    .filter(([, info]) => info.continent === continent)
    .map(([code, info]) => ({ code, ...info }));
};

/**
 * Validate country code
 * @param {string} code 
 * @returns {boolean}
 */
export const isValidCountryCode = (code) => {
  return code && COUNTRY_CODES.hasOwnProperty(code.toUpperCase());
};

// ============================================================================
// TIMEZONE UTILITIES
// ============================================================================

/**
 * Get timezone from coordinates (approximate)
 * @param {number} lng - Longitude
 * @returns {Object}
 */
export const getTimezoneFromCoords = (lng) => {
  const offset = Math.round(lng / 15);
  const sign = offset >= 0 ? '+' : '';
  
  return {
    offset: offset,
    utcOffset: `UTC${sign}${offset}`,
    approximateTimezone: `Etc/GMT${offset >= 0 ? '-' : '+'}${Math.abs(offset)}`
  };
};

/**
 * Get current timezone info from IP
 * @returns {Promise<Object>}
 */
export const getCurrentTimezone = async () => {
  try {
    const response = await fetch(ENDPOINTS.timezone);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch timezone: ${error.message}`);
  }
};

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Format coordinates for display
 * @param {number} lat 
 * @param {number} lng 
 * @param {string} [format='decimal'] - 'decimal', 'dms', 'short'
 * @returns {string}
 */
export const formatCoordinates = (lat, lng, format = 'decimal') => {
  switch (format) {
    case 'dms':
      return decimalToDMS(lat, lng).formatted;
    case 'short':
      return `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    case 'decimal':
    default:
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
};

/**
 * Format distance for display
 * @param {number} km - Distance in kilometers
 * @param {string} [unit='auto'] - 'km', 'miles', 'meters', 'auto'
 * @returns {string}
 */
export const formatDistance = (km, unit = 'auto') => {
  if (unit === 'auto') {
    if (km < 1) {
      return `${(km * 1000).toFixed(0)} m`;
    } else if (km > 100) {
      return `${km.toFixed(0)} km`;
    } else {
      return `${km.toFixed(1)} km`;
    }
  }
  
  switch (unit) {
    case 'miles':
      return `${(km * 0.621371).toFixed(2)} mi`;
    case 'meters':
      return `${(km * 1000).toFixed(0)} m`;
    case 'km':
    default:
      return `${km.toFixed(2)} km`;
  }
};

/**
 * Format bearing for display
 * @param {number} bearing - Bearing in degrees
 * @returns {string}
 */
export const formatBearing = (bearing) => {
  const compass = bearingToCompass(bearing, 8);
  return `${bearing.toFixed(1)}° (${compass})`;
};

// ============================================================================
// CONVERSION UTILITIES
// ============================================================================

/**
 * Convert between distance units
 * @param {number} value 
 * @param {string} from - 'km', 'miles', 'meters', 'feet', 'nautical'
 * @param {string} to 
 * @returns {number}
 */
export const convertDistance = (value, from, to) => {
  const toMeters = {
    km: value * 1000,
    miles: value * 1609.344,
    meters: value,
    feet: value * 0.3048,
    nautical: value * 1852
  };
  
  const meters = toMeters[from];
  if (meters === undefined) throw new Error(`Unknown unit: ${from}`);
  
  const fromMeters = {
    km: meters / 1000,
    miles: meters / 1609.344,
    meters: meters,
    feet: meters / 0.3048,
    nautical: meters / 1852
  };
  
  const result = fromMeters[to];
  if (result === undefined) throw new Error(`Unknown unit: ${to}`);
  
  return parseFloat(result.toFixed(6));
};

/**
 * Convert speed units
 * @param {number} value 
 * @param {string} from - 'kmh', 'mph', 'mps', 'knots'
 * @param {string} to 
 * @returns {number}
 */
export const convertSpeed = (value, from, to) => {
  const toMps = {
    kmh: value / 3.6,
    mph: value * 0.44704,
    mps: value,
    knots: value * 0.514444
  };
  
  const mps = toMps[from];
  if (mps === undefined) throw new Error(`Unknown unit: ${from}`);
  
  const fromMps = {
    kmh: mps * 3.6,
    mph: mps / 0.44704,
    mps: mps,
    knots: mps / 0.514444
  };
  
  const result = fromMps[to];
  if (result === undefined) throw new Error(`Unknown unit: ${to}`);
  
  return parseFloat(result.toFixed(4));
};

// ============================================================================
// GOOGLE MAPS UTILITIES
// ============================================================================

/**
 * Generate Google Maps URL for a location
 * @param {Object} point - {lat, lng}
 * @param {number} [zoom=15]
 * @returns {string}
 */
export const getGoogleMapsUrl = (point, zoom = 15) => {
  return `https://www.google.com/maps/@${point.lat},${point.lng},${zoom}z`;
};

/**
 * Generate Google Maps directions URL
 * @param {Object} from - {lat, lng}
 * @param {Object} to - {lat, lng}
 * @param {string} [mode='driving'] - 'driving', 'walking', 'bicycling', 'transit'
 * @returns {string}
 */
export const getGoogleMapsDirectionsUrl = (from, to, mode = 'driving') => {
  return `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${to.lat},${to.lng}&travelmode=${mode}`;
};

/**
 * Generate static map image URL
 * @param {Object} center - {lat, lng}
 * @param {Object} options
 * @returns {string}
 */
export const getStaticMapUrl = (center, options = {}) => {
  const {
    zoom = 14,
    size = '600x400',
    maptype = 'roadmap',
    markers = true
  } = options;
  
  let url = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=${size}&maptype=${maptype}`;
  
  if (markers) {
    url += `&markers=${center.lat},${center.lng}`;
  }
  
  return url;
};

// ============================================================================
// LOCATION CODE UTILITIES
// ============================================================================

/**
 * Create a simple hash-based location code
 * @param {Object} point - {lat, lng}
 * @param {number} [precision=6]
 * @returns {string}
 */
export const createLocationCode = (point, precision = 6) => {
  const lat = Math.round((point.lat + 90) * Math.pow(10, precision));
  const lng = Math.round((point.lng + 180) * Math.pow(10, precision));
  
  const combined = lat.toString(36) + '-' + lng.toString(36);
  return combined.toUpperCase();
};

/**
 * Decode a location code back to coordinates
 * @param {string} code 
 * @param {number} [precision=6]
 * @returns {Object}
 */
export const decodeLocationCode = (code, precision = 6) => {
  const parts = code.toLowerCase().split('-');
  if (parts.length !== 2) throw new Error('Invalid location code');
  
  const lat = parseInt(parts[0], 36) / Math.pow(10, precision) - 90;
  const lng = parseInt(parts[1], 36) / Math.pow(10, precision) - 180;
  
  return {
    lat: parseFloat(lat.toFixed(precision)),
    lng: parseFloat(lng.toFixed(precision))
  };
};

// ============================================================================
// GEOHASH UTILITIES
// ============================================================================

const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';

/**
 * Encode coordinates to geohash
 * @param {number} lat 
 * @param {number} lng 
 * @param {number} [precision=9]
 * @returns {string}
 */
export const encodeGeohash = (lat, lng, precision = 9) => {
  let latRange = [-90, 90];
  let lngRange = [-180, 180];
  let hash = '';
  let bit = 0;
  let ch = 0;
  let isLng = true;
  
  while (hash.length < precision) {
    const range = isLng ? lngRange : latRange;
    const val = isLng ? lng : lat;
    const mid = (range[0] + range[1]) / 2;
    
    if (val >= mid) {
      ch |= (1 << (4 - bit));
      range[0] = mid;
    } else {
      range[1] = mid;
    }
    
    if (isLng) lngRange = range;
    else latRange = range;
    
    isLng = !isLng;
    
    if (++bit === 5) {
      hash += BASE32[ch];
      bit = 0;
      ch = 0;
    }
  }
  
  return hash;
};

/**
 * Decode geohash to coordinates
 * @param {string} hash 
 * @returns {Object}
 */
export const decodeGeohash = (hash) => {
  let latRange = [-90, 90];
  let lngRange = [-180, 180];
  let isLng = true;
  
  for (const char of hash.toLowerCase()) {
    const idx = BASE32.indexOf(char);
    if (idx === -1) throw new Error('Invalid geohash character');
    
    for (let bit = 4; bit >= 0; bit--) {
      const range = isLng ? lngRange : latRange;
      const mid = (range[0] + range[1]) / 2;
      
      if ((idx >> bit) & 1) {
        range[0] = mid;
      } else {
        range[1] = mid;
      }
      
      if (isLng) lngRange = range;
      else latRange = range;
      
      isLng = !isLng;
    }
  }
  
  return {
    lat: parseFloat(((latRange[0] + latRange[1]) / 2).toFixed(6)),
    lng: parseFloat(((lngRange[0] + lngRange[1]) / 2).toFixed(6)),
    bounds: {
      north: latRange[1],
      south: latRange[0],
      east: lngRange[1],
      west: lngRange[0]
    }
  };
};

/**
 * Get neighboring geohashes
 * @param {string} hash 
 * @returns {Object}
 */
export const getGeohashNeighbors = (hash) => {
  const center = decodeGeohash(hash);
  const precision = hash.length;
  
  const latStep = (center.bounds.north - center.bounds.south);
  const lngStep = (center.bounds.east - center.bounds.west);
  
  return {
    n: encodeGeohash(center.lat + latStep, center.lng, precision),
    ne: encodeGeohash(center.lat + latStep, center.lng + lngStep, precision),
    e: encodeGeohash(center.lat, center.lng + lngStep, precision),
    se: encodeGeohash(center.lat - latStep, center.lng + lngStep, precision),
    s: encodeGeohash(center.lat - latStep, center.lng, precision),
    sw: encodeGeohash(center.lat - latStep, center.lng - lngStep, precision),
    w: encodeGeohash(center.lat, center.lng - lngStep, precision),
    nw: encodeGeohash(center.lat + latStep, center.lng - lngStep, precision)
  };
};

// ============================================================================
// PATH & ROUTE UTILITIES
// ============================================================================

/**
 * Calculate total distance of a path
 * @param {Array} points - Array of {lat, lng}
 * @param {string} [unit='km']
 * @returns {number}
 */
export const calculatePathDistance = (points, unit = 'km') => {
  if (points.length < 2) return 0;
  
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    total += haversineDistance(points[i], points[i + 1], unit);
  }
  
  return parseFloat(total.toFixed(4));
};

/**
 * Simplify a path using Douglas-Peucker algorithm
 * @param {Array} points - Array of {lat, lng}
 * @param {number} tolerance - Tolerance in km
 * @returns {Array}
 */
export const simplifyPath = (points, tolerance) => {
  if (points.length <= 2) return points;
  
  const getPerpendicularDistance = (point, lineStart, lineEnd) => {
    const A = haversineDistance(lineStart, point, 'km');
    const B = haversineDistance(point, lineEnd, 'km');
    const C = haversineDistance(lineStart, lineEnd, 'km');
    
    if (C === 0) return A;
    
    const s = (A + B + C) / 2;
    const area = Math.sqrt(Math.max(0, s * (s - A) * (s - B) * (s - C)));
    return (2 * area) / C;
  };
  
  let maxDist = 0;
  let maxIdx = 0;
  
  for (let i = 1; i < points.length - 1; i++) {
    const dist = getPerpendicularDistance(points[i], points[0], points[points.length - 1]);
    if (dist > maxDist) {
      maxDist = dist;
      maxIdx = i;
    }
  }
  
  if (maxDist > tolerance) {
    const left = simplifyPath(points.slice(0, maxIdx + 1), tolerance);
    const right = simplifyPath(points.slice(maxIdx), tolerance);
    return [...left.slice(0, -1), ...right];
  }
  
  return [points[0], points[points.length - 1]];
};

/**
 * Check if a path intersects itself
 * @param {Array} points - Array of {lat, lng}
 * @returns {boolean}
 */
export const doesPathIntersect = (points) => {
  const lineIntersects = (a1, a2, b1, b2) => {
    const det = (a2.lng - a1.lng) * (b2.lat - b1.lat) - (b2.lng - b1.lng) * (a2.lat - a1.lat);
    if (det === 0) return false;
    
    const lambda = ((b2.lat - b1.lat) * (b2.lng - a1.lng) + (b1.lng - b2.lng) * (b2.lat - a1.lat)) / det;
    const gamma = ((a1.lat - a2.lat) * (b2.lng - a1.lng) + (a2.lng - a1.lng) * (b2.lat - a1.lat)) / det;
    
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  };
  
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 2; j < points.length - 1; j++) {
      if (i === 0 && j === points.length - 2) continue;
      if (lineIntersects(points[i], points[i + 1], points[j], points[j + 1])) {
        return true;
      }
    }
  }
  
  return false;
};

// ============================================================================
// ELEVATION UTILITIES
// ============================================================================

/**
 * Estimate elevation effect on distance
 * @param {number} horizontalDistance - Distance in km
 * @param {number} elevationGain - Elevation gain in meters
 * @returns {Object}
 */
export const calculateElevationImpact = (horizontalDistance, elevationGain) => {
  const verticalKm = elevationGain / 1000;
  const actualDistance = Math.sqrt(horizontalDistance ** 2 + verticalKm ** 2);
  const additionalEffort = (elevationGain / 600) * 5;
  
  return {
    horizontalDistance: horizontalDistance,
    verticalDistance: verticalKm,
    actualDistance: parseFloat(actualDistance.toFixed(4)),
    equivalentFlatDistance: parseFloat((horizontalDistance + additionalEffort).toFixed(4)),
    gradient: parseFloat(((elevationGain / (horizontalDistance * 1000)) * 100).toFixed(2))
  };
};

// ============================================================================
// EXPORTS - DEFAULT OBJECT FOR CONVENIENCE
// ============================================================================

export default {
  // IP utilities
  ipv4,
  ipv6,
  isValidIPv4,
  isValidIPv6,
  isPrivateIP,
  getIPType,
  
  // Location details
  locationDetails,
  getFullLocationProfile,
  
  // Coordinates
  decimalToDMS,
  dmsToDecimal,
  parseCoordinate,
  isValidCoordinate,
  normalizeLongitude,
  
  // Distance
  haversineDistance,
  vincentyDistance,
  manhattanDistance,
  
  // Bearing & direction
  calculateBearing,
  bearingToCompass,
  getDirection,
  
  // Midpoint & interpolation
  getMidpoint,
  interpolatePoint,
  generatePathPoints,
  
  // Bounding box
  getBoundingBox,
  getBoundsFromPoints,
  isPointInBounds,
  expandBounds,
  
  // Geofencing
  isPointInPolygon,
  isPointInCircle,
  calculatePolygonArea,
  
  // Destination
  getDestinationPoint,
  generateCirclePoints,
  
  // Clustering
  clusterPoints,
  getCentroid,
  
  // Random
  randomCoordinate,
  randomPointInBounds,
  randomPointInRadius,
  generateRandomPoints,
  
  // Sorting & filtering
  sortByDistance,
  filterByRadius,
  findNearestPoint,
  findFarthestPoint,
  
  // Travel & speed
  estimateTravelTime,
  calculateSpeed,
  
  // Country & region
  getCountryInfo,
  getCountriesByContinent,
  isValidCountryCode,
  
  // Timezone
  getTimezoneFromCoords,
  getCurrentTimezone,
  
  // Formatting
  formatCoordinates,
  formatDistance,
  formatBearing,
  
  // Conversion
  convertDistance,
  convertSpeed,
  
  // Google Maps
  getGoogleMapsUrl,
  getGoogleMapsDirectionsUrl,
  getStaticMapUrl,
  
  // Location codes
  createLocationCode,
  decodeLocationCode,
  
  // Geohash
  encodeGeohash,
  decodeGeohash,
  getGeohashNeighbors,
  
  // Path utilities
  calculatePathDistance,
  simplifyPath,
  doesPathIntersect,
  
  // Elevation
  calculateElevationImpact
};
