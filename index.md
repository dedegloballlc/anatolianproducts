
---
title: Home
description: Discover fast, curated picks. One clean click to Amazon.
---

<section class="hero">
  <div class="card">
    <div class="kicker">Featured</div>
    <h1>Middle Eastern & Anatolian Picks</h1>
    <p>Hand-selected coffee, kitchen, and wellness products for U.S. shoppers. No fluff. Just quality.</p>
    <form id="sform" class="search" role="search" aria-label="Site search">
      <input name="q" type="search" placeholder="Search coffee, cezve, spices..." aria-label="Search">
      <button type="submit">Search</button>
    </form>
    <div class="notice" style="margin-top:10px">Replace <code>?tag=YOURTAG-20</code> with your Associates tag.</div>
  </div>
  <div class="grid">
    {% include card.html
       kicker="Coffee"
       title="Best Turkish Coffee Beans"
       image="https://images.unsplash.com/photo-1512568400610-62da28bc8a13"
       pros="Rich aroma; Fresh roast; Authentic taste"
       url="https://www.amazon.com/dp/ASIN?tag=YOURTAG-20" %}

    {% include card.html
       kicker="Kitchen"
       title="Handmade Copper Cezve"
       image="https://images.unsplash.com/photo-1604928141026-3118c8f7d9bf"
       pros="3–4 cups; Solid handle; Traditional"
       url="https://www.amazon.com/dp/ASIN?tag=YOURTAG-20" %}
  </div>
</section>

<section class="section">
  <h2>Quick Lists</h2>
  <div class="grid">
    {% include card.html
       kicker="List"
       title="Top Turkish Coffee Brands"
       image="https://images.unsplash.com/photo-1504639725590-34d0984388bd"
       pros="Balanced; Bold; Budget"
       url="{{ '/categories/coffee-tea/' | relative_url }}" %}

    {% include card.html
       kicker="Compare"
       title="Cezve vs. Electric Maker"
       image="https://images.unsplash.com/photo-1514511542213-1d86c3c1c651"
       pros="Control; Speed; Foam"
       url="{{ '/categories/coffee-tea/#compare' | relative_url }}" %}
  </div>
</section>
