export default function checkCategories(search, categories) {
    /*
    search: given array of (arrys of) categories to search for
    categories: array of categories/topics from a book API object

    The function takes a set "search" of categories (search words) to look for, and searches 
    through the strings in an array "categories", and if a match is found,
    the search word is added to a "results" array. If the search word is an 
    array, each string in the array is searched for, and if a match is found,
    the first search word in the array is added to the results array.
    */

    const searchForString = str => {
        for (let category of categories) {
            if (category.match(new RegExp(str, "gi"))) return true;
        }
    }

    const results = [];
    for (let val of search) {
        if (val instanceof Array) {
            for (let str of val) {
                if (searchForString(str)) {
                    results.push(val[0]);
                }
            }
        } else {
            if (searchForString(val)) {
                results.push(val)
            }
        }
    }
}