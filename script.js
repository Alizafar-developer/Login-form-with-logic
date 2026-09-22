
// function secmostfrequentpositive (arr) {
//     let result = {};
//     for (let f = 0; f < arr.length; f++) {
//         if (arr[f] > 0) {
//             if (result[arr[f]]) {
//                 result[arr[f]]++;
//             } else {
//                 result[arr[f]] = 1;
//             }
//         }
//     }
//     let maxcount = 0;
//     let secmaxcount = 0;
//     for (let key in result) {
//         if (result[key] > maxcount) {
//             secmaxcount = maxcount;
//             maxcount = result[key];
//         } else if (result[key] > secmaxcount && result[key] < maxcount) {
//             secmaxcount = result[key]
//         }
//     }

//     let largest = -Infinity;

//     for (let f = 0; f < arr.length; f++) {
//         if (arr[f] > 0) {
//            if (result[arr[f]] === secmaxcount && arr[f] > largest) {
//             largest = arr[f]
//            }
//         }
//     }
//     return largest;
    
// }
// console.log(secmostfrequentpositive([2, 3, 4, 2, 3, 3, 4, 4, 5, 5]))

function countPositiveMultipleOf3(arr) {
   let count = 0;
   for (let a = 0; a < arr.length; a++) {
    if (arr[a] > 0 && arr[a] % 3 === 0) {
        count++;
    }
   }
   return count;
}
console.log(countPositiveMultipleOf3([3, -6, 5, 9, 12, -3, 7]));

function firstNegativeDuplicate(arr) {
    let result = []
    for (let b = 0; b < arr.length; b++) {
        if (arr[b] < 0) {
            if (result.includes(arr[b])) {
                return arr[b];
            } else {
                result.push(arr[b]);
            }
        }
    }
    return null;
}
console.log(firstNegativeDuplicate([5, -2, -4, -2, 7, -4]));

function largestPositiveExactlyTwice(arr) {
    let result = {};
    let maxcount = 2;
    let largest = -Infinity;
    for (let c = 0; c < arr.length; c++) {
        if (arr[c] > 0) {
            if (result[arr[c]]) {
                result[arr[c]]++;
            } else {
                result[arr[c]] = 1;
            }
        } 
    } 
    for (let c = 0; c < arr.length; c++) {
        if (result[arr[c]] === maxcount && arr[c] > largest) {
            largest = arr[c]
        }
    }
    return largest === -Infinity ? null : largest;
}
console.log(largestPositiveExactlyTwice([2, 8, 5, 10, 8, 3, 5, 10, 7]));

function firstUniquePositive(arr) {
    for (let d = 0; d < arr.length; d++) {
        if (arr[d] > 0) {
            if (arr.indexOf(arr[d]) === arr.lastIndexOf(arr[d])) {
                return arr[d]
            }
        }
    }
    return null;
}
console.log(firstUniquePositive([-2, 5, 3, 5, 7, 3, 8]));

function mostFrequentNegative(arr) {
    let result = {};
    let maxcount = 0;
    let mostfrequent;
    for (let e = 0; e < arr.length; e++) {
        if (arr[e] < 0) {
            if (result[arr[e]]) {
                result[arr[e]]++;
            } else {
                result[arr[e]] = 1;
            }
        }
    }
    for (let key in result) {
        if (result[key] > maxcount || result[key] === maxcount && (mostfrequent === undefined || Number(key) < mostfrequent)) {
            maxcount = result[key];
            mostfrequent = Number(key);
        }
    }
    return mostfrequent;
}
console.log( mostFrequentNegative([-2, -5, -2, -8, -5, -8]));

function secondHighestFrequencyPositive(arr) {
    let result = {};
    let maxcount = 0;
    let secmaxcount = 0;
    let largest = -Infinity;
    for (let f = 0; f < arr.length; f++) {
        if (arr[f] > 0) {
            if (result[arr[f]]) {
                result[arr[f]]++;
            } else {
                result[arr[f]] = 1;
            }
        }
    }

    for (let key in result) {
        if (result[key] > maxcount) {
            secmaxcount = maxcount;
            maxcount = result[key];
        } else if (result[key] > secmaxcount && result[key] < maxcount) {
            secmaxcount = result[key];
        }
    }

    if (secmaxcount === 0) {
        return null;
    }

    for (let f = 0; f < arr.length; f++) {
        if (result[arr[f]] === secmaxcount && arr[f] > largest) {
            largest = arr[f]
        }
    }
    return largest;
}
console.log(secondHighestFrequencyPositive([2, 3, 4, 2, 3, 3, 4, 4, 5, 5]));

function largestSecondHighestFrequency(arr) {
    let result = {};
    let maxcount = 0;
    let secmaxcount = 0;
    let largest = -Infinity;
    for (let g = 0; g < arr.length; g++) {
        if (result[arr[g]]) {
            result[arr[g]]++;
        } else {
            result[arr[g]] = 1;
        }
    }
    for (let key in result) {
        if (result[key] > maxcount) {
            secmaxcount = maxcount;
            maxcount = result[key];
        } else if (result[key] > secmaxcount && result[key] < maxcount) {
            secmaxcount = result[key]
        }
    }

    if (secmaxcount === 0) {
        return null;
    };

    for (let g = 0; g < arr.length; g++) {
        if (result[arr[g]] === secmaxcount && arr[g] > largest) {
            largest = arr[g]
        }
    }
    return largest;
}
console.log(largestSecondHighestFrequency([2, 3, 4, 2, 3, 3, 4, 4, 5, 5, 6, 6]));