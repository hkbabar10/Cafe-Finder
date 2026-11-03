import { renderExtraDetails } from './details.js';
import { TILE_URL, OVERPASS_URL } from './config.js';
import { initializeUI, matchesPreferences, createCard, beforeRender, showCount, setBusy } from './ui.js';

const get = (id) => document.getElementById(id);
const results = get('results');
const status = get('status');
let cafes = [];
let map;
let markers = [];
let lastRequest = 0;
let cachedSearch;
let filter = 'all';
let activeName;
let demoMode = false;

function locate() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Location is unavailable. Open this app on localhost or HTTPS.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude }),
      ({ code }) => reject(new Error(code === 1
        ? 'Location access was denied. Allow location in your browser settings or try the demo.'
        : 'Your location could not be determined. Try again or use the demo.')),
      { timeout: 10000, maximumAge: 60000 },
    );
  });
}

function distanceKm(from, to) {
  const rad = (degrees) => degrees * Math.PI / 180;
  const a = Math.sin(rad(to.lat - from.lat) / 2) ** 2
    + Math.cos(rad(from.lat)) * Math.cos(rad(to.lat))
    * Math.sin(rad(to.lng - from.lng) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(Math.min(1, a)));
}

function addText(parent, tag, content) {
  const element = document.createElement(tag);
  element.textContent = content;
  parent.append(element);
  return element;
}

function showCafe(cafe) {
  activeName = cafe.id;
  render();
  if (!cafe.marker) return;
  map.panTo(cafe.location, { animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches });
  cafe.marker.openPopup();
}

function render() {
  const visible = cafes.filter(cafe => (filter === 'all' || cafe.types.includes(filter)) && matchesPreferences(cafe))
    .sort((a, b) => a.distance - b.distance);
  for (const cafe of cafes) {
    if (cafe.marker) {
      if (visible.includes(cafe)) cafe.marker.addTo(map);
      else cafe.marker.remove();
    }
  }
  const selected = visible.find(cafe => cafe.id === activeName) ?? visible[0];
  activeName = selected?.id;
  const focusedId = document.activeElement?.dataset.selectId;
  beforeRender();
  results.replaceChildren();
  showCount(visible.length);
  get('detail').replaceChildren();
  for (const cafe of visible) {
    results.append(createCard(cafe, cafe === selected, showCafe));
  }
  if (focusedId) {
    for (const button of results.querySelectorAll('[data-select-id]')) {
      if (button.dataset.selectId === focusedId) button.focus({ preventScroll: true });
    }
  }
  if (!selected) {
    const empty = addText(results, 'li', '', 'empty-state');
    empty.className = 'empty-state';
    addText(empty, 'h3', 'A little room to explore.');
    addText(empty, 'p', 'No matching places. Try another type, clear study filters or turn off Saved, or search a wider area. Saved places are shown within the current search results.');
    addText(get('detail'), 'p', 'No place selected.');
    return;
  }
  addText(get('detail'), 'h2', selected.name);
  addText(get('detail'), 'p', selected.address);
  addText(get('detail'), 'p', selected.distance.toFixed(2) + ' km away · straight-line estimate');
  addText(get('detail'), 'p', 'Internet access · ' + (selected.internet ?? 'Not recorded'));
  addText(get('detail'), 'small', 'Noise levels, outlets and study suitability are unverified.');
  renderExtraDetails(get('detail'), selected);
  if (selected.url) {
    const link = addText(get('detail'), 'a', 'Open in OpenStreetMap ↗');
    link.href = selected.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    addText(get('detail'), 'small', 'Fictional demo listing · Live search adds map links.');
  }
}

function clearMarkers() {
  map?.closePopup();
  for (const marker of markers) marker.remove();
  markers = [];
}

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(chip => chip.setAttribute('aria-pressed', chip === button));
    map?.closePopup();
    render();
  });
});
function showDemo() {
  demoMode = true;
  clearMarkers();
  get('area-controls').hidden = true;
  get('map').hidden = true;
  get('map-placeholder').hidden = false;
  get('map-placeholder').textContent = 'Demo listings are fictional. Use your location to explore the live map.';
  const radiusKm = Number(get('radius').value);
  cafes = [
    { types: ['cafe'], name: 'Blue Hour Coffee', address: 'Demo café · Riverside', rating: 4.8, reviews: 87, distance: 0.65 },
    { types: ['cafe'], name: 'Margin Notes Café', address: 'Demo café · Market District', rating: 4.6, reviews: 231, distance: 0.32 },
    { types: ['restaurant'], name: 'The Study Table', address: 'Demo café · North End', rating: 5, reviews: 3, distance: 1.14 },
    { types: ['cafe'], name: 'Chapter Coffee', address: 'Demo café · West End', rating: 4.7, reviews: 52, distance: 3.5 },
    { types: ['restaurant'], name: 'The Reading Room', address: 'Demo restaurant · Lakeside', rating: 4.5, reviews: 140, distance: 7.5 },
  ].map((cafe, index) => ({ ...cafe, id: 'demo-' + index })).filter((cafe) => cafe.distance <= radiusKm);
  status.textContent = `${cafes.length} fictional places within ${radiusKm} km. Demo mode uses no location or API key.`;
  render();
}
get('demo').addEventListener('click', showDemo);
get('radius').addEventListener('input', () => {
  const distance = get('radius').value + ' km';
  get('radius-value').textContent = distance;
  get('radius').setAttribute('aria-valuetext', distance);
  if (demoMode) showDemo();
});

async function searchPlaces(event) {
  event.preventDefault();
  const radius = Number(get('radius').value) * 1000;
  for (const id of ['locate', 'demo', 'radius', 'choose-area', 'search-area']) get(id).disabled = true;
  setBusy(true);
  status.textContent = 'Getting your location…';
  try {
    let center;
    if (event.submitter?.id === 'search-area') {
      center = map.getCenter();
    } else {
      try {
        center = await locate();
      } catch (error) {
        openAreaPicker();
        throw new Error(error.message + ' Choose your area on the map and click Search this map area.');
      }
    }
    status.textContent = 'Searching for nearby places…';
    if (!window.L) throw new Error('The map library could not load. Check your connection and reload.');
    const cacheKey = [center.lat, center.lng, radius].join(',');
    let elements;
    if (cachedSearch?.key === cacheKey && Date.now() - cachedSearch.time < 300000) {
      elements = cachedSearch.elements;
    } else {
      if (Date.now() - lastRequest < 15000) throw new Error('Please wait 15 seconds between searches.');
      lastRequest = Date.now();
      const query = '[out:json][timeout:25];nwr["amenity"~"^(cafe|restaurant)$"](around:' +
        radius + ',' + center.lat + ',' + center.lng + ');out center tags;';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      try {
        const response = await fetch(OVERPASS_URL, {
          method: 'POST', body: new URLSearchParams({ data: query }), signal: controller.signal,
        });
        if (!response.ok) throw new Error('The public search service is busy (' + response.status + '). Try again later.');
        const data = await response.json();
        if (data.remark || !Array.isArray(data.elements)) throw new Error('The search service could not complete the request. Try a smaller radius.');
        elements = data.elements;
        cachedSearch = { key: cacheKey, time: Date.now(), elements };
      } finally {
        clearTimeout(timeout);
      }
    }
    const nextCafes = elements.map(element => {
      const point = element.center ?? element;
      if (!Number.isFinite(point.lat) || !Number.isFinite(point.lon)) return null;
      const tags = element.tags ?? {};
      const location = { lat: point.lat, lng: point.lon };
      return {
        id: element.type + '/' + element.id,
        name: tags.name ?? tags.brand ?? 'Unnamed ' + tags.amenity,
        types: [tags.amenity], location,
        distance: distanceKm(center, location),
        address: [tags['addr:housenumber'], tags['addr:street'], tags['addr:city']].filter(Boolean).join(' ') || 'Address not recorded',
        internet: tags.internet_access,
        website: tags.website ?? tags['contact:website'],
        phone: tags.phone ?? tags['contact:phone'],
        cuisine: tags.cuisine,
        openingHours: tags.opening_hours,
        commons: tags.wikimedia_commons,
        image: tags.image,
        url: 'https://www.openstreetmap.org/' + element.type + '/' + element.id,
      };
    }).filter(cafe => cafe && cafe.distance <= radius / 1000);
    demoMode = false;
    clearMarkers();
    get('map').hidden = false;
    get('map-placeholder').hidden = true;
    ensureMap(center);
    map.invalidateSize();
    map.setView(center, 14);
    cafes = nextCafes;
    for (const cafe of cafes) {
      const markerNumber = markers.length + 1;
      cafe.marker = L.marker(cafe.location, {
        title: cafe.name,
        icon: L.divIcon({ className: 'study-pin', html: '<span>' + markerNumber + '</span>', iconSize: [44, 44], iconAnchor: [22, 44] }),
      }).bindPopup(document.createTextNode(cafe.name));
      cafe.marker.on('mouseover', () => highlightCafe(cafe.id, true));
      cafe.marker.on('mouseout', () => highlightCafe(cafe.id, false));
      cafe.marker.on('add', () => {
        const element = cafe.marker.getElement();
        element.onfocus = () => highlightCafe(cafe.id, true);
        element.onblur = () => highlightCafe(cafe.id, false);
      });
      cafe.marker.on('click', () => showCafe(cafe));
      markers.push(cafe.marker);
    }
    if (cafes.length) map.fitBounds(L.latLngBounds([center, ...cafes.map(cafe => cafe.location)]), { padding: [30, 30], maxZoom: 16 });
    status.textContent = cafes.length
      ? `Found ${cafes.length} places within ${radius / 1000} km. Distances are straight-line estimates.`
      : 'No places found in that radius. Try another location.';
    render();
  } catch (error) {
    status.textContent = `Search failed. ${error.name === 'AbortError' ? 'The search timed out. Try a smaller radius.' : (error.message ?? 'Try again or use the demo.')}`;
  } finally {
    setBusy(false);
    for (const id of ['locate', 'demo', 'radius', 'choose-area', 'search-area']) get(id).disabled = false;
  }
}
get('search').addEventListener('submit', searchPlaces);
get('search-area').addEventListener('click', () => searchPlaces({ preventDefault() {}, submitter: get('search-area') }));

function highlightCafe(id, highlighted) {
  for (const card of results.querySelectorAll('[data-place-id]')) {
    if (card.dataset.placeId === id) card.classList.toggle('highlight', highlighted);
  }
  const cafe = cafes.find(place => place.id === id);
  cafe?.marker?.getElement()?.classList.toggle('highlight', highlighted);
}

initializeUI(render, highlightCafe, () => map?.invalidateSize());

function ensureMap(center) {
  if (!window.L) throw new Error('The map library could not load. Check your connection and reload.');
  get('map').hidden = false;
  get('map-placeholder').hidden = true;
  if (!map) {
    map = L.map('map').setView(center, 12);
    L.tileLayer(TILE_URL, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }
  map.invalidateSize();
}

function openAreaPicker() {
  document.querySelector('.layout').dataset.view = 'split';
  document.querySelectorAll('.view-switch button').forEach(button => button.setAttribute('aria-pressed', button.dataset.view === 'split'));
  ensureMap({ lat: 43.6532, lng: -79.3832 });
  get('area-controls').hidden = false;
  get('map-panel').scrollIntoView({ block: 'nearest' });
  requestAnimationFrame(() => map.invalidateSize());
}
get('choose-area').addEventListener('click', () => {
  try { openAreaPicker(); }
  catch (error) { status.textContent = error.message; }
});
