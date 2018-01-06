process.env.SZN_DEBUG = true // show/hide console messages.

import { microservice } from 'appscript'
import configuration from '../../setup/configuration/configuration.js' 

microservice({ 
    configuration,
    entrypointConditionKey: '78f91938-f9cf-4cbf-9bc8-f97836ff23dd'
})