# Setup Cloudinary pentru Upload Imagini

## Pași pentru configurare

### 1. Creare cont Cloudinary

1. Mergi la https://cloudinary.com/users/register/free
2. Creează un cont gratuit (planul Free oferă 25GB storage și 25GB bandwidth/lună)
3. Confirmă email-ul

### 2. Obținere credențiale

După ce te-ai logat în dashboard-ul Cloudinary:

1. Mergi la **Dashboard** (pagina principală)
2. Găsește secțiunea **Account Details** sau **API Keys**
3. Copiază următoarele informații:
   - **Cloud Name** (ex: `dxyz123abc`)
   - **API Key** (ex: `123456789012345`)
   - **API Secret** (ex: `abcdefghijklmnopqrstuvwxyz123456`)

### 3. Adăugare în .env.local

Adaugă următoarele linii în fișierul `.env.local` (din root-ul proiectului):

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**IMPORTANT**: 
- Nu partaja niciodată API Secret-ul public
- `.env.local` este deja în `.gitignore`, deci nu va fi commit-at în git

### 4. Restart server

După ce ai adăugat variabilele de mediu:

1. Oprește serverul de development (Ctrl+C)
2. Repornește cu `npm run dev`

## Cum funcționează

### Upload imagini

1. În pagina `/admin/produse`, selectează o imagine din computer
2. Imaginea se încarcă automat la Cloudinary
3. URL-ul imaginii se salvează automat în câmpul `image`
4. La submit, produsul se salvează în MongoDB cu URL-ul imaginii

### Afișare imagini

- Imaginile sunt afișate automat în cardurile de produse pe homepage
- Next.js Image component optimizează automat imaginile
- Imaginile sunt servite de Cloudinary (CDN rapid)

## Testare

1. Mergi la `/admin/produse`
2. Completează formularul
3. Selectează o imagine (JPG, PNG, etc.)
4. Așteaptă să vezi "✓ Imagine încărcată cu succes"
5. Submit formularul
6. Verifică pe homepage că imaginea apare în cardul produsului

## Beneficii Cloudinary

- ✅ **Gratuit** - 25GB storage/lună
- ✅ **CDN rapid** - imagini optimizate și servite rapid
- ✅ **Optimizare automată** - redimensionare, compresie
- ✅ **Transformări** - poți modifica imagini dinamic (resize, crop, etc.)
- ✅ **Securitate** - API keys pentru control acces

## Troubleshooting

### Eroare: "Failed to upload image"
- Verifică că ai adăugat toate cele 3 variabile de mediu în `.env.local`
- Verifică că ai restart-at serverul după adăugarea variabilelor
- Verifică că API Key și API Secret sunt corecte

### Imaginile nu apar
- Verifică că `next.config.ts` permite imagini din `res.cloudinary.com`
- Verifică în browser console dacă există erori CORS
- Verifică că URL-ul imaginii este salvat corect în MongoDB
