+++
title = "Polarised light and thin-film interference"
author = "Martins Upitis"
date = "2022-05-12"
description = "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
tags = [

]
+++
# 002 Polarised light and thin-film interference

Last day before I take my time off work and I spent it tinkering with car headlights again!
This time I am exploring polarised light and thin-film interference on a transparent body in Blender. 

Thank you

[@KarolMiklas](https://twitter.com/KarolMiklas)

for car model! Beautiful work as always. 

![Untitled](/blog/images/Untitled.png)

![Untitled](/blog/images/Untitled 1.png)

![Untitled](/blog/images/Untitled 2.png)

![Untitled](/blog/images/Untitled 3.png)

Polarised light and Thin-film interference are not the same in terms of physics. One is caused by injection moulding of the plastic, other - by a very thin layer of material on the surface of another material. Both offer similar looks, so I use the same technique to model it.

![Untitled](/blog/images/Untitled 4.png)

Here are two real-world examples. ‘Colorisation’ on the headlights are caused by polarisation while on windshield - by a defrosting coating. Most people, including me, mixes these, so for an artist like me, a single approach to tackle both problems, is working just fine!

![Untitled](/blog/images/Untitled 5.png)

![Untitled](/blog/images/Untitled 6.png)

Mostly thin-film interference is a beautiful accident caused by an oily cleaning liquid or gasoline (in puddles), but if used on purpose, you can have very effective light blocking sunglasses or obnoxious car headlights. Also those anti-glare coatings on lenses work this way.

![Untitled](/blog/images/Untitled 7.png)

[https://www.notion.so](https://www.notion.so)

Before I move on to ‘praxis’ part. I just want to establish some theory before, so you learn something too. I will keep it simple.

Also, this is a work in progress. I don’t know everything, I’m learning on the go. So if you know things about the topic, please correct me.

**I’ll start with light polarisation.**
As I mentioned, it is an inevitable side-effect of moulding. It reveals the flow of liquid plastic and high tension points in the structure. It can easily be seen with a polarisation filter and any plastic object in your household.

![Untitled](/blog/images/Untitled 8.png)

Polarisation difference from thin-film interference (TFI) is that the ‘colorisation’ is not in reflected light, but happens during transmittance. It makes the colouring look less vibrant than of TFI and can filter out the light completely.

[https://twitter.com/i/status/1474160326090362882](https://twitter.com/i/status/1474160326090362882)

Why we can see it with naked eye on some car headlights? My guess is that car manufacturers use polarised coating to filter light from projectors, but as a result - reveal the imperfections in the glass body. Perhaps also glass is polarising itself at some angles. Thoughts?

![Untitled](/blog/images/Untitled 9.png)

Thin-film interference is more straightforward. It is a very thin ‘film’ of transparent material with a different density (and IOR) than the material it in contact with. The layer is so thin that light waves start ‘glitching’ from the phase change from surface reflections.

![Untitled](/blog/images/FHVIiDWXwAAG2tQ.jpg)

Now we know a little more about the mechanics behind both effects, but I bet it does not help you replicate the effect now by yourself. And it is not really trivial too.
Luckily smart people have figured it out before me and I can just take their findings and adapt for my needs.

Et Voilà, here it is! After many tries with different shader based procedural approaches, I have found that LUT technique is the fastest and most accurate. I used the method from the awesome thread by

[@amandaghassaei](https://twitter.com/amandaghassaei)

**So how do you use that rainbow-y LUT texture in Blender?**

That LUT is a plot of soap bubble TFI where horizontal (x) axis is film thickness in nanometres (1-2500 nm) and vertical (y) axis represent view (incident) angle.

- download this LUT
- drop into shader Node editor and set to linear (?)
- add ‘combine XYZ’ node and connect it to the texture ‘Vector’ input.
- in ‘X’ slot goes the ‘thickness’ value from 0.0 to 1.0
- in ‘Y’ slot - Dot product of surface Normal and View Vectors.

![Untitled](/blog/images/Untitled 10.png)

I forgot to mention that the apparent thickness of ‘film’ changes based the view angle of the surface. That’s why we need also ‘incident’ angle input on top of the ‘thickness’.
That’s what makes the iconic color shift at grazing angles.

![Untitled](/blog/images/Untitled 11.png)

- Add three shaders ‘Refraction BRDF’, ‘Glossy BRDF’ and a ‘MIX Shader’.
- Add a Fresnel node and connect to ‘Mix Shader’ factor.
- Connect Refraction to upper and Glossy to lower shader inputs in ‘Mix shader’ node.
- make sure ‘roughness’ for both shaders is 0 ir close to it.

for thin-film interference - attach the LUT output to ‘Glossy BRDF’ Color input and for polarised light effect - to ‘Refracfion BRDF’ Color input.

For Eevee make sure SSR is enabled in render settings and Refraction is ticked in material settings and ssr depth is close to 0.

This will stay in written form till I get to PC, then I’ll snap a shot of node setup.

Meanwhile I have these.

left - film thickness low
mid - film thickness ~400nm
right - film thickness modulated with regular Blender 3D noise

![Screenshot 2022-08-22 at 12.08.34.png](/blog/images/Screenshot_2022-08-22_at_12.08.34.png)
