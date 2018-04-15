// EXAMPLE: node data
// {
//     nestedUnit: '91140de5-9ab6-43cd-91fd-9eae5843c74c',
//     pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e',
//     insertionPosition: {
//         insertionPathPointer: null, 
//         insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
//         order: 3,
//         // placement: {
//         //     type: 'after/before', 
//         //     pathPointer: 'KeyXXXX', 
//         // }
//     }
// },

let data = [
    /**
     * WebappUI Port:
     */
    { // ✔
        label: { name: 'Google verification file wrapper' }, key: '9sadf6-630c-41a7-84c4-4b0d52706981', unitKey: 'empty', 
        insertionPoint: [
            { key: 'de45db35-5e0d-49b1-82bc-659fc787b0c1', order: 1, executionType: 'chronological' },
        ],
        children: [
            // common function + language content
            { nestedUnit: 'x8q2-8cda-098352c107ea', pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e', insertionPosition: { insertionPathPointer: null, insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1', order: 1, /* placement: { type: 'after/before', pathPointer: 'KeyXXXX', } */ } },
            // Google verification file
            { nestedUnit: '7acf5873-630c-41a7-84c4-4b0d52706981', pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e', insertionPosition: { insertionPathPointer: null, insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1', order: 2, /* placement: { type: 'after/before', pathPointer: 'KeyXXXX', } */ } },
        ],
    },
    { label: { name: 'Google verification file' }, key: '7acf5873-630c-41a7-84c4-4b0d52706981', unitKey: '3ee0de2a-1e28-436a-bea0-8d5e4637dbe2', },

];

export default data