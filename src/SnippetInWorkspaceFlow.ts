import fs = require('fs');
import path = require('path');
import vscode = require('vscode');
import Snippet from './Snippet';

export class SnippetInWorkspaceFlow {

    private getWorkspaceSettingsRoot() {
        const rootPath = vscode.workspace.workspaceFolders;

        if (!rootPath || rootPath.length === 0) {
            throw new Error('Workspace root not found!');
        }
    
        return path.join(rootPath[0].uri.fsPath, '.vscode');
    }

        /*
     Infastructure for managind already created snippets, flow not yet finalized!

    private createNewFileFlow(): Promise<string> {
        return new Promise(async (resolve, _) => {
            let newFileName = await vscode.window.showInputBox({ prompt: 'Enter Name of the New File' });

            if (!newFileName) {
                throw new Error('No file named inserted!');
            }
            
            newFileName += '.code-snippets';
            
            const fullPath = path.join(this.getWorkspaceSettingsRoot(), newFileName);
    
            if (!fs.existsSync(fullPath)) {
                fs.openSync(fullPath, "w+");
                fs.writeFileSync(fullPath, '{}');
            }
    
            resolve(fullPath);
        });
    }

    private getSnippetFiles(workspaceRoot: string) {
        const files = fs.readdirSync(workspaceRoot);
    
        const snippetFiles: string[] = [];

        files.forEach((file) => {
            const fileName = file;
            if (fileName.endsWith('.code-snippets')) {
                snippetFiles.push(fileName);
            }
        });

        resolve(snippetFiles);
    }*/

    public workspaceSpecificSelections(snippet: Snippet): Promise<string> {
        return new Promise(async (resole, _) => {
            const workspaceRoot = this.getWorkspaceSettingsRoot();

            const snippetFileName = snippet.prefix + '.code-snippets';

            const fullPath = path.join(workspaceRoot, snippetFileName);

            resole(fullPath);

          /*   
          Infastructure for managind already created snippets, flow not yet finalized!

          const snippetFiles = this.getSnippetFiles(workspaceRoot);
    
           const chosenFile = await vscode.window.showQuickPick([
                'Create New File',
                ...snippetFiles
            ], {
                canPickMany: false,
                placeHolder: 'Where should the snippet be stored? (You can update an existing snippet or create a new one)'
            });

            if (chosenFile === 'Create New File') {
                this.createNewFileFlow().then((fileName) => {
                    return path.join(workspaceRoot, fileName);
                }).catch(() => {
                    throw new Error('No file named inserted!');
                });
            } else if (chosenFile) {
                return path.join(workspaceRoot, chosenFile);
            } else {
                throw new Error('No option selected!');
            }*/
        });
    
    }

}
