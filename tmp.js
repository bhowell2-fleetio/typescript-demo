const overviewSuffix = '_overview'

function getFeatureName(name) {
    return name.indexOf(overviewSuffix) === name.length - overviewSuffix.length ? name : name + overviewSuffix
}

console.log(getFeatureName('what'));
console.log(getFeatureName('what_overview'));
console.log(getFeatureName('what_overvie'));