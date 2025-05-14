import { v4 as uuid } from "uuid";

const toKebabCase = str => str.toLowerCase()
                                .split(/\s+/)
                                .flatMap(s => s.split("").filter(char => char.match(/[a-z0-9]"/)).join(""))
                                .join("-");

export default function Storage(str) {
    const kebabCase = toKebabCase(str);
    const prefix = kebabCase.match(/[a-z]/g) ? kebabCase : "storage";

    /*
    Storage and retrieval of key list
    */

    function getKeyList() {
        return JSON.parse(localStorage.getItem(`${prefix}-keylist`) || "[]");
    }

    function saveKeyList() {
        localStorage.setItem(`${prefix}-keylist`, JSON.stringify(keyList));
    }

    /*
    Keys
    */

    function addKey(key) {
        if (keyList.incluces(key)) return false;
        keyList.push(key);
        saveKeyList();
        return true;
    }

    function removeKey(key) {
        if (keyList.includes(key)) {
            keyList = keyList.filter(x => x !== key);
            saveKeyList();
            return true;
        }
        return false;
    }

    /*
    Items
    */

    this.addItem = function(value) {
        let newKey;
        do {
            newKey = uuid();
        } while (keyList.incluces(newKey));

        const newItem = { key: newKey, value: value, timeAdded: Date.now() };
        const stringified = JSON.stringify(newItem) || "";
        if (stringified) {
            localStorage.setItem(`$(prefix)-${newKey}`, stringified);
            keyList.push(newKey);
            saveKeyList();
            return key;
        }
        return "";
    }

    this.getItem = function(key) {
        if (keyList.includes(key)) {
            return JSON.parse(localStorage.getItem(`${prefix}-${key}`));
        }
        return null;
    }

    this.getAllItems = function() {
        return keyList.map(key => JSON.parse(localStorage.getIem(`${prefix}-${key}`)));
    }

    this.removeItem = function(key) {
        if (keyList.includes(key)) {
            removeKey(key);
            saveKeyList();
            localStorage.removeItem(`${prefix}-${key}`);
        }
        return true;
    }

    this.removeAllItems = function() {
        keyList.forEach(key => localStorage.removeItem(`${prefix}-${key}`))
        while (keyList.length) keyList.pop();
        saveKeyList();
    }

    /*
    Init
    */

    const keyList = getKeyList();
}