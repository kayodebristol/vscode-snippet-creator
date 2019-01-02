const vscode = require('vscode');
const os = require('os');
const fs = require('fs');
const util = require('util');

class SnippetsManager {

    addSnippet(snippet) {

        let settingsPath;
        let directorySeparator = '/';

        switch (os.type()) {
            case 'Darwin':
                settingsPath = process.env.HOME + '/Library/Application Support/Code/User/';
                break;
            case 'Linux':
                settingsPath = process.env.HOME + "/.config/Code/User/";
                break;
            case 'Windows_NT':
                settingsPath = process.env.APPDATA + "\\Code\\User\\";
                directorySeparator = "\\";
                break;
            default:
                settingsPath = process.env.HOME + "/.config/Code/User/";
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

            let snippets = JSON.parse(text.toString());

            if (snippets[snippet.name] !== undefined) {
                vscode.window.showErrorMessage('A snippet with this name already exists');
                return;
            }

            snippets[snippet.name] = {
                prefix: snippet.prefix,
                body: snippet.body,
                description: snippet.description
            };

            let fileContent = JSON.stringify(snippets, null, '\t');
            fs.writeFile(snippetFile, fileContent, () => { });
        });

    }

}

module.exports = SnippetsManager;