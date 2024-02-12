import * as monaco from 'monaco-editor';

// Function to recursively generate suggestions for JSON object structure
/**
@jsonData any
obj: any, prefix: string = 'data',position: monaco.Position,wordInfo: monaco.editor.IWordAtPosition
*/
export function generateSuggestions(obj: any, prefix: string = 'data',position: monaco.Position,wordInfo: monaco.editor.IWordAtPosition): monaco.languages.CompletionItem[] {
  let suggestions: monaco.languages.CompletionItem[] = [];

  // If the object is an array, generate suggestions for each element
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      suggestions = suggestions.concat(generateSuggestions(item, `${prefix}[${index}]`,position,wordInfo));
    });
  }
  // If the object is a nested object, generate suggestions for its keys
  else if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      suggestions.push({
        label: `${prefix}.${key}`,
        kind: monaco.languages.CompletionItemKind.Variable,
        insertText: `${prefix}.${key}`,
        range: new monaco.Range(
                  position.lineNumber,
                  position.column - wordInfo.word.length,
                  position.lineNumber,
                  position.column
                ),
        detail: `Property of ${prefix}`,
        documentation: `Represents the ${key} property of ${prefix}`,
      });
      suggestions = suggestions.concat(generateSuggestions(obj[key], `${prefix}.${key}`,position,wordInfo));
    });
  }

  return suggestions;
}
