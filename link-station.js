
// Link stations [x,y,r] with points (x, y) and reach (r)
const linkStations = [
  { x: 0, y: 0, r: 10 },
  { x: 20, y: 20, r: 5 },
  { x: 10, y: 0, r: 12 }
];

// devices at points [x,y]
const points = [
  { x: 0, y: 0 },
  { x: 100, y: 100 },
  { x: 15, y: 10 },
  { x: 18, y: 18 }
];

/**
 * getDistance
 *
 * Calculates device's distance from link station
 * @param pointStation
 * @param pointDevice
 * @returns {number}
 */
function getDistance(pointStation, pointDevice) {

  return Math.sqrt(Math.pow((pointDevice.x - pointStation.x), 2) + Math.pow((pointDevice.y - pointStation.y), 2));
}

/**
 * getPower
 *
 * Calculates link station’s power
 * @param station
 * @param point
 * @returns {number}
 */
function getPower(station, point) {
  const distance = getDistance(station, point);

  return distance > station.r ? 0 : +Math.pow(station.r - distance, 2).toFixed(2);
}

/**
 * calculateMaxPowerStation
 *
 * Calculates most suitable link station (with most power) for a device
 * @param stations
 * @param point
 * @return {void}
 */
function calculateMaxPowerStation(stations, point) {
  let maxStation = stations.map(station => {
    station.power = getPower(station, point);
    return station;
  }).reduce((a, b) => a.power > b.power ? a : b);

  if (maxStation.power === 0) {
    console.log('No link station within reach for point ' + point.x + ',' + point.y);
  } else {
    console.log('Best station for point ' + point.x + ',' + point.y +
      ' is ' + maxStation.x + ',' + maxStation.y + ' with power ' + maxStation.power);
  }
}

// Calculate most suitable link station for each given device location (point)
points.forEach(point => calculateMaxPowerStation(linkStations, point));
