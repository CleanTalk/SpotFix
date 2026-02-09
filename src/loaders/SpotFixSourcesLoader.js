
export class SpotFixSourcesLoader {

    constructor() {
        this.loadAll();
    }

    loadAll() {
        this.loadFonts();
    };

    loadFonts() {
        const preconnect_first = document.createElement('link');
        preconnect_first.rel = 'preconnect';
        preconnect_first.href = 'https://fonts.googleapis.com';
        document.head.appendChild(preconnect_first);

        const preconnect_second = document.createElement('link');
        preconnect_second.rel = 'preconnect';
        preconnect_second.href = 'https://fonts.gstatic.com';
        preconnect_second.crossOrigin = 'crossorigin';
        document.head.appendChild(preconnect_second);

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
        document.head.appendChild(fontLink);
    }
}
