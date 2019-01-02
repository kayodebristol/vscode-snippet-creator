class Snippet {

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

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get body() {
        return this._body;
    }

    set body(body) {
        this._body = Snippet.buildBody(body);
    }

    get language() {
        return this._language;
    }

    set language(language) {
        this._language = language;
    } 

    static buildBody(code) {
        return code.replace(/\t/g, '\\t').split("\n");
    }
}

module.exports = Snippet;