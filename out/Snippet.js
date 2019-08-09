"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Snippet {
    constructor() {
        this._body = [];
        this._name = '';
        this._prefix = '';
        this._language = '';
        this._description = '';
    }
    get body() {
        return this._body;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get prefix() {
        return this._prefix;
    }
    set prefix(prefix) {
        this._prefix = prefix;
    }
    get language() {
        return this._language;
    }
    set language(language) {
        this._language = language;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    buildBody(code) {
        this._body = code.replace(/\t/g, '\\t').replace(/\r/g, '').split("\n");
    }
}
exports.default = Snippet;
//# sourceMappingURL=Snippet.js.map