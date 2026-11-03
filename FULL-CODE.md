## index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="color-scheme" content="light dark">
  <title>StudyCafe — A little space to focus</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <link rel="stylesheet" href="./styles.css">
  <script defer src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script type="module" src="./app.js"></script>
</head>
<body>
  <a class="skip-link" href="#explore">Skip to results</a>
  <nav class="navigation" aria-label="Main navigation">
    <a class="wordmark" href="#top"><span class="brand-icon" aria-hidden="true">sc.</span>StudyCafe<span class="brand-dot">.</span></a>
    <div class="nav-actions">
      <button id="saved" class="quiet-button" type="button" aria-pressed="false">♡ <span>Saved</span> <span id="saved-count">0</span></button>
      <button id="theme" class="icon-button" type="button" aria-label="Switch to dark mode" aria-pressed="false">☾</button>
    </div>
  </nav>
  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> A CHANGE OF SCENERY</p>
        <h1 id="hero-title">A little coffee.<br>A little more <em>focus.</em></h1>
        <p class="hero-description">Find a place nearby to settle in, open your laptop,<br class="desktop-break"> and make a little progress.</p>
      </div>
      <div class="hero-art" aria-hidden="true"><img src="./assets/cafe-scene.svg" width="480" height="340" alt=""><span>YOUR NEXT CHAPTER STARTS HERE</span></div>
    </section>
    <form id="search" class="search-bar" aria-label="Search nearby places">
      <div class="location-field"><span class="location-symbol" aria-hidden="true">◎</span><div><span class="field-label">YOUR STARTING POINT</span><strong>Near my current location</strong><small>Location shared when you search</small></div></div>
      <div class="distance-control">
        <label for="radius">Search distance <output id="radius-value" for="radius">2.5 km</output></label>
        <input type="range" id="radius" min="1" max="10" step="0.5" value="2.5" aria-valuetext="2.5 km" aria-describedby="radius-hint">
        <div class="range-ends"><span>1 km</span><span>10 km</span></div>
      </div>
      <button id="locate" class="primary-button" type="submit">Find my spot <span aria-hidden="true">↗</span></button>
    </form>
    <div class="search-caption"><button id="choose-area" type="button" class="text-button">Choose an area on the map</button><small id="radius-hint">Adjust your distance, then search.</small><button id="demo" class="text-button" type="button">Just exploring? Try the demo →</button></div>
    <section class="study-filters" aria-label="Study needs">
      <span class="field-label">MAKE IT YOUR KIND OF PLACE</span>
      <div class="chips">
        <button type="button" class="chip" data-need="quiet" aria-pressed="false">Quiet</button>
        <button type="button" class="chip" id="wifi" data-need="wifi" aria-pressed="false">Wi-Fi</button>
        <button type="button" class="chip" data-need="outlets" aria-pressed="false">Power outlets</button>
        <button type="button" class="chip" data-need="late" aria-pressed="false">Open late</button>
        <button type="button" class="chip" data-need="group" aria-pressed="false">Group-friendly</button>
        <button type="button" class="chip" data-need="pets" aria-pressed="false">Pet-friendly</button>
      </div>
      <small class="filter-note">Filters match recorded Wi-Fi or your saved study notes. Unrecorded features are unknown. Add notes from a café card.</small>
    <button id="clear-needs" type="button" class="text-button">Clear study filters</button></section>
    <section id="explore" aria-labelledby="results-title">
      <div class="results-heading"><div><p class="eyebrow">YOUR NEXT STUDY SPOT</p><h2 id="results-title">Good places to begin.</h2></div>
        <div class="view-switch" aria-label="Results view"><button type="button" data-view="split" aria-pressed="true">Split</button><button type="button" data-view="list" aria-pressed="false">List</button><button type="button" data-view="map" aria-pressed="false">Map</button></div>
      </div>
      <div class="results-toolbar"><div class="type-filters" aria-label="Place type"><button type="button" data-filter="all" aria-pressed="true">All spots</button><button type="button" data-filter="cafe" aria-pressed="false">Cafés</button><button type="button" data-filter="restaurant" aria-pressed="false">Restaurants</button></div><span id="result-count">Ready to explore</span></div>
      <p id="status" role="status">Find nearby places or try the demo. Results are ordered by distance.</p>
      <div class="layout" data-view="split">
        <div id="list-panel">
          <div id="skeletons" hidden aria-hidden="true"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>
          <ol id="results"><li class="empty-state"><span aria-hidden="true">◎</span><h3>Your next favorite spot is close.</h3><p>Search nearby to find cafés and restaurants, or explore with sample listings.</p></li></ol>
        </div>
        <section id="map-panel" aria-label="Map and selected place">
          <div id="map-placeholder"><span class="map-orbit" aria-hidden="true">◎</span><h3>A new perspective.</h3><p>Search with your location to explore<br>real places on the map.</p></div>
          <div id="map" hidden></div><div id="area-controls" hidden><p>Drag or zoom the map to your area, then search its center. Initial view is Toronto, not your detected location.</p><button id="search-area" type="button" class="primary-button">Search this map area</button></div>
          <div id="detail" aria-live="polite"><p class="detail-hint">Select a place to take a closer look.</p></div>
        </section>
      </div>
    </section>
    <footer><a class="wordmark" href="#top">StudyCafe.</a><p>A little space to do your best work.</p><small>Place data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> · <a href="https://www.openstreetmap.org/fixthemap">Report a map issue</a>.<br>Searches share your location with Overpass. Map tiles load from OpenStreetMap. Card artwork is illustrative. Selected venue photos load from Wikimedia Commons when linked and include attribution.</small></footer>
  </main>
  <dialog id="notes-dialog" aria-labelledby="notes-title">
    <form id="notes-form"><h2 id="notes-title">Your study notes</h2><p id="notes-place"></p><p>Record what you know. Notes stay in this browser and power the study filters.</p>
    <div id="notes-fields"></div><div class="nav-actions"><button type="button" id="notes-cancel" class="quiet-button">Cancel</button><button class="primary-button" type="submit">Save notes</button></div></form>
  </dialog>
  <div id="toast" class="toast" role="status" hidden></div>
</body>
</html>

```

## styles.css

```css
:root {
  color-scheme: light;
  --background: #FAF6F0; --surface: #FFFFFF; --text: #2B1D14; --secondary: #7A6A5F;
  --amber: #E58A2B; --sage: #5F8F6E; --teal: #1F6F78;
  --sage-text: #365E43; --teal-text: #1F6F78; --border: #DDD0C3;
  --tint: #F7F0E8; --sage-tint: #E9F0E8; --focus: #91500B;
  --shadow: 0 4px 8px #2b1d1404, 0 16px 40px #2b1d1408;
  --radius: 16px; --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-6: 24px; --space-8: 32px;
  font: 16px/1.6 "DM Sans", system-ui, sans-serif;
}
:root[data-theme="dark"] {
  color-scheme: dark; --background: #1B1410; --surface: #2A211B; --text: #FAF6F0;
  --secondary: #C3B4A5; --border: #68564A; --tint: #362A21; --sage-tint: #253B2B;
  --sage-text: #AED5B6; --teal-text: #85D0D5; --focus: #F4B46F;
  --shadow: 0 8px 32px #0003;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 100px; }
body { margin: 0; color: var(--text); background: var(--background); }
button, input { font: inherit; }
button, a, input { -webkit-tap-highlight-color: transparent; }
button { cursor: pointer; min-height: 44px; color: var(--text); }
button:disabled { cursor: not-allowed; }
button, a, .cafe-card, .search-bar { transition: background 180ms ease-out, color 180ms ease-out, box-shadow 180ms ease-out, transform 180ms ease-out; }
button:active:not(:disabled) { transform: scale(.97); }
button:focus-visible, a:focus-visible, input:focus-visible { outline: 3px solid var(--focus); outline-offset: 4px; }
a { color: var(--teal-text); text-underline-offset: 4px; }
[hidden] { display: none !important; }
h1, h2, h3, p { margin: 0; }
h1, h2, h3 { line-height: 1.15; }
h1, h2 { font-family: Fraunces, Georgia, serif; font-weight: 500; }
small { font-size: .8rem; }
.navigation { position: sticky; top: 0; z-index: 1000; padding: 20px max(24px, calc((100vw - 1200px)/2)); display: flex; align-items: center; justify-content: space-between; gap: 16px; background: var(--background); border-bottom: 1px solid var(--border); transition: padding 200ms ease-out; }
.navigation.compact { padding-top: 8px; padding-bottom: 8px; box-shadow: var(--shadow); }
.wordmark { display: inline-flex; align-items: center; font-weight: 700; font-size: 1.25rem; text-decoration: none; color: var(--text); white-space: nowrap; }
.brand-dot { color: var(--focus); }
.brand-icon { display: grid; place-items: center; margin-right: 10px; width: 36px; height: 36px; background: var(--amber); color: #2B1D14; border-radius: 12px; font-family: Georgia, serif; }
.nav-actions { display: flex; gap: 12px; }
.icon-button, .quiet-button { border: 1px solid var(--border); border-radius: 12px; background: var(--surface); padding: 8px 12px; }
.icon-button { width: 44px; }
#saved[aria-pressed="true"] { background: var(--sage-tint); color: var(--sage-text); }
#saved-count { display: inline-block; min-width: 20px; font-size: .75rem; }
main { max-width: 1248px; padding: 0 24px; margin: auto; }
.hero { display: grid; grid-template-columns: 1.3fr 1fr; align-items: center; gap: 32px; padding: 56px 0 40px; }
.eyebrow, .field-label { font-size: .72rem; font-weight: 700; letter-spacing: .12em; color: var(--secondary); }
.eyebrow span { display: inline-block; width: 7px; height: 7px; margin-right: 8px; background: var(--sage); border-radius: 50%; }
h1 { font-size: clamp(2.5rem, 4.8vw, 4.4rem); letter-spacing: -.045em; margin: 16px 0 20px; }
h1 em { color: var(--teal-text); font-weight: 400; }
.hero-description { color: var(--secondary); max-width: 470px; }
.hero-art { transform: rotate(2deg); }
.hero-art img { width: 100%; height: auto; border-radius: 32px; }
.hero-art span { display: block; text-align: center; margin-top: 8px; font-size: .72rem; letter-spacing: .18em; color: var(--secondary); }
.search-bar { display: grid; grid-template-columns: 1.2fr 1fr auto; gap: 24px; padding: 20px 24px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); align-items: center; }
.search-bar:focus-within { box-shadow: 0 0 0 4px color-mix(in srgb, var(--amber) 20%, transparent), var(--shadow); border-color: var(--focus); }
.location-field { display: flex; gap: 16px; align-items: center; }
.location-symbol { font-size: 2rem; color: var(--teal-text); }
.location-field span.field-label, .location-field strong, .location-field small { display: block; }
.location-field small { color: var(--secondary); }
.distance-control { border-left: 1px solid var(--border); padding-left: 24px; }
.distance-control label { display: flex; justify-content: space-between; font-size: .8rem; font-weight: 600; }
.distance-control output { color: var(--teal-text); font-variant-numeric: tabular-nums; }
#radius { display: block; width: 100%; height: 24px; min-height: 44px; margin: 0; accent-color: var(--focus); }
.range-ends { display: flex; justify-content: space-between; font-size: .72rem; color: var(--secondary); }
.primary-button { background: var(--amber); color: #2B1D14; border: 0; padding: 14px 24px; border-radius: 12px; font-weight: 700; }
.primary-button span { margin-left: 16px; }
.primary-button:hover { box-shadow: 0 4px 16px #e58a2b40; transform: translateY(-2px); }
.text-button { border: 0; background: transparent; color: var(--teal-text); text-decoration: underline; text-underline-offset: 4px; padding: 4px 0; }
.search-caption { display: flex; align-items: center; justify-content: space-between; gap: 16px; color: var(--secondary); }
.search-caption button { font-size: .8rem; }
.study-filters { padding: 24px 0 32px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 8px; }
.chip { padding: 8px 18px; border-radius: 99px; background: var(--surface); border: 1px solid var(--border); font-size: .85rem; }
.chip[aria-pressed="true"] { color: var(--sage-text); background: var(--sage-tint); border-color: var(--sage-text); }
.chip:disabled { color: var(--secondary); background: var(--tint); border-style: dashed; }
.filter-note { display: block; color: var(--secondary); }
.results-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 24px; border-top: 1px solid var(--border); }
.results-heading h2 { font-size: 2rem; margin-top: 8px; letter-spacing: -.035em; }
.view-switch { display: flex; padding: 4px; border-radius: 12px; background: var(--tint); }
.view-switch button { border: 0; background: transparent; padding: 6px 14px; border-radius: 8px; font-size: .85rem; }
.view-switch button[aria-pressed="true"] { background: var(--surface); box-shadow: var(--shadow); }
.results-toolbar { display: flex; justify-content: space-between; gap: 16px; align-items: center; margin-top: 24px; }
.type-filters { display: flex; gap: 4px; flex-wrap: wrap; }
.type-filters button { background: transparent; border: 0; padding: 8px 14px; border-radius: 12px; }
.type-filters button[aria-pressed="true"] { background: var(--text); color: var(--background); }
#result-count { font-size: .75rem; color: var(--secondary); }
#status { color: var(--secondary); font-size: .8rem; padding: 12px 0 20px; min-height: 52px; }
.layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.layout[data-view="list"] { grid-template-columns: 1fr; }
.layout[data-view="list"] #map-panel, .layout[data-view="map"] #list-panel { display: none; }
.layout[data-view="map"] { grid-template-columns: 1fr; }
#results { list-style: none; padding: 0; margin: 0; display: grid; gap: 16px; }
.layout[data-view="list"] #results { grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr)); }
.cafe-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; box-shadow: var(--shadow); }
.cafe-card:hover, .cafe-card.highlight { transform: translateY(-3px); box-shadow: 0 8px 24px #e58a2b24; border-color: var(--focus); }
.cafe-card.selected { border-color: var(--sage-text); }
.card-top { display: flex; gap: 16px; align-items: flex-start; }
.card-image { width: 112px; height: 100px; object-fit: cover; border-radius: 12px; background: var(--tint); }
.card-main { flex: 1; min-width: 0; }
.card-kicker { font-size: .72rem; text-transform: uppercase; letter-spacing: .08em; color: var(--secondary); }
.card-select { display: block; font-size: 1.1rem; line-height: 1.3; font-weight: 700; padding: 4px 0; text-align: left; background: transparent; border: 0; overflow-wrap: anywhere; }
.card-meta, .card-address { font-size: .75rem; color: var(--secondary); }
.card-address { margin-top: 6px; }
.favorite { flex-shrink: 0; width: 44px; height: 44px; border: 1px solid var(--border); background: var(--surface); border-radius: 50%; color: var(--teal-text); font-size: 1.5rem; line-height: 1; }
.favorite[aria-pressed="true"] { background: var(--teal); color: white; }
.favorite.pulse { animation: heart 240ms ease-out; }
.card-bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; border-top: 1px solid var(--border); margin-top: 16px; padding-top: 12px; }
.tag { color: var(--sage-text); background: var(--sage-tint); padding: 4px 8px; border-radius: 6px; font-size: .7rem; }
.tag.unknown { color: var(--secondary); background: var(--tint); }
.score { display: flex; align-items: center; gap: 8px; font-size: .7rem; color: var(--secondary); }
.score-ring { display: grid; place-items: center; width: 32px; height: 32px; border: 3px solid var(--border); border-radius: 50%; color: var(--secondary); }
#map-panel { position: sticky; top: 88px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); }
#map, #map-placeholder { height: 400px; }
#map-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: var(--tint); padding: 24px; }
.map-orbit { width: 96px; height: 96px; border: 1px solid var(--border); border-radius: 50%; font-size: 3.5rem; color: var(--teal-text); margin-bottom: 24px; }
#map-placeholder p { margin-top: 12px; font-size: .9rem; color: var(--secondary); }
#detail { padding: 24px; }
#detail h2 { font-size: 1.4rem; margin-bottom: 12px; }
#detail p { font-size: .85rem; margin-bottom: 8px; }
#detail small { display: block; color: var(--secondary); }
#detail a { display: inline-block; min-height: 44px; margin-top: 12px; font-size: .85rem; font-weight: 700; }
.detail-hint { color: var(--secondary); }
.study-pin { border: 0; background: transparent; }
.study-pin span { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50% 50% 50% 8px; background: #1F6F78; color: white; border: 3px solid white; box-shadow: 0 4px 12px #0003; font-size: 13px; font-weight: 700; transition: transform 180ms ease-out; }
.study-pin.highlight span { background: #E58A2B; color: #2B1D14; transform: translateY(-5px) scale(1.1); }
.leaflet-container { font-family: "DM Sans", system-ui, sans-serif; }
.leaflet-popup-content-wrapper { color: #2B1D14; background: white; }
.leaflet-control-attribution { color: #2B1D14; background: white !important; }
.leaflet-control-attribution a { color: #1F6F78; }
.leaflet-control-zoom a { min-width: 44px; min-height: 44px; line-height: 44px; }
.empty-state { padding: 48px 24px; text-align: center; border: 1px dashed var(--border); border-radius: var(--radius); }
.empty-state > span { display: block; color: var(--teal-text); font-size: 2rem; margin-bottom: 16px; }
.empty-state p { color: var(--secondary); font-size: .9rem; margin-top: 12px; }
.skeleton { height: 200px; background: linear-gradient(100deg, var(--tint) 30%, var(--surface) 50%, var(--tint) 70%); background-size: 200% 100%; border-radius: var(--radius); margin-bottom: 16px; animation: shimmer 1.3s ease-in-out infinite; }
footer { border-top: 1px solid var(--border); margin-top: 64px; padding: 32px 0; }
footer p { color: var(--secondary); margin: 8px 0 20px; font-size: .85rem; }
footer small { color: var(--secondary); }
.toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--text); color: var(--background); border-radius: 12px; padding: 12px 24px; box-shadow: var(--shadow); z-index: 1100; max-width: calc(100% - 32px); }
.skip-link { position: absolute; top: -100px; left: 16px; z-index: 1200; background: var(--surface); padding: 12px; }
.skip-link:focus { top: 12px; }
.reveal { animation: reveal 240ms ease-out; }
@keyframes reveal { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes heart { 50% { transform: scale(1.15); } }
@keyframes shimmer { to { background-position: -200% 0; } }
@media (max-width: 900px) {
  .hero { gap: 24px; } .search-bar { grid-template-columns: 1fr 1fr; } .primary-button { grid-column: 1 / -1; }
  .layout { grid-template-columns: 1fr; } #map-panel { position: static; } .card-image { width: 100px; }
  .hero-art span { letter-spacing: .08em; }
}
@media (max-width: 560px) {
  main { padding: 0 16px; } .navigation { padding: 12px 16px; } .nav-actions { gap: 6px; }
  .hero { grid-template-columns: 1fr; padding: 32px 0; } .hero-art { display: none; }
  h1 { font-size: 2.7rem; } .desktop-break { display: none; }
  .search-bar { grid-template-columns: 1fr; gap: 16px; padding: 20px; }
  .distance-control { padding: 16px 0 0; border-left: 0; border-top: 1px solid var(--border); }
  .search-caption { flex-wrap: wrap; gap: 0; padding-top: 12px; }
  .results-heading { align-items: flex-start; flex-direction: column; }
  .results-toolbar { align-items: flex-start; flex-direction: column; gap: 8px; }
  .card-top { gap: 10px; flex-wrap: wrap; } .card-image { width: 76px; height: 88px; }
  .favorite { width: 44px; } .card-main { min-width: 100px; }
  .card-select { font-size: 1rem; } #map, #map-placeholder { height: 320px; }
  .wordmark { font-size: 1.05rem; } .brand-icon { margin-right: 6px; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
}

#area-controls { padding: 16px; background: var(--tint); }
#area-controls p { font-size: .8rem; margin-bottom: 12px; }
#notes-dialog { width: min(520px, calc(100% - 32px)); max-height: 85vh; overflow: auto; background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
#notes-dialog::backdrop { background: #1b141077; }
#notes-dialog p { margin: 12px 0; }
#notes-fields label { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin: 12px 0; }
#notes-fields select { min-height: 44px; padding: 8px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text); font: inherit; }
#notes-fields select:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }

.venue-facts { display: grid; grid-template-columns: auto minmax(0,1fr); gap: 12px 16px; padding: 16px 0; border-top: 1px solid var(--border); }
.venue-facts dt { font-weight: 700; font-size: .8rem; }
.venue-facts dd { margin: 0; font-size: .8rem; overflow-wrap: anywhere; white-space: pre-wrap; }
#detail .venue-facts a { margin: 0; font-size: .8rem; }
.venue-photo { margin: 20px 0 0; }
.venue-photo img { width: 100%; height: auto; border-radius: 12px; }
.venue-photo figcaption { color: var(--secondary); font-size: .75rem; overflow-wrap: anywhere; }
#detail .venue-photo a { font-size: inherit; min-height: 44px; }

```

## app.js

```javascript
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

```

## ui.js

```javascript
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

```

## details.js

```javascript
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

```

## config.js

```javascript
// Public services for modest usage. Follow their usage policies.
export const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
export const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

```

## assets/cafe-scene.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="340" viewBox="0 0 480 340">
<rect width="480" height="340" rx="32" fill="#f1e7da"/>
<path d="M70 238V104a84 84 0 01168 0v134" fill="#d9e4d6"/>
<path d="M154 24v214M70 132h168" fill="none" stroke="#faf6f0" stroke-width="10"/>
<path d="M88 229l36-80 26 36 28-53 43 97" fill="#93ad90" opacity=".5"/>
<ellipse cx="256" cy="290" rx="176" ry="22" fill="#dbc7ad"/>
<path d="M75 249h346v19H75z" fill="#b77c4a"/>
<path d="M98 268h12v72H98zm289 0h12v72h-12z" fill="#89664b"/>
<path d="M153 239l-15-84h121l17 84" fill="#405e58"/>
<path d="M147 165h103l11 64h-103z" fill="#b3c6b9"/>
<path d="M139 239h154v8H139z" fill="#2b463f"/>
<path d="M185 187h39m-35 12h29m-27 12h18" stroke="#f4f4e9" stroke-width="4" stroke-linecap="round"/>
<path d="M316 207h21a12 12 0 010 24h-15" fill="none" stroke="#e58a2b" stroke-width="9"/>
<path d="M287 195h39v37a17 17 0 01-39 0z" fill="#e58a2b"/>
<ellipse cx="306" cy="195" rx="20" ry="6" fill="#6b4632"/>
<ellipse cx="307" cy="247" rx="32" ry="4" fill="#e6d4bc"/>
<path d="M298 177q-10-10 0-21m15 21q-10-10 0-21" fill="none" stroke="#faf6f0" stroke-width="4" stroke-linecap="round"/>
<path d="M366 249l-7-51h39l-8 51" fill="#d0a77b"/>
<path d="M379 199v-51" stroke="#456953" stroke-width="4"/>
<path d="M379 183q-40-5-27-34 27 1 27 34m0-17q36-1 25-30-25 3-25 30m0-13q-22-14-10-34 19 10 10 34" fill="#5f8f6e"/>
<path d="M90 244h45v5H90z" fill="#f7e5b8"/>
</svg>

```

