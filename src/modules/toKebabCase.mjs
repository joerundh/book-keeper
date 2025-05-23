export default function toKebabCase(str) {
    return str.toLowerCase()                                            // Convert all characters to lower case
                .split(/\s+/)                                           // Divide words at whitespaces
                .map(s => s.split("")                                   // Divide each word into its characters
                            .filter(char => char.match(/[a-z0-9]"/))    // Remove all non-alphanumeral characters
                            .join("")                                   // Rejoin the characters of each word
                )
                .filter(s => !!s)                                       // Remove all empty strings
                .join("-");                                             // Recreate the string with the words separated by dashes
}