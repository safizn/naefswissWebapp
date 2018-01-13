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
    entrypoint: {
        build: {
            file: `${appDeploymentLifecyclePath}/entrypoint/build/build.js`,
            argument: {}
        },
        run: {
            file: `${appDeploymentLifecyclePath}/entrypoint/run/run.js`,
        },
        test: {
            file: `${appDeploymentLifecyclePath}/entrypoint/test/test.js`,
        },
    }
}