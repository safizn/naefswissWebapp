let data = [
    
    /**
     * Port: WebappUI
     */
    {
        label: { name: 'GET' }, key: 'default', unitKey: 'c639cd53-c764-4967-b052-1e1652107923', callback: { name: '91140de5-9ab6-43cd-91fd-9eae5843c74c', type: 'middlewareNestedUnit' },
        insertionPoint: [
            { key: '2299cc1e-238f-4fe5-9069-51351ded59a7', order: 1, executionType: 'raceFirstPromise' },
            { key: '13a170c5-be67-4a60-9630-b9d0750641f4', order: 2, executionType: 'raceFirstPromise' },
        ],
        children: [
            // google276dc830e9fade0c.html
            { nestedUnit: 'ff727650-6dfb-48bf-bfc7-be4ad6a6bcdd', pathPointerKey: 'XYZ2', insertionPosition: { insertionPathPointer: null, insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7' } },
            // service worker
            { nestedUnit: '25f4a639-3fcf-4378-9c04-60cf245cd916', pathPointerKey: 'XYZ1', insertionPosition: { insertionPathPointer: null, insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7' } },
            // '/<*>'
            { nestedUnit: 'ab9c2538-cd9e-40d6-9a93-5296db445035', pathPointerKey: 'XYZ3', insertionPosition: { insertionPathPointer: null, insertionPoint: '13a170c5-be67-4a60-9630-b9d0750641f4' } },
        ],
    },
    { // ✔
        label: { name: 'URL: /google276dc830e9fade0c.html' }, key: 'ff727650-6dfb-48bf-bfc7-be4ad6a6bcdd', unitKey: '9c6dd381-0f9b-4d6d-9a96-bf9beb3d3108', 
        callback: { name: '9sadf6-630c-41a7-84c4-4b0d52706981', type: 'middlewareNestedUnit' }, 
    },






];

export default data