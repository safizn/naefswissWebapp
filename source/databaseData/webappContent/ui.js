let data = [
    {   key: 'title', type: 'aggregation', version: ['t1', 't2', 't3']  },
    {   key: 't1', type: 'version',
        title: {
            short: 'نايف أبو صويص',
            long: 'صفحة نايف أبو صويص الشخصية'
        }
    },
    {   key: 't2', type: 'version',
        title: {
            short: 'Naef Abu Swiss',
            long: 'Naef Abu Swiss personal site'
        }
    },
    {   key: 't3', type: 'version',
        title: {
            short: 'נאיף אבו סויס',
            long: 'אתר נאיף אבו סויס האישי'
        }
    },

    {   key: 'description', type: 'aggregation', version: ['d1', 'd2', 'd3'] },
    {
        key: 'd1', type: 'version',
        description: {
            about: 'مدير عام وصاحب مجموعة شركات "جازيت" المختصة في مجال البناء والهندسة والاستثمار.',
            who: 'صفحة نايف أبو صويص الشخصية'
        }
    },
    {   key: 'd2', type: 'version',
        description: {
            about: 'CEO & Owner of "Gazit" group, which is specialized in construction, engineering, and capital investment.',
            who: 'Businessman'
        }
    },
    {   key: 'd3', type: 'version',
        description: {
            about: 'CEO & Owner of "Gazit" group, which is specialized in construction, engineering, and capital investment.',
            who: 'Businessman'
        }
    },

    {   key: 'navigation', type: 'aggregation', version: ['n1', 'n2', 'n3'] },
    {
        key: 'n1', type: 'version',
        navigation: {
            aboutMe: 'نبذة عني',
            contact: 'تواصل معي',
            news: 'أخبار ومقالات',
            projects: 'مشاريع',
            resume: 'السيرة الذاتية',
        }
    },
    {   key: 'n2', type: 'version',
        navigation: {
            aboutMe: 'About Me',
            contact: 'Contact',
            news: 'News & Articles',
            projects: 'Projects',
            resume: 'Resume',
        }
    },
    {   key: 'n3', type: 'version',
        navigation: {
            aboutMe: 'אודות',
            contact: 'צור קשר',
            news: 'חדשות ומאמרים',
            projects: 'פרויקטים',
            resume: 'קורות חיים',
        }
    },

    {   key: 'status', type: 'aggregation', version: ['s1', 's2', 's3'] },
    {
        key: 's1', type: 'version',
        status: {
            notFound: {
                title: '😨 عذراً، لم يتم العثور على الصفحة المطلوبة ! ',
                description: 'ربما تم نقلها أو لم تعد متوفرة. يرجى الرجوع للصفحة الرئيسية'
            },
            underconstruction: {
                title: '🚧 الموقع تحت الصيانة',
                description: 'يرجى العودة لاحقاً.'
            },
        }
    },
    {   key: 's2', type: 'version',
        status: {
            notFound: {
                title: "😨 Oops, the page doesn't exist !",
                description: 'Please, return to the homepage.'
            },
            underconstruction: {
                title: '🚧 The site is under maintenance',
                description: 'We sincerely apologize for the inconvenience. We will be back soon !'
            },
        }
    },
    {   key: 's3', type: 'version',
        status: {
            notFound: {
                title: '😨 אופס! נראה שהגעת לעמוד לא קיים',
                description: 'תוכל לחזור לעמוד הבית.'
            },
            underconstruction: {
                title: '🚧 האתר תחת תחזוקה',
                description: 'אנו מצטערים על אי הנוחות, ומקווים לסיים את הטיפול בקרוב.'
            },
        }
    },


]

export default {
    databaseTableName: 'ui',
    data: data,
    index: ['key']
}