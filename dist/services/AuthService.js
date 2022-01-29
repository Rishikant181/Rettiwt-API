import fetch from "node-fetch";
export class AuthService {
    constructor() {
        this.guestToken = '';
    }
    generateGuestToken(url) {
        const headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"97\", \"Chromium\";v=\"97\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        };
        return fetch(url, {
            headers: headers,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET"
        })
            .then(res => res.text())
            .then(res => {
            const guestTokenIndex = res.indexOf("gt=") + 3;
            this.guestToken = res.substring(guestTokenIndex, guestTokenIndex + 19);
            return this.guestToken;
        });
    }
}
;
//# sourceMappingURL=AuthService.js.map