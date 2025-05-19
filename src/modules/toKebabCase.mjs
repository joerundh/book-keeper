export default function toKebabCase(str) {
    return str.toLowerCase()
                .split(/\s+/)
                .map(s => s.split("").filter(char => char.match(/[a-z0-9]"/)).join(""))
                .filter(s => !!s)
                .join("-");
}