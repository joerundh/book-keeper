import { v4 as uuid } from "uuid";

const toKebabCase = str => str.toLowerCase()
                                .split(/\s+/)
                                .map(s => s.split("").filter(char => char.match(/[a-z0-9]"/)).join(""))
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
            keyList.splice(keyList.indexOf(key), 1);
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
        } while (keyList.includes(newKey));

        const newItem = { key: newKey, value: value, timeAdded: Date.now() };
        const stringified = JSON.stringify(newItem) || "";
        if (stringified) {
            localStorage.setItem(`${prefix}-${newKey}`, stringified);
            keyList.push(newKey);
            saveKeyList();
            return newKey;
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
        const items = keyList.map(key => {
            return JSON.parse(localStorage.getItem(`${prefix}-${key}`));
        });
        return items;
    }

    this.removeItem = function(key) {
        if (keyList.includes(key)) {
            removeKey(key);
            saveKeyList();
            localStorage.removeItem(`${prefix}-${key}`);
            return true;
        }
        return false;
    }

    this.removeAllItems = function() {
        keyList.forEach(key => localStorage.removeItem(`${prefix}-${key}`))
        while (keyList.length) keyList.pop();
        saveKeyList();
    }

    /*
    Search for and get keys of primitive values
    */

    this.hasValue = function(value) {
        return this.getAllItems().map(obj => obj.value).includes(value);
    }

    this.getKeyFromValue = function(value) {
        const item = this.getAllItems().filter(obj => obj.value === value)[0];
        if (item) {
            return item.key;
        }
        return "";
    }

    /*
    Init
    */

    const keyList = getKeyList();
}