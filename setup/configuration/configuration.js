const projectPath = "/project"

module.exports = {
    projectPath, 
    appDeploymentLifecyclePath: `${projectPath}/application/dependency/appDeploymentLifecycle`,
    databaseVersion: 1,
    GulpPath: `${projectPath}/application/setup/build`, // TODO: is it actually needed. remove if possible.
    SourceCodePath: `${projectPath}/application/source`,
    DestinationPath: `${projectPath}/application/distribution`,
    entrypoint: {
        build: {
            file: `${projectPath}/application/setup/entrypoint/build.js`,
        },
        run: {
            file: `${projectPath}/application/setup/entrypoint/run.js`,
        },
        test: {
            file: `${projectPath}/application/setup/entrypoint/test.js`,
        },
    }
}