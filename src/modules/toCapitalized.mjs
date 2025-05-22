export default function toCapitalized(str) {
    return str.split(/\s/).map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
}