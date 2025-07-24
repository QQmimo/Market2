export class Api {
    static async get(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error((await response.json()).error);
        }

        const result = await response.json();

        return result;
    };

    static async post(url, body) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicationjson'
            },
            body: JSON.stringify(body)
        });
    }

    static async patch(url, body) {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicationjson'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error((await response.json()).error);
        }

        return response.json();
    }

    static async delete(url, body) {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'accept': 'applicationjson'
            },
            body: JSON.stringify(body)
        });
    }
}