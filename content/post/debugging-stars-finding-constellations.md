+++
title = "Debugging Stars, Finding Constellations"
author = "Davide Ebner"
date = "2026-04-07"
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
It is not an image overlay, but renders a graphical overlay of connections that are based on a database.

![Untitled](/blog/images/debugging_stars/constellations.png)
