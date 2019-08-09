export default class Snippet {

	private _body: string;
	private _name: string;
	private _prefix: string;
	private _language: string;
	private _description: string;

	constructor () {
		this._body = '';
		this._name = '';
		this._prefix = '';
		this._language = '';
		this._description = '';
	}

	get body (): string {
		return this._body;
	}

	set body (body: string) {
		this._body = body;
	}

	get name (): string {
		return this._name;
	}

	set name (name: string) {
		this._name = name;
	}

	get prefix (): string {
		return this._prefix;
	}

	set prefix (prefix: string) {
		this._prefix = prefix;
	}

	get language (): string {
		return this._language;
	}

	set language (language: string) {
		this._language = language;
	}

	get description (): string {
		return this._description;
	}

	set description (description: string) {
		this._description = description;
	}

	static buildBody (code: string) {
		return code.replace(/\t/g, '\\t').split("\n");
	}
}