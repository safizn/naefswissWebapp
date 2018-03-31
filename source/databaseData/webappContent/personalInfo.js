let data = [
    {   key: 'achx', type: 'aggregation', version: ['ac1', 'ac2', 'ac3']  },
    {   key: 'ac1', type: 'version',
        title: 'Entrepreneurship Course',
        institutionName: 'Tel Aviv University',
        description: '',
        date: '2000',
        institutionLogo: '',
        gallery: ''
    },
    {   key: 'ac2', type: 'version',
        title: 'دورة ريادة أعمال',
        institutionName: 'جامعة تل أبيب',    
        description: '',
        date: '2000',
        institutionLogo: '',
        gallery: ''
    },
    {   key: 'ac3', type: 'version',
        title: '',
        institutionName: '',        
        description: '',
        date: '',
        institutionLogo: '',
        gallery: ''
    },

    {   key: 'achy', type: 'aggregation', version: ['ac5', 'ac6', 'ac7']  },
    {   key: 'ac5', type: 'version',
        title: 'Law (LL.B.)',
        institutionName: 'Ono Academic College',        
        description: '',
        date: '',
        institutionLogo: '',
        gallery: ''
    },
    {   key: 'ac6', type: 'version',
        title: 'قانون (محاماة)',
        institutionName: 'كلية أونو',        
        description: '',
        date: '',
        institutionLogo: '',
        gallery: ''
    },
    {   key: 'ac7', type: 'version',
        title: '',
        institutionName: '',        
        description: '',
        date: '',
        institutionLogo: '',
        gallery: ''
    },

]

module.exports = {
    databaseTableName: 'personalInfo',
    data: data,
    index: ['key']
}