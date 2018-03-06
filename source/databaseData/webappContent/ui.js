let data = [
    {
        key: 'title', type: 'aggregation', 
        version: ['t1', 't2']
    },
    {
        key: 't2', type: 'version',
        title: {
            short: 'Naef Abu Swiss',
            long: 'Naef Abu Swiss personal site'
        }
    },
    {
        key: 't1', type: 'version',
        title: {
            short: 'نايف أبو صويص',
            long: 'صفحة نايف أبو صويص الشخصية'
        }
    },
]

module.exports = {
    databaseTableName: 'ui',
    data: data,
    index: ['key']
}