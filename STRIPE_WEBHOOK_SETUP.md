# Ghid Webhook Stripe – Pas cu pas (Pasul 5)

Acest ghid te ajută să configurezi **webhook-ul** pentru plăți cu card, ca comanda să treacă din „în așteptare” în „confirmată” după ce clientul a plătit.

---

## Ce vei avea nevoie

- Cont Stripe (deja l-ai făcut)
- Calculator Windows
- Aplicația ta Next.js pornită (`npm run dev`)

---

## Pas 1: Instalare Stripe CLI (program de pe computer)

Stripe CLI e un mic program care „ascultă” pe computerul tău ce se întâmplă la Stripe și trimite aceste știri către aplicația ta.

### Varianta A: Cu Scoop (dacă îl ai instalat)

Deschide **PowerShell** sau **Windows Terminal** și scrie:

```
scoop install stripe
```

### Varianta B: Fără Scoop (descărcare manuală)

1. Mergi pe: **https://github.com/stripe/stripe-cli/releases**
2. La „Latest”, apasă pe `stripe_X.XX.X_windows_x86_64.zip` (înlocuiește X.XX.X cu numărul din link).
3. Descarcă fișierul și dezarhivează-l (click dreapta → „Extract all”).
4. Vei avea un fișier `stripe.exe`. Mută-l într-un folder simplu, de ex. `C:\stripe\`.
5. **Dacă Windows SmartScreen afișează „Aplicație nerecunoscută” / „Editor necunoscut”** la prima pornire: apasă **„Executați oricum”**. Stripe CLI e de la Stripe (github.com/stripe/stripe-cli) și e sigur.
6. Adaugă acest folder la **PATH**:
   - Caută în Windows: „Variabile de mediu” / „Environment variables”
   - La „Variabile de sistem” găsește **Path** → Edit → New → adaugă `C:\stripe\` (sau folderul unde e `stripe.exe`)
   - OK peste tot.

### Verificare (după ce ai adăugat în PATH)

Deschide un **terminal nou** (PowerShell sau CMD) și scrie:

```
stripe --version
```

Dacă apare ceva de genul `stripe version 1.19.4`, e bine. Dacă zice „comanda nu e găsită”, repetă pasul cu PATH-ul.

---

## Pas 2: Autentificare în Stripe (o singură dată)

În același terminal scrie:

```
stripe login
```

1. Se deschide browser-ul la o pagină Stripe.
2. Dacă ești deja logat, poate doar îți cere „Allow access” – apasă Allow.
3. În terminal ar trebui să apară: „Done! The Stripe CLI is configured for ...”

---

## Pas 3: Pornire „ascultătorului” pentru webhook

Aici faci legătura între Stripe și aplicația ta de pe `localhost`.

### Important

- Aplicația Next.js trebuie să ruleze (`npm run dev` pe `http://localhost:3000`).
- În **alt** terminal (al doilea) rulezi comanda de mai jos.

În acel **al doilea terminal** scrie:

```
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Ce ar trebui să vezi

În terminal apare ceva de genul:

```
Ready! Your webhook signing secret is whsec_1a2b3c4d5e6f... (^C to quit)
```

### Ce trebuie să copiezi

Copiază **întregul** text care începe cu `whsec_` (până înainte de spațiu sau de `(`).  
Exemplu: `whsec_1a2b3c4d5e6f7890abcdef...`

**Lăsă acest terminal deschis** cât vrei să testezi plățile. Dacă îl închizi, trebuie să repornești comanda și, de obicei, primești un **secret nou** (un nou `whsec_...`).

---

## Pas 4: Adăugare secret în `.env.local`

1. Deschide în editor fișierul **`.env.local`** din rădăcina proiectului (acolo unde e `package.json`).
2. Găsește linia:
   ```env
   STRIPE_WEBHOOK_SECRET=
   ```
3. După `=` lipsește valoarea. Adaugă acolo **exact** ce ai copiat la Pas 3 (începe cu `whsec_`), fără spații sau ghilimele.

   Exemplu:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_1a2b3c4d5e6f7890abcdef...
   ```

4. Salvează fișierul (Ctrl+S).

---

## Pas 5: Repornire aplicație Next.js

După ce ai salvat `.env.local`:

1. În terminalul unde rulează `npm run dev`, oprește aplicația: **Ctrl+C**.
2. Pornește-o din nou:
   ```
   npm run dev
   ```

Astfel, aplicația va citi noul `STRIPE_WEBHOOK_SECRET`.

---

## Pas 6: Cum testezi

Când vrei să testezi plăți cu card:

1. **Terminal 1:** `npm run dev` (aplicația rulează).
2. **Terminal 2:** `stripe listen --forward-to localhost:3000/api/stripe/webhook` (ascultă evenimentele).

Apoi:

- Mergi pe site-ul tău, pune produse în coș, finalizează comanda cu **Card bancar**.
- Ești dus la Stripe, Introdu cardul de test: `4242 4242 4242 4242`, o dată viitoare, orice CVC.
- După plată ești redirecționat la `/checkout/success`.

În **Terminal 2** (stripe listen) ar trebui să apară evenimente, de ex. `checkout.session.completed`. În baza de date, comanda respectivă ar trebui să aibă `status: "confirmed"` în loc de `"pending"`.

---

## Dacă repornești `stripe listen`

Dacă închizi și repornești `stripe listen`, Stripe poate da un **secret nou** (`whsec_...`). Atunci:

1. Copiază noul secret din terminal.
2. Actualizează `STRIPE_WEBHOOK_SECRET` în `.env.local`.
3. Repornește `npm run dev`.

---

# Explicație pe înțelesul cuiva care nu știe programare

Mai jos e explicat, cu cuvinte simple, **ce se întâmplă** și **de ce** există acest „Pas 5” cu webhook-ul.

---

## 1. Ce e o plată cu card în cazul tău

- Clientul completează formularul pe site-ul tău, alege **Card bancar** și apasă „Plătește”.
- Site-ul tău îl duce pe **pagina Stripe** (Stripe se ocupă de card, securitate, bănci).
- Clientul introduce cardul acolo și confirmă plata.
- Stripe procesează plata și îl trimite înapoi pe site-ul tău, pe o pagină de „Plată reușită”.

Până aici, **banii** sunt luați de Stripe. Dar **tu** trebuie să știi în aplicația ta și în baza de date: „Această comandă a fost plătită.”

---

## 2. De ce nu e de ajuns doar „plata a mers”

Când clientul apasă „Plătește” pe site-ul tău:

1. Aplicația ta creează o **comandă** în baza de date cu stare **„în așteptare”** (pending) – pentru că nu ai încă confirmarea că banii au ieșit.
2. Aplicația ta cere la Stripe: „Fă o sesiune de plată pentru suma asta” și primește un link.
3. Clientul e dus pe Stripe, plătește acolo, apoi e redirecționat înapoi pe site-ul tău.

Problema: **redirecționarea** (întoarcerea pe `/checkout/success`) nu garantează întotdeauna că plata a fost făcută (pot fi erori de rețea, user închide tab-ul etc.). De aceea, **sursa de adevăr** pentru „s-a plătit” e **Stripe**, nu faptul că utilizatorul a ajuns pe pagina de succes.

Trebuie ca **Stripe** să îți spună oficial: „Plata pentru sesiunea X s-a încheiat cu succes.” Asta se face prin **webhook**.

---

## 3. Ce e un webhook (cu o imagine simplă)

Gândește-te la webhook ca la un **apel telefonic automat**:

- Stripe: „Am finalizat o plată pentru sesiunea ta de checkout.”
- Stripe „suna” la un **URL** (o adresă) din aplicația ta:  
  `http://localhost:3000/api/stripe/webhook`
- Aplicația ta răspunde la acel apel, primește datele („plata X s-a încheiat”) și poate actualiza comanda în baza de date: din „în așteptare” în **„confirmată”**.

Deci: **webhook = modul în care Stripe te anunță automat că o plată s-a finalizat.**

---

## 4. De ce nu merge webhook-ul direct pe „localhost”

- Stripe rulează pe **internet**, pe serverele lor.
- „Localhost” înseamnă „calculatorul tău”, nu un domeniu vizibil pe internet.
- Stripe **nu poate** accesa direct `http://localhost:3000/...` de pe serverele lor.

De aceea ai nevoie de un „intermediar” care:

- ascultă pe internet ce se întâmplă la Stripe,
- și „trimite” acel mesaj către `localhost:3000/api/stripe/webhook`.

Acest intermediar e **Stripe CLI** cu comanda `stripe listen --forward-to ...`.

---

## 5. Ce face `stripe listen`

- **Stripe CLI** e un program instalat **pe computerul tău**.
- Când rulezi `stripe listen --forward-to localhost:3000/api/stripe/webhook`:
  - se deschide o legătură **de la calculatorul tău** către Stripe (deci Stripe poate „vorbi” cu programul de pe PC-ul tău);
  - Stripe trimite evenimente (ex. „checkout.session.completed”) la Stripe CLI;
  - Stripe CLI le **reîncarcă** către adresa `http://localhost:3000/api/stripe/webhook`.

Practic: CLI-ul e un „curier” între Stripe (pe internet) și aplicația ta (pe localhost).

---

## 6. Ce e `STRIPE_WEBHOOK_SECRET` (whsec_...)

Stripe nu vrea ca oricine să poată trimite „mesaje” la adresa ta de webhook. De aceea, fiecare mesaj vine semnat cu un **secret** pe care doar Stripe (și tu, prin `.env.local`) îl știți.

- Când rulezi `stripe listen`, în terminal îți dă un **secret** (`whsec_...`).
- Acest secret îl pui în `.env.local` la `STRIPE_WEBHOOK_SECRET`.
- Când vine un apel la `/api/stripe/webhook`, codul tău:
  - citește semnătura din mesaj,
  - o verifică cu `STRIPE_WEBHOOK_SECRET`.
  - Dacă se potrivește → e cu adevărat de la Stripe, faci actualizarea comenzii.
  - Dacă nu → respingi mesajul (e de securitate).

Deci: **`whsec_...` = parola cu care Stripe „semnează” mesajele către tine, ca să știi că sunt reale.**

---

## 7. Ce face exact fișierul `webhook/route.ts`

În termeni simpli:

1. **Primește** mesajul de la Stripe (sau de la Stripe CLI, care l-a redirecționat).
2. **Verifică** semnătura cu `STRIPE_WEBHOOK_SECRET`. Dacă nu e ok, răspunde „Eroare” și se oprește.
3. **Citește** tipul de eveniment. Dacă e „checkout.session.completed” (plata s-a încheiat):
   - extrage din mesaj **ID-ul comenzii** tale (`orderId`) pe care l-ai trimis la crearea sesiunii Stripe;
   - în baza de date găsește comanda cu acel ID și schimbă starea din **„pending”** (în așteptare) în **„confirmed”** (confirmată).
4. **Răspunde** la Stripe: „Am primit”, ca Stripe să știe că totul e ok.

În esență: acest fișier e cel care **actualizează comanda în „confirmată”** după ce Stripe anunță că plata s-a făcut.

---

## 8. Fluxul de la A la Z (rezumat)

1. Clientul alege **Card** și apasă Plătește.
2. **Checkout (site-ul tău):** creează o comandă „pending” în DB și cere la Stripe o sesiune de plată; trimite în sesiune și `orderId`.
3. Clientul e dus pe **Stripe**, plătește.
4. **Stripe** trimite evenimentul „checkout.session.completed”:
   - în **producție**: direct la URL-ul tău de webhook de pe domeniul tău;
   - în **development**: la Stripe CLI, care îl trimite mai departe la `localhost:3000/api/stripe/webhook`.
5. **Webhook-ul tău** verifică semnătura, citește `orderId`, actualizează comanda în **„confirmed”**.
6. Clientul vede pagina de succes; comanda în sistem e marcată ca plătită.

---

## 9. De ce „Pasul 5” e obligatoriu în development

- Fără Stripe CLI și fără `STRIPE_WEBHOOK_SECRET` corect, **plata la Stripe se face**, dar:
  - mesajul „checkout.session.completed” **nu** ajunge la aplicația ta (sau e respins),
  - comanda rămâne **„pending”** în baza de date.

- Cu Pasul 5 făcut corect:
  - `stripe listen` face ca mesajul să ajungă la `localhost`,
  - `STRIPE_WEBHOOK_SECRET` asigură că doar Stripe (prin CLI) poate „debloca” logica din webhook,
  - comanda trece în **„confirmed”** după fiecare plată reușită.

Pe scurt: **Pasul 5 = modul în care, pe computerul tău, „primiți” în aplicație știrea de la Stripe că plata s-a făcut, și în care comanda din baza de date este setată corect pe „confirmată”.**
