# Vidéos et photos des secteurs (à fournir par E-QOS)

Un fichier par secteur, nommé par sa clé : `mines`, `energie`, `btp`, `logistique`, `agro`, `services`.

| Fichier | Format | Réglages |
|---|---|---|
| `<cle>.mp4` | MP4 H.264, sans piste audio | 1920 × 1080, 25 ou 30 i/s, 6 à 10 s en boucle propre, 2,5 Mo maximum (CRF 26 à 28) |
| `<cle>.webm` (optionnel) | WebM VP9, sans audio | mêmes dimensions, plus léger que le MP4 |
| `<cle>.jpg` | image d'attente (première image de la vidéo) | 1920 × 1080, 150 Ko maximum |

Contenu attendu : des professionnels au travail, filmés sur des sites réels en Guinée (mine, centrale, chantier, port, exploitation agricole, agence), avec les autorisations de tournage et de droit à l'image. Plans larges et lents, sans texte incrusté ni logo.

Après dépôt, renseigner `media` dans `src/data/secteursGuinee.ts`, par exemple :

```ts
media: { video: '/media/secteurs/mines.mp4', webm: '/media/secteurs/mines.webm', poster: '/media/secteurs/mines.jpg' },
```

Commande indicative de compression : `ffmpeg -i source.mov -an -vf scale=1920:-2 -c:v libx264 -crf 27 -preset slow -movflags +faststart mines.mp4`
