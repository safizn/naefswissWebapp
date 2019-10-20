import configuration from '../../configuration' 
import { microservice } from 'appscript'
import databaseData from '../databaseData/databaseData.js'

;(async () => {
    microservice({
        configuration,
        entrypointConditionKey: '78f91938-f9cf-4cbf-9bc8-f97836ff23dd',
        databaseData: await databaseData()
    })
})() 