# Signal Scout - scout public radio signal anywhere!

Ham and GMRS repeaters in one map! Signal Scout aims to reduce time and effort required for radio users to select their loadout.

![Signal Scout Demo](./signal_scout_demo.gif)

## Overview

Outdoor enthusiasts use handheld radios to communicate with friends, family, or even emergency services. Their tools of choice are often FRS, GMRS, or Ham radios. Although the latter two options require an FCC license to transmit, they enable operators to use repeaters, significantly increasing the transmission range of a low-power handheld radio.

Signal Scout displays both Ham and GMRS repeater locations, so operators can choose their loadout accordingly.

Signal Scout fetches open source Ham and GMRS repeater data and displays it on a Leaflet map. Each marker represents a repeater, with details shown in a popup when clicked.

## Repeater Frequencies / Bands
Signal Scout currently only includes VHF, UHF, GMRS, and digital repeater information. Repeaters operating on any other band are not included (HF). Approximate frequencies for repeaters in Signal Scout are below.
  - Digi = 145 Mhz (digital packet repeaters)
  - VHF = 146 Mhz
  - UHF = 440 Mhz
  - GMRS = 462 Mhz


## Data Sources
- Levine Central API (ham repeaters)
  - https://www.levinecentral.com/repeaters/repeater_fetch.php
- MyGMRS API (GMRS repeaters)
  - https://api.mygmrs.com/repeaters
- Packet Radio Map (geoserver for digipeaters)
  - https://geo.packetradiomap.com/geoserver/web/


KQ4PTJ, 73!