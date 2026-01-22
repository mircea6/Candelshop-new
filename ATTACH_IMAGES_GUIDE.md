# Ghid: Cum să atașezi pozele din Cloudinary la produse

## Pasul 1: Obține URL-urile pozelor din Cloudinary

### Metoda 1: Din Cloudinary Dashboard (Recomandat)

1. **Mergi la Cloudinary Dashboard**
   - Accesează: https://cloudinary.com/console
   - Loghează-te în contul tău

2. **Accesează Media Library**
   - Click pe **"Media Library"** din meniul din stânga
   - Vei vedea toate pozele încărcate

3. **Obține URL-ul pentru fiecare poză**
   - Click pe o poză
   - În panoul din dreapta, găsește **"Secure URL"**
   - Copiază URL-ul complet (ex: `https://res.cloudinary.com/your-cloud/image/upload/v1234567/candlestore/poza1.jpg`)
   - Repetă pentru toate cele 5 poze

### Metoda 2: Din URL-ul direct

Dacă știi numele pozelor, URL-ul este de forma:
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/vTIMESTAMP/candlestore/NUME_POZA.jpg
```

---

## Pasul 2: Identifică produsele existente

Pentru a știi ce produse ai, rulează:

```bash
npm run dev
```

Apoi accesează: `http://localhost:3000` și vezi ce produse ai.

Sau verifică direct în MongoDB Compass sau rulează:
```bash
# În alt terminal, poți face un GET la API
curl http://localhost:3000/api/products
```

---

## Pasul 3: Editează scriptul de attach

Deschide fișierul: `scripts/attach-images.ts`

Găsește secțiunea `imageMapping` și adaugă URL-urile:

```typescript
const imageMapping: Record<string, string> = {
  // Exemplu - înlocuiește cu URL-urile tale reale
  'Lumanare Vanilie Cozy': 'https://res.cloudinary.com/your-cloud/image/upload/v123/vanilla.jpg',
  'Lumanare Lemn de Santal': 'https://res.cloudinary.com/your-cloud/image/upload/v123/sandalwood.jpg',
  'Lumanare Citrus Fresh': 'https://res.cloudinary.com/your-cloud/image/upload/v123/citrus.jpg',
  'Lumanare Lavanda Calm': 'https://res.cloudinary.com/your-cloud/image/upload/v123/lavender.jpg',
  'Lumanare Scortisoara & Mar': 'https://res.cloudinary.com/your-cloud/image/upload/v123/cinnamon.jpg',
};
```

**IMPORTANT**: 
- Numele produsului trebuie să fie **exact** ca în baza de date
- URL-urile trebuie să fie complete (cu `https://`)

---

## Pasul 4: Rulează scriptul

```bash
npm run attach-images
```

Vei vedea:
```
Connected to MongoDB
Found 5 products
✓ Updated: Lumanare Vanilie Cozy
✓ Updated: Lumanare Lemn de Santal
...
✅ Updated 5 products with images!
```

---

## Pasul 5: Verifică rezultatul

1. Mergi pe homepage: `http://localhost:3000`
2. Vezi că produsele au acum pozele atașate!

---

## Exemplu complet

Să zicem că ai aceste produse:
- "Lumanare Vanilie Cozy"
- "Lumanare Lemn de Santal"
- "Lumanare Citrus Fresh"
- "Lumanare Lavanda Calm"
- "Lumanare Scortisoara & Mar"

Și ai aceste URL-uri din Cloudinary:
- `https://res.cloudinary.com/demo/image/upload/v123/vanilla.jpg`
- `https://res.cloudinary.com/demo/image/upload/v123/sandalwood.jpg`
- etc.

În `scripts/attach-images.ts`, adaugi:

```typescript
const imageMapping: Record<string, string> = {
  'Lumanare Vanilie Cozy': 'https://res.cloudinary.com/demo/image/upload/v123/vanilla.jpg',
  'Lumanare Lemn de Santal': 'https://res.cloudinary.com/demo/image/upload/v123/sandalwood.jpg',
  'Lumanare Citrus Fresh': 'https://res.cloudinary.com/demo/image/upload/v123/citrus.jpg',
  'Lumanare Lavanda Calm': 'https://res.cloudinary.com/demo/image/upload/v123/lavender.jpg',
  'Lumanare Scortisoara & Mar': 'https://res.cloudinary.com/demo/image/upload/v123/cinnamon.jpg',
};
```

Apoi rulezi: `npm run attach-images`

---

## Troubleshooting

### "Skipped: Product Name (no image mapping found)"
- Verifică că numele produsului este **exact** ca în baza de date
- Verifică că ai adăugat URL-ul în `imageMapping`

### "Error: Failed to connect"
- Verifică că `.env.local` conține `MONGODB_URI`
- Verifică că MongoDB Atlas este accesibil

### Pozele nu apar pe homepage
- Verifică că URL-urile sunt complete și valide
- Verifică în browser console dacă există erori de încărcare
- Verifică că `next.config.ts` permite imagini din Cloudinary
