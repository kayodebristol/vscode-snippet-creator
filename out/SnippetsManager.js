"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const fs = require("fs");
const util = require("util");
const vscode = require("vscode");
const jsonc = require("jsonc-parser");
class SnippetsManager {
    addSnippet(snippet) {
        var settingsPath = '';
        var directorySeparator = '/';
        var vscodeSubdir = (vscode.env.appName.includes("Visual Studio Code - Insiders") ? 'Code - Insiders' : 'Code');
        switch (os.type()) {
            case 'Darwin':
                settingsPath = process.env.HOME + "/Library/Application Support/" + vscodeSubdir + "/User/";
                break;
            case 'Linux':
                settingsPath = process.env.HOME + "/.config/" + vscodeSubdir + "/User/";
                break;
            case 'Windows_NT':
                settingsPath = process.env.APPDATA + "\\" + vscodeSubdir + "\\User\\";
                directorySeparator = "\\";
                break;
            default:
                settingsPath = process.env.HOME + "/.config/" + vscodeSubdir + "/User/";
                break;
        }
        var snippetFile = settingsPath + util.format("snippets%s.json", directorySeparator + snippet.language);
        if (!fs.existsSync(snippetFile)) {
            fs.openSync(snippetFile, "w+");
            fs.writeFileSync(snippetFile, '{}');
        }
        fs.readFile(snippetFile, (err, text) => {
            if (err) {
                return;
            }
            var jsonText = text.toString();
            var parsingErrors = [];
            var snippets = jsonc.parse(jsonText, parsingErrors);
            if (parsingErrors.length > 0) {
                var errors = [];
                parsingErrors.forEach((e) => {
                    var errorText = jsonc.printParseErrorCode(e.error) + " error at the offset " + e.offset;
                    errors.push(errorText);
                });
                vscode.window.showErrorMessage("Error" + ((parsingErrors.length > 1) ? "s" : "") + " on parsing current " + snippet.language + " snippet file: " + errors.join(', '));
                return;
            }
            if (snippets[snippet.name] !== undefined) {
                vscode.window.showErrorMessage("A snippet " + snippet.name + " already exists - so adding a unique id");
                snippet.name = snippet.name + "_" + this.uuidv4();
            }
            this.normalizeSnippet(snippet);
            var edit = jsonc.modify(jsonText, [snippet.name], {
                prefix: snippet.prefix,
                body: snippet.body,
                description: snippet.description
            }, {
                formattingOptions: {
                    tabSize: 2,
                    insertSpaces: false,
                    eol: ''
                }
            });
            var fileContent = jsonc.applyEdits(jsonText, edit);
            fs.writeFile(snippetFile, fileContent, () => { });
            vscode.window.showInformationMessage("Snippet " + snippet.name + " added to " + snippet.language + " snippets");
        });
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    normalizeSnippet(snippet) {
        if (snippet.prefix === "") {
            snippet.prefix = snippet.name;
        }
        if (snippet.description === "") {
            snippet.description = snippet.name + ' description';
        }
    }
}
exports.default = SnippetsManager;
//# sourceMappingURL=SnippetsManager.js.map