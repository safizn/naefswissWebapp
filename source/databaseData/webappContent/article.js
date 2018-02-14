let data = [
    {   label: { name: 'grouped article x' }, key: 'a1', type: 'aggregation',
        version: [ '1', '2' ]
        // version: [
        //     {
        //         referenceDocumentKey: '1',
        //         localization: {
        //             language: 'Arabic'
        //         },
        //     },
        //     {
        //         referenceDocumentKey: '2',
        //         localization: {
        //             language: 'English'
        //         },
        //     }
        // ]
    },
    {   key: '1', type: 'version',
        title: 'سلوكك على الإنترنت يكشف أولوياتك".. كيف ترتب الخوارزميات حياتنا؟',
        paragraph: 'بشكل أو بآخر، يُمكن تشبيه الشبكات الاجتماعية بالصحف الورقية التي كانت يوما ما المصدر الرئيس لقراءة آخر الأخبار. إلا أن ثورة الإنترنت أزاحت الصحف، ليصبح الإنترنت مصدر الأفراد الأول -لدى قطاعات واسعة من المجتمع- لاستقاء المعلومات. وبظهور الأجهزة الذكية جاءت الشبكات الاجتماعية لتُصبح المكان الأمثل للحصول على تلك الأخبار، وبشكل آني.        '
    },
    {   key: '2', type: 'version',
        title: 'Saudi billionaire Alwaleed "released" from detention',
        paragraph: 'Prominent Saudi businessman Prince Alwaleed bin Talal has been released after more than two months of detention on allegations of corruption, according to a family source.        '
    },
    {   
        label: { name: '' }, key: 'a2', type: 'aggregation',
        version: [ '3', '4' ]
    },
    {   
        key: '3', type: 'version',
        title: 'خاطرة الأسبوع - الدِفء المفقود',
        paragraph: 'ريني أسىً كلّما رأيت شيخاً يجلس وحيداً في سوقٍ يراقب الناس، أو امرأةً مسنّة تمشي بصعوبة في شارعٍ هادئ، تنظر في وجوه المشاة، ولا تنتظر أحداً. تبحث عن ألفة تفتقدها أو أنيس يحاورها. وبينما تلفتنا مشاهد هؤلاء، نذهل عن صورٍ أكثر منها، لمن هم أصغر سناً، يحاربون جاهدين للانفكاك من الوحدة القاتلة التي وقعوا فريسةً لها، ولا يجدون سبيلاً للخروج منها.'
    },
    {   
        key: '4', type: 'version',
        title: 'Want To Become A Multi-Millionaire? Do These 15 Things Immediately.',
        paragraph: 'Most people wish their circumstances would magically change for them. They don’t have the desire to become better themselves so they can proactively improve their own circumstances.'
    },
    {   
        label: { name: '' }, key: 'a3', type: 'aggregation',
        version: [ '5', '6' ]
    },
    {   
        key: '5', type: 'version',
        title: 'أفضل مقال لعام 2016 مترجم إلى عدة لغات',
        paragraph: 'عندما تصل لهذه المرحلة، لن تجد نفسك مضطراً للخوض في أي نقاش أو جدال، ولو خضت فيه لن تحاول أن تثبت لمن يجادلك بأنه مخطئ ...'
    },
    {   
        key: '6', type: 'version',
        title: 'CAN YOU SAY...HERO?',
        paragraph: 'Once upon a time, a little boy loved a stuffed animal whose name was Old Rabbit. It was so old, in fact, that it was really an unstuffed animal;'
    },


]

module.exports = {
    databaseTableName: 'article',
    data: data,
    index: ['key']
}