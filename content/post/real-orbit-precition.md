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

In the beginning, we tried a simplified approximation using shaders.
The movement of celestial objects in the sky worked well but once we checked the accuracy, the system broke down.
Our goal was to get realistic results that reflect the exact and real position of objects in the sky at a given time and date.

The precision of this system was.. wildly inaccurate, we realized when we cross-checked with predictions of [future eclipses](https://science.nasa.gov/eclipses/future-eclipses).

The next attempt was to implement a system used by NASA, "Ephemeris" which defines the movement of an orbiting body with high time- and positional precision, stored in a Table or LUT with a storage range of 800 to 2200 years, but it was heavy and could break over longer time periods.

"Naaaah - I want something more stable." - Mārtiņš

He found [VSOP/ELP](https://en.wikipedia.org/wiki/VSOP_model), which calculates rotations and positions in an analytical way,
rather than storing data.

"That is when I realized that moon is really hard to get right as it is not just rotating around the world - [it is rotating also around the sun](https://www.youtube.com/watch?v=KBcxuM-qXec)"

At that point, Mārtiņš realized that "MOON IS DIFFICULT", but the best implementation to calculate a satellite would be VSOP/ELP.

We moved the new calculation method to Phython, as it is more straightforward to implement and debug.

Now, eclipses line up perfectly within a meter of precision and look as expected for past and future eclipses.
It perfectly ties together the 3D-spherical celestial objects and allows the recreation of beautiful solar- and moon eclipses!

<img width="512" height="512" alt="eclipse" src="https://github.com/user-attachments/assets/4601d677-9062-4c85-951f-e722a4cf0703" />
