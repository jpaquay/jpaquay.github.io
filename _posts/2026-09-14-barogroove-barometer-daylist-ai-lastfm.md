---
layout: post
title: "Barogroove: When Barometric Pressure Meets years of Scrobbles"
subtitle: "Weekend tinkering between espresso pots and rainy Brussels skies: building an atmospheric AI Daylist forge with Vertex AI Gemini 2.5 Flash, BigQuery, and street-art geo-caches."
date: 2026-09-14
cover-img: /assets/img/posts/2026-09-14-barogroove-hero.webp
thumbnail-img: /assets/img/posts/2026-09-14-barogroove-hero.webp
share-img: /assets/img/posts/2026-09-14-barogroove-01-sonic-forge.webp
tags: [jerome-paquay, music, 2020s, software-engineering]
readtime: true
---

Some weekends simply hit every single note.

On Saturday, I stood pitchside at **Royal White Star HC** cheering on my son's field hockey team as they battled through the wet turf to a **4-2 victory**. On Sunday, it was my turn to lace up the shoes away at **Mechelen HC**—where my own team ground out a tight **1-2 win**. Two matches, two victories, sore calves, muddy shinguards, and that unbeatable post-game clubhouse buzz.

And in the quiet windows between Saturday's final whistle, Sunday's warm-up, and a bottomless moka pot of dark roast coffee? I finally sat down and shipped a fun weekend tinkering experiment: **Barogroove** (<a href="https://bg.netdev.be" target="_blank" rel="noopener">bg.netdev.be</a>) — a barometer-induced AI Daylist maker seeded by years of Last.fm scrobbles. The Python source code is up on GitHub at <a href="https://github.com/jpaquay/myshippedpy" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 5px; font-weight: 600;"><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" style="vertical-align: text-bottom;"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>jpaquay/myshippedpy</a>.

---

## 1. Why Weather + Scrobbles? (The Brussels Hypothesis)

If you live in Belgium, you learn early on that human mood is governed by two things: the quality of the coffee in your hand and the **barometric pressure (`hPa`)** outside your window.

Streaming platforms have tried to crack dynamic playlists for years. Spotify's *Daylist* is clever, but its time-of-day heuristics (*"tuesday afternoon goblin core indie"*) miss the meteorological reality of the sky. A crisp, high-pressure `1028 hPa` winter morning calls for a completely different acoustic geometry than a falling barometer right before a late-summer storm front rolls across Brussels.

More importantly, generic AI music tools suffer from **amnesia**: they hallucinate recommendations from a generic global average instead of respecting your actual lifelong musical DNA. I didn't want a chatbot guessing what "rainy music" sounds like; I wanted an engine seeded directly by **my own 160,717 Last.fm scrobbles** logged between 2012 and 2026.

---

## 2. The Atmospheric Sonic Forge: Street-Art Geo-Caches & Genre Corridors

![Barogroove Atmospheric Sonic Forge UI showing Parcours BD Brussels, weather themes, and Genre Corridor sliders](/assets/img/posts/2026-09-14-barogroove-01-sonic-forge.webp)

When you open the app, you don't pick a generic genre. You step into the **Atmospheric Sonic Forge**:

1. **World Street-Art Geo-Caches (Tap to Teleport)**: Instead of sterile city codes, Barogroove anchors its live weather telemetry (`Google Weather API`) to iconic global street-art corridors. With one click, you can teleport your barometer between:
   - 🎨 **Parcours BD Comic Strip Trail (Brussels)** — *Home turf: Gabled Brussels facades celebrating Franco-Belgian ligne claire art (`Hergé, Franquin, Bonom & Brussels muralists` | `#new-beat #ebm #ethio-jazz #electronic-chanson`)*
   - 🧱 **East Side Gallery (Berlin)** — *1.3 km open-air monument along the Spree*
   - 巷 **Hosier Lane (Melbourne)**
   - 🌴 **Wynwood Walls (Miami)**
   - 🇧🇷 **Beco do Batman (São Paulo)**
   - 🏮 **Shimokitazawa (Tokyo)**
2. **Cross Two Axes (Theme × Genre Corridor)**: *"The sky picks the mood. You pick the vocabulary."*
   - **Weather Themes**: Choose between **Petrichor**, **Golden Hour**, **Nordic Fog**, **Storm Front**, **Heatwave Cruise**, **Blue Hour**, **First Frost**, or **Sirocco**.
   - **Genre Corridors (`±25% Band`)**: Fine-tune the sonic spectrum across eight curated corridors—**Krautrock** (*Motorik pulse, patient repetition*), **Ambient** (*Space before notes*), **Dub** (*Bass and the room it echoes in*), **Post-punk** (*Tight, cold, wiry*), **Modern classical** (*Strings and restraint*), **Jazz** (*Conversation, not consensus*), **Techno** (*Machines keeping time*), and **Folk** (*One voice, weather-worn*).

---

## 3. Spinning the Set: Slowcore & Lo-Fi for a Storm Front (& Surviving HTTP 429s)

![Barogroove Barometric Daylist generated for Parcours BD Brussels showing 18 tracks and graceful M3U fallback](/assets/img/posts/2026-09-14-barogroove-02-daylist-set.webp)

Here is what happens when you point Barogroove at the **Parcours BD Comic Strip Trail in Brussels** under a **Storm Front (`-0.7 hPa/6h`)**:

The engine synthesizes an 18-track set titled:
> **`slowcore & lo fi afternoon — storm front daylist at 125 BPM under a steady barometer`**  
> *The barometer is in free fall. Turn it up.* (`#slowcore #lo fi #space rock #sparse #tape #melancholy`)

Look at that opening 5-track sequence on the **In-App Soundtrack Deck**:
1. **Duster** — *Constellations* (*Stratosphere*)
2. **Talk Talk** — *New Grass*
3. **Sunn O)))** — *Big Church*
4. **Tinariwen** — *Sastanaqqam*
5. **Slowdive** — *Souvlaki Space Station*

From Duster's lo-fi slowcore to Talk Talk's post-rock, Sunn O))) drone metal cathedral chords, Tinariwen desert blues, and Slowdive shoegaze—all locked to a 125 BPM storm-front pulse.

**Weekend Engineering Lesson — Graceful Degradation & Transparency:** Notice two details in the screenshot above. First, when Spotify's Web API throws a classic `HTTP 429 (Too Many Requests)` rate-limit, Barogroove automatically writes an **annotated M3U playlist file (18 tracks, 1h40m45s)** with track-by-track AI reasoning embedded inside the file comments, alongside instant one-click links to play on **Spotify** or **YouTube Music**. Second, if a requested theme parameter degrades or falls back to live sky telemetry (`Theme degraded: unknown theme 'clear_high'; sky picked instead`), the UI surfaces it transparently.
{: .box-note}

---

## 4. 160,717 Scrobbles in BigQuery: What My Musical Almanac Says About Me

![Barogroove Data Viz tab querying 160,717 Last.fm scrobbles across weather themes](/assets/img/posts/2026-09-14-barogroove-03-dataviz-almanac.webp)

Because I couldn't resist connecting my listening history to **BigQuery** and **Vertex AI (`gemini-2.5-flash`)**, I built a conversational **Data Viz** tab where you can query your entire musical almanac in plain English—and inspect the exact SQL query the agent ran.

Across **160,717 synced plays (2012–2026)** with a play-weighted average tempo of **104.6 BPM**, my **Atmospheric Weather Affinity Breakdown** reveals my true French/Belgian musical soul:

| Weather Regime | Share (Scrobbles) | Avg Tempo | Dominant Artist in My Almanac |
| :--- | :--- | :--- | :--- |
| **Warm Front Haze & Analog Drift** | **15.6%** (25,090 plays) | 101 BPM | 🎸 **Georges Brassens** |
| **Petrichor & Rain Front** | **15.2%** (24,376 plays) | 102 BPM | 🎸 **Georges Brassens** |
| **High-Pressure Glass & Nocturne** | **14.7%** (23,687 plays) | 103 BPM | 🎸 **Georges Brassens** |
| **Clearing Isobar & Horizon Breeze** | **14.1%** (22,682 plays) | 106 BPM | 🌿 **Tryo** |
| **Low-Pressure Storm Front** | **14.0%** (22,439 plays) | 110 BPM | 🎧 **Chinese Man** |
| **Golden Hour Ridge & Twilight** | **13.7%** (21,942 plays) | 105 BPM | 🌿 **Tryo** |
| **Steady Drizzle & Velvet Mist** | **12.8%** (20,501 plays) | 104 BPM | 🎧 **Chinese Man** |

The verdict is statistically indisputable: when the barometer is calm or hazy, I am a **Georges Brassens** purist; when the breeze clears the horizon, **Tryo** takes over; and when a low-pressure storm front or steady Belgian drizzle hits the windowpane, it's **Chinese Man** trip-hop grooves all evening.

---

## 5. Conversational Sonic Assistant & 24-Hour Chronology

![Barogroove Data Viz full view showing 24-hour chronology and floating conversational AI assistant](/assets/img/posts/2026-09-14-barogroove-04-ai-telemetry-inspector.webp)

Scrolling down the Data Viz dashboard reveals my **24-Hour Chronology**—where listening activity climbs steadily through the afternoon before peaking at **19:00 UTC (11,072 plays, 87% activity)**.

And tucked into the bottom-right corner is the **Conversational AI Assistant** (with voice and text input), ready to bridge weather telemetry and your catalog on the fly:
- *"Take me somewhere it is raining"*
- *"What does the sky sound like here?"*
- *"Forge me something for this weather"*

Crucially, as the assistant notes: *"Anything that changes your library is shown to you first."*

Not bad for forty-eight hours fueled by espresso and two field hockey wins. Feel free to teleport your own barometer to a favorite street-art wall or check out the Python code on GitHub!

---

## Interactive Gallery: Inside Barogroove

Browse the artwork and full-resolution UI screenshots from the weekend build below:

<style>
.bg-carousel-container {
  position: relative;
  max-width: 880px;
  margin: 2.5rem auto;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.32);
  background: #0b111e;
  border: 1px solid rgba(56, 189, 248, 0.2);
}
.bg-carousel-slide {
  display: none;
  width: 100%;
  animation: bgFade 0.5s ease-in-out;
}
.bg-carousel-slide.active {
  display: block;
}
@keyframes bgFade {
  from { opacity: 0.35; }
  to { opacity: 1; }
}
.bg-carousel-slide img {
  width: 100%;
  height: 520px;
  object-fit: contain;
  background: #060911;
  display: block;
  margin: 0;
}
.bg-carousel-caption {
  padding: 1.1rem 1.5rem;
  background: linear-gradient(180deg, rgba(11, 17, 30, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
  color: #f1f5f9;
  font-size: 0.95rem;
  line-height: 1.5;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.bg-carousel-btn {
  position: absolute;
  top: 44%;
  transform: translateY(-50%);
  background: rgba(15, 23, 42, 0.78);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}
.bg-carousel-btn:hover {
  background: rgba(2, 132, 199, 0.9);
  color: #ffffff;
  transform: translateY(-50%) scale(1.08);
}
.bg-carousel-btn.prev { left: 16px; }
.bg-carousel-btn.next { right: 16px; }
.bg-carousel-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0.75rem 1rem 1rem;
  background: #0f172a;
}
.bg-carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.28);
  cursor: pointer;
  transition: all 0.25s ease;
}
.bg-carousel-dot.active {
  background: #38bdf8;
  transform: scale(1.25);
}
@media (max-width: 640px) {
  .bg-carousel-slide img { height: 320px; }
}
</style>

<div class="bg-carousel-container" id="bgCarousel">
  <div class="bg-carousel-slide active">
    <img src="/assets/img/posts/2026-09-14-barogroove-hero.webp" alt="Barogroove Sonic Barometer and Vinyl Turntable in Brussels Studio" loading="lazy" />
    <div class="bg-carousel-caption">
      <strong>1 / 5 — The Barogroove Concept</strong>: Merging analog barometric pressure, espresso-fueled weekend coding, and vinyl audiophile curation.
    </div>
  </div>
  <div class="bg-carousel-slide">
    <img src="/assets/img/posts/2026-09-14-barogroove-01-sonic-forge.webp" alt="Barogroove Atmospheric Sonic Forge UI" loading="lazy" />
    <div class="bg-carousel-caption">
      <strong>2 / 5 — Atmospheric Sonic Forge</strong>: Teleporting across global street-art geo-caches (Parcours BD Brussels, East Side Gallery Berlin) with 8 Weather Themes and 8 Genre Corridor sliders.
    </div>
  </div>
  <div class="bg-carousel-slide">
    <img src="/assets/img/posts/2026-09-14-barogroove-02-daylist-set.webp" alt="Barogroove Barometric Daylist Set for Parcours BD Brussels" loading="lazy" />
    <div class="bg-carousel-caption">
      <strong>3 / 5 — Storm Front Daylist Set (125 BPM)</strong>: Slowcore & lo-fi afternoon set for Parcours BD Brussels featuring Duster, Talk Talk, Sunn O))), Tinariwen, and Slowdive + annotated M3U export.
    </div>
  </div>
  <div class="bg-carousel-slide">
    <img src="/assets/img/posts/2026-09-14-barogroove-03-dataviz-almanac.webp" alt="Barogroove Data Viz and BigQuery Almanac Analysis" loading="lazy" />
    <div class="bg-carousel-caption">
      <strong>4 / 5 — 160,717 Scrobbles in BigQuery</strong>: Plain-language BigQuery agent analyzing 14 years of Last.fm history across weather regimes (Georges Brassens, Tryo, and Chinese Man leading the pack).
    </div>
  </div>
  <div class="bg-carousel-slide">
    <img src="/assets/img/posts/2026-09-14-barogroove-04-ai-telemetry-inspector.webp" alt="Barogroove 24-Hour Chronology and Conversational AI Assistant" loading="lazy" />
    <div class="bg-carousel-caption">
      <strong>5 / 5 — 24-Hour Chronology & Voice/Chat Assistant</strong>: Daily scrobble activity peaking at 19:00 UTC alongside the interactive AI assistant drawer.
    </div>
  </div>

  <button class="bg-carousel-btn prev" onclick="moveBgSlide(-1)" aria-label="Previous slide">&#10094;</button>
  <button class="bg-carousel-btn next" onclick="moveBgSlide(1)" aria-label="Next slide">&#10095;</button>

  <div class="bg-carousel-dots">
    <span class="bg-carousel-dot active" onclick="setBgSlide(0)"></span>
    <span class="bg-carousel-dot" onclick="setBgSlide(1)"></span>
    <span class="bg-carousel-dot" onclick="setBgSlide(2)"></span>
    <span class="bg-carousel-dot" onclick="setBgSlide(3)"></span>
    <span class="bg-carousel-dot" onclick="setBgSlide(4)"></span>
  </div>
</div>

<script>
(function() {
  let currentBgIndex = 0;
  const container = document.getElementById('bgCarousel');
  if (!container) return;
  const slides = container.querySelectorAll('.bg-carousel-slide');
  const dots = container.querySelectorAll('.bg-carousel-dot');

  window.showBgSlide = function(index) {
    if (index >= slides.length) currentBgIndex = 0;
    else if (index < 0) currentBgIndex = slides.length - 1;
    else currentBgIndex = index;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentBgIndex));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentBgIndex));
  };

  window.moveBgSlide = function(step) {
    window.showBgSlide(currentBgIndex + step);
  };

  window.setBgSlide = function(index) {
    window.showBgSlide(index);
  };
})();
</script>
