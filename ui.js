// Presentation state stays separate from the place objects returned by the search.
const get = id => document.getElementById(id);
let saved = new Set();
let savedOnly = false;
const selectedNeeds = new Set();
const needLabels = { quiet: 'Quiet', wifi: 'Wi-Fi', outlets: 'Power outlets', late: 'Open late (after 9 pm)', group: 'Group-friendly', pets: 'Pet-friendly' };
let notes = {};
let editingCafe;
try {
  const storedNotes = JSON.parse(localStorage.getItem('studycafe-notes') ?? '{}');
  if (storedNotes && typeof storedNotes === 'object' && !Array.isArray(storedNotes)) notes = storedNotes;
} catch { /* Keep notes in memory when storage is unavailable. */ }
let toastTimer;
let refresh;
let highlight;
let observer;
try {
  const stored = JSON.parse(localStorage.getItem('studycafe-saved') ?? '[]');
  if (Array.isArray(stored)) saved = new Set(stored.filter(id => typeof id === 'string'));
} catch { /* Saved places remain available for this session. */ }

export function matchesPreferences(cafe) {
  return (!savedOnly || saved.has(cafe.id)) && [...selectedNeeds].every(need => featureValue(cafe, need) === 'yes');
}

function featureValue(cafe, need) {
  const value = notes[cafe.id]?.[need];
  if (value === 'yes' || value === 'no') return value;
  if (need === 'wifi' && cafe.internet === 'wlan') return 'yes';
  return 'unknown';
}

function openNotes(cafe) {
  editingCafe = cafe;
  get('notes-place').textContent = cafe.name;
  get('notes-fields').replaceChildren();
  for (const [key, labelText] of Object.entries(needLabels)) {
    const label = document.createElement('label');
    text(label, 'span', labelText);
    const select = document.createElement('select');
    select.name = key;
    for (const [value, caption] of [['unknown', 'Unknown'], ['yes', 'Yes'], ['no', 'No']]) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = caption;
      select.append(option);
    }
    select.value = notes[cafe.id]?.[key] ?? 'unknown';
    label.append(select);
    get('notes-fields').append(label);
  }
  get('notes-dialog').showModal();
}

function text(parent, tag, value, className) {
  const element = document.createElement(tag);
  element.textContent = value;
  if (className) element.className = className;
  parent.append(element);
  return element;
}

function notify(message) {
  clearTimeout(toastTimer);
  get('toast').textContent = message;
  get('toast').hidden = false;
  toastTimer = setTimeout(() => { get('toast').hidden = true; }, 2500);
}

function updateSavedCount() {
  get('saved-count').textContent = saved.size;
}

function toggleSave(cafe, button) {
  if (saved.has(cafe.id)) saved.delete(cafe.id);
  else saved.add(cafe.id);
  try {
    localStorage.setItem('studycafe-saved', JSON.stringify([...saved]));
  } catch {
    notify('Saved for this session. Browser storage is unavailable.');
  }
  button.setAttribute('aria-pressed', saved.has(cafe.id));
  button.setAttribute('aria-label', (saved.has(cafe.id) ? 'Unsave ' : 'Save ') + cafe.name);
  button.textContent = saved.has(cafe.id) ? '♥' : '♡';
  button.classList.remove('pulse');
  requestAnimationFrame(() => button.classList.add('pulse'));
  updateSavedCount();
  if (savedOnly) {
    refresh();
    get('saved').focus();
  }
}

export function createCard(cafe, selected, onSelect) {
  const item = document.createElement('li');
  item.className = 'cafe-card' + (selected ? ' selected' : '');
  item.dataset.placeId = cafe.id;
  const top = document.createElement('div');
  top.className = 'card-top';
  item.append(top);
  const image = document.createElement('img');
  image.src = './assets/cafe-scene.svg';
  image.alt = 'Illustration of a café workspace, not a photograph of this place';
  image.width = 112;
  image.height = 100;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.className = 'card-image';
  top.append(image);
  const main = document.createElement('div');
  main.className = 'card-main';
  top.append(main);
  text(main, 'p', cafe.types[0] === 'restaurant' ? 'Restaurant' : 'Café', 'card-kicker');
  const select = text(main, 'button', cafe.name, 'card-select');
  select.type = 'button';
  select.dataset.selectId = cafe.id;
  select.setAttribute('aria-pressed', selected);
  select.addEventListener('click', () => {
    onSelect(cafe);
    document.querySelector('.layout').dataset.view = 'split';
    document.querySelectorAll('.view-switch button').forEach(button => button.setAttribute('aria-pressed', button.dataset.view === 'split'));
    window.dispatchEvent(new Event('resize'));
    get('detail').scrollIntoView({ block: 'nearest' });
  });
  const rating = Number.isFinite(cafe.rating) ? '★ ' + cafe.rating.toFixed(1) + ' · Sample rating' : 'Rating unavailable';
  text(main, 'p', cafe.distance.toFixed(2) + ' km · ' + rating, 'card-meta');
  text(main, 'p', cafe.address, 'card-address');
  const save = text(top, 'button', saved.has(cafe.id) ? '♥' : '♡', 'favorite');
  save.type = 'button';
  save.setAttribute('aria-pressed', saved.has(cafe.id));
  save.setAttribute('aria-label', (saved.has(cafe.id) ? 'Unsave ' : 'Save ') + cafe.name);
  save.addEventListener('click', () => toggleSave(cafe, save));
  const bottom = document.createElement('div');
  bottom.className = 'card-bottom';
  item.append(bottom);
  text(bottom, 'span', cafe.internet === 'wlan' ? 'Wi-Fi recorded' : 'Wi-Fi unverified',
    cafe.internet === 'wlan' ? 'tag' : 'tag unknown');
  text(bottom, 'span', cafe.openingHours ? 'Hours in details' : 'Hours unavailable', 'tag unknown');
  const score = document.createElement('div');
  score.className = 'score';
  score.setAttribute('aria-label', 'Study Score unavailable. Noise, seating, Wi-Fi and outlet data are incomplete.');
  text(score, 'span', '—', 'score-ring');
  text(score, 'span', 'Study Score pending');
  bottom.append(score);
  for (const key of Object.keys(needLabels)) {
    if (notes[cafe.id]?.[key] === 'yes') text(bottom, 'span', needLabels[key] + ' · Your note', 'tag');
  }
  const editNotes = text(item, 'button', 'Add / edit study notes', 'text-button');
  editNotes.type = 'button';
  editNotes.addEventListener('click', () => openNotes(cafe));
  item.addEventListener('mouseenter', () => highlight(cafe.id, true));
  item.addEventListener('mouseleave', () => highlight(cafe.id, false));
  item.addEventListener('focusin', () => highlight(cafe.id, true));
  item.addEventListener('focusout', event => {
    if (!item.contains(event.relatedTarget)) highlight(cafe.id, false);
  });
  observer?.observe(item);
  return item;
}

export function beforeRender() {
  observer?.disconnect();
}

export function showCount(count) {
  get('result-count').textContent = count + (count === 1 ? ' place' : ' places') + ' · Nearest first';
}

export function setBusy(busy) {
  get('list-panel').setAttribute('aria-busy', busy);
  get('skeletons').hidden = !busy;
  get('results').hidden = busy;
  get('locate').textContent = busy ? 'Finding your spot…' : 'Find my spot ↗';
}

export function initializeUI(onRefresh, onHighlight, onMapResize) {
  refresh = onRefresh;
  highlight = onHighlight;
  updateSavedCount();
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let themeChoice;
  try { themeChoice = localStorage.getItem('studycafe-theme'); } catch { /* Use device theme. */ }
  const applyTheme = dark => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    get('theme').textContent = dark ? '☀' : '☾';
    get('theme').setAttribute('aria-pressed', dark);
    get('theme').setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  applyTheme(themeChoice ? themeChoice === 'dark' : preference.matches);
  get('theme').addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    applyTheme(dark);
    themeChoice = dark ? 'dark' : 'light';
    try { localStorage.setItem('studycafe-theme', themeChoice); } catch { /* Session theme. */ }
  });
  preference.addEventListener('change', event => { if (!themeChoice) applyTheme(event.matches); });
  get('saved').addEventListener('click', () => {
    savedOnly = !savedOnly;
    get('saved').setAttribute('aria-pressed', savedOnly);
    refresh();
    get('explore').scrollIntoView({ block: 'start' });
  });
  document.querySelectorAll('[data-need]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.need;
      if (selectedNeeds.has(key)) selectedNeeds.delete(key);
      else selectedNeeds.add(key);
      button.setAttribute('aria-pressed', selectedNeeds.has(key));
      refresh();
    });
  });
  get('clear-needs').addEventListener('click', () => {
    selectedNeeds.clear();
    document.querySelectorAll('[data-need]').forEach(button => button.setAttribute('aria-pressed', false));
    refresh();
  });
  get('notes-cancel').addEventListener('click', () => get('notes-dialog').close());
  get('notes-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!editingCafe) return;
    notes[editingCafe.id] = Object.fromEntries(new FormData(get('notes-form')));
    let message = 'Your study notes were saved.';
    try { localStorage.setItem('studycafe-notes', JSON.stringify(notes)); }
    catch { message = 'Notes saved for this session only. Browser storage is unavailable.'; }
    get('notes-dialog').close();
    refresh();
    get('clear-needs').focus();
    notify(message);
  });
  document.querySelectorAll('[data-view]').forEach(button => {
    if (button.tagName !== 'BUTTON') return;
    button.addEventListener('click', () => {
      document.querySelector('.layout').dataset.view = button.dataset.view;
      document.querySelectorAll('.view-switch button').forEach(tab => tab.setAttribute('aria-pressed', tab === button));
      requestAnimationFrame(onMapResize);
    });
  });
  const nav = document.querySelector('.navigation');
  const updateNav = () => nav.classList.toggle('compact', window.scrollY > 24);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.05 });
  }
}
