let data = [
    {
        key: 'a1',
        type: 'aggregation',
        label: {
            name: 'grouped article x'
        },
        version: [
            '1', 
            '2'
        ]
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
    {
        type: 'version',
        key: '1',
        title: 'سلوكك على الإنترنت يكشف أولوياتك".. كيف ترتب الخوارزميات حياتنا؟',
        paragraph: 'بشكل أو بآخر، يُمكن تشبيه الشبكات الاجتماعية بالصحف الورقية التي كانت يوما ما المصدر الرئيس لقراءة آخر الأخبار. إلا أن ثورة الإنترنت أزاحت الصحف، ليصبح الإنترنت مصدر الأفراد الأول -لدى قطاعات واسعة من المجتمع- لاستقاء المعلومات. وبظهور الأجهزة الذكية جاءت الشبكات الاجتماعية لتُصبح المكان الأمثل للحصول على تلك الأخبار، وبشكل آني.        '
    },
    {
        type: 'version',
        key: '2',
        title: 'Saudi billionaire Alwaleed "released" from detention',
        paragraph: 'Prominent Saudi businessman Prince Alwaleed bin Talal has been released after more than two months of detention on allegations of corruption, according to a family source.        '
    }

]

module.exports = {
    databaseTableName: 'article',
    data: data,
    index: ['key']
}