const   projectPath = "/project",
        applicationPath = `${projectPath}/application`,
        appDeploymentLifecyclePath = `${applicationPath}/dependency/appDeploymentLifecycle`

module.exports = {
    projectPath, 
    appDeploymentLifecyclePath,
    databaseVersion: 1,
    GulpPath: `${appDeploymentLifecyclePath}/entrypoint/build`, // TODO: is it actually needed. remove if possible.
    SourceCodePath: `${applicationPath}/source`,
    DestinationPath: `${applicationPath}/distribution`,
    dockerImageName: 'naefswiss-webapp',
    domain: 'naifaboswiss.com',
    hostStorageFolderName: 'naifaboswiss', // remote production folder
    stackName: 'naifaboswisswebapp',
    entrypoint: {
        build: {
            file: `${appDeploymentLifecyclePath}/entrypoint/build/build.js`,
            argument: {}
        },
        production: {
            file: `${appDeploymentLifecyclePath}/entrypoint/production/deployProduction.js`,
        },
        run: {
            file: `${appDeploymentLifecyclePath}/entrypoint/run/run.js`,
        },
        test: {
            file: `${appDeploymentLifecyclePath}/entrypoint/test/test.js`,
        },
    }
}