
// get object nested value by a string path.
export default function resolveObjectPath({ stringPath, object }) { 
    return stringPath.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : undefined
    }, object || this)
}
