import { v4 as uuid } from "uuid";
import toKebabCase from "./toKebabCase.mjs";

export default function Storage(str) {
    const kebabCase = toKebabCase(str);
    const prefix = kebabCase.match(/[a-z]/g) ? kebabCase : "storage";

    const keyList = JSON.parse(localStorage.getItem(`${prefix}-key-list`) || "[]");

    /*
    Storage and retrieval of key list
    */

    function saveKeyList() {
        if (list) {
            localStorage.setItem(`${prefix}-key-list`, JSON.stringify(keyList));
        } else {
            localStorage.removeItem(`${prefix}-key-list`)
        }
    }

    /*
    Keys
    */

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
}