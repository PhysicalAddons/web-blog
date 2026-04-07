+++
title = "Real orbit precision of celestial objects"
author = "Davide Ebner"
date = "2026-04-07"
description = "How we implemented real orbital calculaion for celestial objects."
tags = [
    "Blender",
    "Atmosphere²",
    "shader",
    "Moon",
]
+++

At the beginning, we tried a simplified approximation using the shader.
The movement of celestial objects in the sky worked well but once we checked the accuracy, the system broke down.

The precision of this system was.. wildly inaccurate, we realized when we cross-checked with predictions of [future eclipses](https://science.nasa.gov/eclipses/future-eclipses).

The next attempt was to implement a system used by NASA, ("Ephemeris")[https://ssd.jpl.nasa.gov/glossary/ephemeris.html] which defines the movement of an orbiting body with high time- and positional precision, stored in a LUT with a storage range of 800 to 2200 years, but it was heavy and could break over longer time periods.

"Naaaah - I want something more stable." - Mārtiņš

He found [VSOP/ELP](https://en.wikipedia.org/wiki/VSOP_model), which calculates rotations and positions in an analytical way,
rather than storing data.

"That is when I realized that moon is really hard to get right as it is not just rotating around the world - [it is rotating also around the sun](https://www.youtube.com/watch?v=KBcxuM-qXec)"

At that point, Mārtiņš realized that "MOON IS DIFFICULT", but the best implementation to calculate a satellite would be VSOP/ELP.
