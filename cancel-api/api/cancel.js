import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { uuid } = req.query;

    if (!uuid) {
        return res.status(400).json({ error: 'UUID chýba' });
    }

    // Upgates API údaje
    const API_URL = 'https://machovna.admin.s17.upgates.com/api/v2/order-statuses';
    const API_AUTH = 'Basic ' + Buffer.from('33884738:nq9I9Q264iU61cLl1tcX').toString('base64');

    try {
        // Volanie Upgates API
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Authorization': API_AUTH,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuid: uuid,
                status: 'Stornovaná',
            }),
        });

        if (response.ok) {
            return res.status(200).json({ message: 'Objednávka bola úspešne stornovaná' });
        } else {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Serverová chyba', details: error.message });
    }
}
