// Optional details and photos never block the nearby-place search.
const photoCache = new Map();

export function safeWebsite(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const input = value.trim();
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : 'https://' + input);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

export function commonsFile(value) {
  if (typeof value !== 'string') return null;
  if (value.startsWith('File:') && !value.includes('|')) return value;
  try {
    const url = new URL(value);
    if (url.hostname !== 'commons.wikimedia.org') return null;
    const title = decodeURIComponent(url.pathname.replace(/^\/wiki\//, ''));
    return title.startsWith('File:') && !title.includes('|') ? title : null;
  } catch { return null; }
}

function text(parent, tag, value) {
  const element = document.createElement(tag);
  element.textContent = value;
  parent.append(element);
  return element;
}

function externalLink(parent, label, url) {
  const link = text(parent, 'a', label);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function plainMetadata(value) {
  const parsed = new DOMParser().parseFromString(value ?? '', 'text/html');
  return parsed.body.textContent.trim();
}

async function fetchPhoto(title) {
  const params = new URLSearchParams({
    action: 'query', format: 'json', origin: '*', prop: 'imageinfo',
    titles: title, iiprop: 'url|extmetadata', iiurlwidth: '800',
  });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch('https://commons.wikimedia.org/w/api.php?' + params, { signal: controller.signal });
    if (!response.ok) throw new Error('Photo service unavailable');
    const data = await response.json();
    const info = Object.values(data.query?.pages ?? {})[0]?.imageinfo?.[0];
    if (!info) throw new Error('Photo unavailable');
    const metadata = info.extmetadata ?? {};
    const license = plainMetadata(metadata.LicenseShortName?.value);
    const artist = plainMetadata(metadata.Artist?.value);
    const credit = plainMetadata(metadata.Credit?.value);
    // Display only licenses with supported attribution, and require author credit.
    if (!/^(CC BY(?:-SA)? [\d.]+|CC0(?: [\d.]+)?|Public domain)$/i.test(license) || !artist) {
      throw new Error('Photo license metadata needs review');
    }
    const source = safeWebsite(info.descriptionurl);
    const image = safeWebsite(info.thumburl ?? info.url);
    const licenseUrl = safeWebsite(metadata.LicenseUrl?.value);
    if (!source || !image || new URL(image).hostname !== 'upload.wikimedia.org' ||
        new URL(source).hostname !== 'commons.wikimedia.org' || (/^CC BY/i.test(license) && !licenseUrl)) {
      throw new Error('Photo metadata incomplete');
    }
    return { image, source, license, licenseUrl, artist, credit };
  } finally { clearTimeout(timeout); }
}

function getPhoto(title) {
  const cached = photoCache.get(title);
  if (cached && Date.now() - cached.time < 300000) return cached.promise;
  if (photoCache.size >= 50) photoCache.delete(photoCache.keys().next().value);
  const promise = fetchPhoto(title);
  photoCache.set(title, { time: Date.now(), promise });
  return promise;
}

export function renderExtraDetails(parent, cafe) {
  const info = document.createElement('dl');
  info.className = 'venue-facts';
  parent.append(info);
  const fact = (name, value) => {
    text(info, 'dt', name);
    return text(info, 'dd', value || 'Not recorded');
  };
  fact('Cuisine', cafe.cuisine?.replaceAll(';', ' · ').replaceAll('_', ' '));
  fact('Opening hours', cafe.openingHours);
  const site = fact('Website', '');
  const website = safeWebsite(cafe.website);
  if (website) {
    site.replaceChildren();
    externalLink(site, new URL(website).hostname + ' ↗', website);
  }
  const phone = fact('Phone', cafe.phone);
  if (cafe.phone && /^[+\d\s().-]+$/.test(cafe.phone)) {
    phone.replaceChildren();
    const call = text(phone, 'a', cafe.phone);
    call.href = 'tel:' + cafe.phone.replace(/[^+\d]/g, '');
  }
  fact('Ratings & reviews', 'Not supplied by OpenStreetMap');
  text(parent, 'small', 'Hours are shown as recorded in OpenStreetMap. Confirm current hours with the venue. Mo–Su are weekdays; PH means public holidays.');
  const figure = document.createElement('figure');
  figure.className = 'venue-photo';
  parent.append(figure);
  const title = commonsFile(cafe.commons) ?? commonsFile(cafe.image);
  if (!title) {
    text(figure, 'figcaption', 'No linked Wikimedia photo is available for this place.');
    return;
  }
  const caption = text(figure, 'figcaption', 'Loading venue photo…');
  getPhoto(title).then(photo => {
    if (!figure.isConnected) return;
    const image = document.createElement('img');
    image.alt = cafe.name + ' — photo linked in OpenStreetMap';
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => {
      image.remove();
      caption.textContent = 'Photo could not load. View the original on Wikimedia Commons.';
      externalLink(caption, 'View original ↗', photo.source);
    }, { once: true });
    image.src = photo.image;
    figure.prepend(image);
    caption.replaceChildren();
    text(caption, 'span', photo.artist + (photo.credit ? ' · ' + photo.credit : '') + ' · ');
    externalLink(caption, photo.license, photo.licenseUrl ?? photo.source);
    text(caption, 'span', ' · ');
    externalLink(caption, 'Wikimedia Commons ↗', photo.source);
  }).catch(() => {
    if (!figure.isConnected) return;
    caption.textContent = 'Photo could not be loaded with complete license information. ';
    externalLink(caption, 'View source ↗', 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(title));
  });
}
