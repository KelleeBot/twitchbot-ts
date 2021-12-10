interface Array<T> {
    random(): T;

    shuffle(): T[];
}

interface String {
    format(...args: any[]): string;
}

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

String.prototype.format = function (...args) {
    let s = this;
    let i = args.length;

    while (i--) {
        s = s.replace(new RegExp("\\{" + i + "\\}", "gm"), args[i]);
    }
    return s.toString();
};
