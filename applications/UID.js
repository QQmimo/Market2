export class UID {
    static new() {
        const mask = 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx';
        const alphabit = '0123456789abcdef';

        return mask.replace(/x/g, c => alphabit.charAt(Math.random() * alphabit.length));
    }
}