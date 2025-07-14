import { UID } from "./UID";

export class Client {
    static getOrAddUID() {
        const found = localStorage.getItem('Market-User-Id');

        if (found) {
            return found;
        }
        else {
            const uid = UID.new();
            localStorage.setItem('Market-User-Id', uid);
            return uid;
        }
    }
}