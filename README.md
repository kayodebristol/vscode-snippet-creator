# Snippet Creator

This extension helps to automate snippet creation. Select the code you want to create snippet from and use command `Create Snippet` from the command palette or your custom keybind.

## Features

Use `Insert Snippet` (a built-in vscode command) to select and insert your snippet.

You can edit created snippets as usual because snippets created by this extension simply get added to the snippet JSON file for the relevant language.  Use the command `Preferences: Configure User Snippets` (a built-in vscode command) to select and edit your snippets file.

Before this extension existed, you had to generate snippets by crafting the JSON manually or by visiting https://snippet-generator.app/ and pasting into the relevant JSON snippet file.

## Release Notes
### 1.0.0

- Refactoring to typescript
- Fixing various unexpected behaviors

### 0.0.6

- Detects and also works with VSCode `code-insiders` edition
- Repairs blank prefix and blank description if user doesn't enter them
- Attempting to add a snippet with an existing name now succeeds (a unique id is added to the incoming snippet)
- Better success announcement message

### 0.0.1

Initial release

**Enjoy**