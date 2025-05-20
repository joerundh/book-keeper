import { v4 as uuid } from "uuid";
import toKebabCase from "./toKebabCase.mjs";

export default function Storage(str) {
    const kebabCase = toKebabCase(str || "mp-app");
    const prefix = kebabCase.match(/[a-z]/g) ? kebabCase : "my-app";

    const list = JSON.parse(localStorage.getItem(`${prefix}-storage`) || "[]");
    
    this.getList = function() {
        return list;
    }

    const saveList = () => {
        if (list) {
            // Store the list in local storage if it contains any objects
            localStorage.setItem(`${prefix}-list`, JSON.stringify(list));
        } else {
            // The list is empty, so it may as well be removed from 
            // the local storage
            localStorage.removeItem(`${prefix}-list`)
        }
    }

    this.hasValue = function(value) {
        return list.map(obj => JSON.stringify(obj.value)).includes(JSON.stringify(value));
    }

    this.addValue = function(value) {
        /*
        If the passed object is already stored in the list, return false without 
        adding a duplicate. Otherwise, create a wrapper object with a unique ID
        and a timestamp, add it to the list, save the list to the local storage,
        and return true.
        */

        // Return false without addition if the value is already stored
        if (this.hasValue(value)) {
            return false;
        }

        // Create an object which contains the book object, a status code and a timestap
        const obj = { key: uuid(), value: value, timeAdded: Date.now() };
        list.push(obj);
        saveList();
        return true;
    }

    this.removeValue = function(value) {
        /*
        If a value is found in the list, take its index and use it to splice the value 
        out of the list. Then save the list and return true. Otherwise, if the value is
        not found, return false.
        */

        // Find the index of the value (-1 if it doesn't exist in the list)
        const index = list.map(obj => JSON.stringify(obj.value)).indexOf(JSON.stringify(value));
        if (index >= 0) {
            // Remove from the list and save the updated list
            list.splice(index, 1);
            saveList();
            return true;
        }
        // If not found, return false with no further action
        return false;
    }
}