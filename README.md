# Samostalni zadatak za vježbu 4
Izradite novi Express poslužitelj i definirajte jednostavni API za upravljanje podacima o zaposlenicima neke
organizacije. API treba imati sljedeće rute:
- GET /zaposlenici - dohvat svih zaposlenika
- GET /zaposlenici/:id - dohvat zaposlenika po ID-u
- POST /zaposlenici - dodavanje novog zaposlenika
Implementirajte osnovne funkcionalnosti za dohvat, dodavanje i dohvat pojedinog zaposlenika. Zaposlenik
treba imati sljedeće atribute:
- id - jedinstveni identifikator zaposlenika (generira se na poslužitelju)
- ime - ime zaposlenika
- prezime - prezime zaposlenika
- godine_staža - godine radnog staža zaposlenika
- pozicija - pozicija zaposlenika u organizaciji (npr. direktor, voditelj, programer, dizajner, itd.)
Pohranite prvo ručno nekoliko zaposlenika u JSON datoteku zaposlenici.json.
1. Definirajte osnovu validaciju podataka za sva 3 zahtjeva: provjera jesu li svi podaci poslani, jesu li ID i
godine staža brojevi, jesu li ime i prezime stringovi itd. Ukoliko podaci nisu ispravni, vratite
odgovarajući status i poruku greške. Ukoliko nisu pronađeni zaposlenici, vratite odgovarajući status i
poruku.

2. Implementirajte mogućnost dodavanja novog zaposlenika. Zaposlenik se dodaje na kraj polja
zaposlenika u datoteci. Morate koristiti POST metodu i poslati JSON tijelo s podacima o zaposleniku te
spremati podatke u JSON datoteku kroz proces serijalizacije/deserijalizacije podataka.

Implementirajte sljedeće query parametre na endpointu /zaposlenici:
- sortiraj_po_godinama - sortiranje svih zaposlenika po godinama staža uzlazno ili silazno
- pozicija - filtriranje svih zaposlenika po poziciji u organizaciji
- godine_staža_min - filtriranje svih zaposlenika po minimalnom broju godina staža
- godine_staža_max - filtriranje svih zaposlenika po maksimalnom broju godina staža
