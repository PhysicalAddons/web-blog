+++
title = "Debugging Stars, Finding Constellations"
author = "Davide Ebner"
date = "2026-04-02"
description = "How we went from a debugging overlay to a cool feature implementation"
tags = [
    "Blender",
    "Atmosphere²",
    "shader",
    "stars",
    "debug".
]
+++

A more unintended feature is, that Physical Atmosphere² can now show real constellations in the sky.
I hear you asking "But why-?".

We had to validate that the stars are *actually* correctly aligned and properly visible.
As seen in the earlier [blog post about the stars themselves](https://www.physicaladdons.com/blog/post/sharp-stars-at-every-zoom-level/), the stars *look* pretty cool, but they should also make sense.
Especially, when viewing from the location of a real place on earth. If it does not align, people would notice.
Eyeballing and estimating would just be cheating.

So out of the necessity to debug the stars, we added a viewport-only overlay of all constellations.
It is not an image overlay, but renders connections that are based on a database.
This eliminates resolution limitations and keeps the overlay crisp.

![Untitled](/blog/images/debugging_stars/constellations.png)

But thanks to this, we realized that our sky was flipped..
The overlay is currently drawn at the same distance as the sun, we encountered severe precision issues with darther distances.

With a new found obsession with overlays, we implemented some quality of life features to make it easier than ever to keep the overview of the sky.

Note that there are no other planets added to the scene yet, so there is no orbital data to properly draw the overlays.

![Untitled](/blog/images/debugging_stars/all.png)
