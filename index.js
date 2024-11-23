const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Pocetna');
});

app.get('/zaposlenici', (req, res) => {
    fs.readFile('zaposlenici.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Greška (čitanje podataka).' });
        }
        const zaposlenici = JSON.parse(data);
        res.json(zaposlenici);
    });
});

app.get('/zaposlenici/:id', (req, res) => {
    const id_zaposlenika = req.params.id;
    fs.readFile('zaposlenici.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Greška (čitanje podataka).' });
        }

        const zaposlenici = JSON.parse(data); 
        const zaposlenik = zaposlenici.find(zaposlenik => zaposlenik.id == id_zaposlenika);

        if (zaposlenik) {
            res.json(zaposlenik);
        } else {
            res.json({ message: 'Zaposlenik s traženim ID-em ne postoji.' });
        }
    });
});

app.post('/zaposlenici', (req, res) => {
    const { ime, prezime, godine_staža, pozicija } = req.body;

    if (!ime || !prezime || !godine_staža || !pozicija) {
        return res.status(400).json({ message: 'Svi podaci moraju biti poslani.' });
    }

    if (typeof godine_staža !== 'number' || godine_staža < 0) {
        return res.status(400).json({ message: 'Godine staža moraju biti broj (>= 0).' });
    }

    fs.readFile('zaposlenici.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Greška (čitanje podataka).' });
        }

        const zaposlenici = JSON.parse(data);

        const novi_id = zaposlenici.length + 1;

        const new_zaposlenik = {
            id: novi_id,
            ime,
            prezime,
            godine_staža,
            pozicija
        };

        zaposlenici.push(new_zaposlenik);

        fs.writeFile('zaposlenici.json', JSON.stringify(zaposlenici, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Greška (spremanje podataka).' });
            }

            res.status(201).json({ message: 'Dodan je novi zaposlenik.', zaposlenik: new_zaposlenik });
        });
    });
});

app.listen(PORT, error => {
    if(error) {
        console.error(`Greška: ${error.message}`);
    } else {
        console.log(`Server dela na http://localhost:${PORT}`);
    }
});