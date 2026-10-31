# Prompts : trois vidéos « viviers » pour l'accueil

Trois vidéos courtes pour les espaces premium de l'accueil : le hero qui défile et le bloc « Vous visez votre prochaine mission ». Chacune montre un des trois niveaux de profils annoncés sur le site : **opérateurs**, **techniciens**, **ingénieurs et encadrement**.

Les prompts sont en anglais, la langue qui donne les meilleurs résultats avec les générateurs vidéo (Veo, Sora, Runway, Kling). Copiez-collez le bloc complet : prompt, puis prompt négatif s'il est pris en charge.

## Réglages communs (à indiquer dans l'outil)

| Réglage | Valeur |
|---|---|
| Format | 16:9, 1920 × 1080 minimum (4K si disponible) |
| Durée | 8 à 10 s, boucle propre : la dernière image doit pouvoir enchaîner sur la première |
| Son | aucun |
| Cadence | 24 ou 25 i/s |
| Texte, logo, sous-titres | aucun, le texte du site s'affiche par-dessus |

**Zone de texte** : le titre du site s'affiche en bas à gauche. Chaque prompt garde donc le tiers inférieur gauche calme et sombre, sans visage ni détail important.

## Style commun (déjà inclus dans chaque prompt)

Le style visé est un documentaire cinéma haut de gamme :
- lumière naturelle dorée ou fin de journée ;
- mouvements de caméra lents et stables (travelling, dolly) ;
- faible profondeur de champ, grain fin ;
- étalonnage chaud et sobre, aux tons terre, ocre, noirs profonds et touches d'orange rappelant la charte (#F15A29).

Les personnes sont des professionnels guinéens dignes et compétents, filmés au travail, jamais en pose publicitaire.

---

## Vidéo 1 : Opérateurs, sur le terrain

Fichier : `viviers-operateurs.mp4`

```
Cinematic documentary shot, golden hour, at a large open-pit bauxite mine in Guinea with red-ochre earth and terraced benches. A West African heavy-equipment operator in his thirties, wearing a clean orange high-visibility vest, white hard hat and safety glasses, climbs the steps of a large mining haul truck and settles confidently into the cab, then glances at the horizon. Slow, steady dolly movement from low angle to eye level. Shallow depth of field, warm natural light, fine film grain, rich ochre and deep shadow tones, subtle orange accents. Calm, dignified, focused atmosphere. Dust particles glowing in the backlight. Keep the lower-left third of the frame dark and uncluttered for overlaid text. Seamless loop, no text, no logos, no brand names. 16:9, photorealistic, 4K.
```

## Vidéo 2 : Techniciens, maintenance et précision

Fichier : `viviers-techniciens.mp4`

```
Cinematic documentary shot inside an industrial power station in Guinea, late afternoon light streaming through high windows. A West African woman electrical technician in her late twenties, wearing a navy work uniform, white hard hat with safety glasses and insulated gloves, carefully checks readings on an industrial control panel, then tightens a connection with a precision tool. Close-up details of hands and instruments alternating with a medium shot of her focused face. Very slow lateral tracking shot. Shallow depth of field, warm highlights against deep shadows, fine film grain, subtle orange reflections on metal. Atmosphere of expertise, safety and calm concentration. Keep the lower-left third of the frame dark and uncluttered for overlaid text. Seamless loop, no text, no logos, no brand names. 16:9, photorealistic, 4K.
```

## Vidéo 3 : Ingénieurs et encadrement, pilotage du projet

Fichier : `viviers-encadrement.mp4`

```
Cinematic documentary shot at a large infrastructure construction site near the port of Conakry, Guinea, at sunset, cranes and steel structures softly silhouetted against a warm sky. A small team of three West African professionals — a senior site engineer in a white hard hat holding a tablet, a woman project manager and a supervisor in an orange high-visibility vest — review plans together, point toward the structure, then walk side by side toward the site. Slow, steady push-in camera movement, slightly low angle to convey leadership. Shallow depth of field, golden backlight, fine film grain, deep blacks with orange highlights. Confident, professional, collaborative atmosphere. Keep the lower-left third of the frame dark and uncluttered for overlaid text. Seamless loop, no text, no logos, no brand names. 16:9, photorealistic, 4K.
```

## Prompt négatif (commun aux trois)

```
text, subtitles, watermark, logo, brand names, company names on clothing or vehicles, cartoon, 3D render look, oversaturated colors, fast cuts, shaky handheld camera, fisheye, distorted hands, extra fingers, deformed faces, smiling at camera, posed stock-photo look, missing safety equipment, unsafe behavior, cluttered frame, low resolution
```

---

## Après la génération

1. **Relecture** : écarter toute vidéo qui montre
   - des mains ou des visages déformés ;
   - des EPI incohérents (casque absent, gilet mal porté) ;
   - un geste dangereux ;
   - un logo ou du texte apparu malgré tout.
2. **Compression**, une commande par fichier (2,5 Mo maximum) :
   ```
   ffmpeg -i source.mp4 -an -vf scale=1920:-2 -c:v libx264 -crf 27 -preset slow -movflags +faststart viviers-operateurs.mp4
   ffmpeg -i viviers-operateurs.mp4 -vframes 1 -q:v 4 viviers-operateurs.jpg
   ```
3. **Dépôt** dans `public/media/viviers/`, puis transmettre les fichiers pour le branchement sur l'accueil.

## Transparence

Ces vidéos sont générées par IA : elles **illustrent** des métiers, elles ne montrent pas de vrais collaborateurs, candidats ou sites clients d'E-QOS. Il ne faut donc pas les légender comme des images réelles (« notre équipe à Boké », etc.).

Pour des visuels authentiques, les mêmes prompts peuvent servir de brief de tournage, avec autorisations de droit à l'image (voir `public/media/secteurs/README.md`).
