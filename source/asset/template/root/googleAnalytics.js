// Analytics
{% if(Application.config.deployment == 'production') { %} 
    window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-25921244-9');
{% } else { %} 
    console.info('☕ Analytics is disabled for development.')
{% } %}
