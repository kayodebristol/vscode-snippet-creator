const vscode = require('vscode');
const os = require('os');
const fs = require('fs');
const util = require('util');
const jsonc = require('jsonc-parser');

class SnippetsManager {

    addSnippet(snippet) {

        let settingsPath;
        let directorySeparator = '/';
        let vscode_subdir = (vscode.env.appName.includes("Visual Studio Code - Insiders") ? 'Code - Insiders' : 'Code')

        switch (os.type()) {
            case 'Darwin':
                settingsPath = process.env.HOME + `/Library/Application Support/${vscode_subdir}/User/`;
                break;
            case 'Linux':
                settingsPath = process.env.HOME + `/.config/${vscode_subdir}/User/`;
                break;
            case 'Windows_NT':
                settingsPath = process.env.APPDATA + `\\${vscode_subdir}\\User\\`;
                directorySeparator = "\\";
                break;
            default:
                settingsPath = process.env.HOME + `/.config/${vscode_subdir}/User/`;
                break;
        }

        let snippetFile = settingsPath + util.format("snippets%s.json", directorySeparator + snippet.language);

        if (!fs.existsSync(snippetFile)) {
            fs.openSync(snippetFile, "w+");
            fs.writeFileSync(snippetFile, '{}');
        }

        fs.readFile(snippetFile, (err, text) => {
            if (err) {
                return;
            }

            let jsonText = text.toString();

            let parsingErrors = [];
            let snippets = jsonc.parse(jsonText, parsingErrors);

            if (parsingErrors.length > 0) {
                let errors = [];
                parsingErrors.forEach(e => {
                    let errorText = `'${jsonc.printParseErrorCode(e.error)}' error at offset ${e.offset}`;
                    errors.push(errorText);
                });

                vscode.window.showErrorMessage(`Error${parsingErrors.length > 1 ? "s" : ""} on parsing current ${snippet.language} snippet file: ${errors.join(', ')}`);
                return;
            }

            if (snippets[snippet.name] !== undefined) {
                vscode.window.showErrorMessage(`A snippet '${snippet.name}' already exists - so adding a unique id`);
                // return;
                snippet.name = snippet.name + '_' + this.uuidv4()
            }

            if (snippet.prefix == "")
                snippet.prefix = snippet.name;
            if (snippet.description == "")
                snippet.description = snippet.name + ' description';

            let edit = jsonc.modify(jsonText, [snippet.name],
                {
                    prefix: snippet.prefix,
                    body: snippet.body,
                    description: snippet.description
                },
                {
                    formattingOptions: {
                        // based on default vscode snippet format
                        tabSize: 2,
                        insertSpaces: false,
                        eol: ''
                    }
                });

            let fileContent = jsonc.applyEdits(jsonText, edit);
            fs.writeFile(snippetFile, fileContent, () => { });
            vscode.window.showInformationMessage(`Snippet '${snippet.prefix}' added to ${snippet.language} snippets`)
        });

    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }    

}

module.exports = SnippetsManager;