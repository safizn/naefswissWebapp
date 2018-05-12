const   projectPath = "/project",
        applicationPath = `${projectPath}/application`,
        appDeploymentLifecyclePath = `${applicationPath}/dependency/appDeploymentLifecycle`,
        SourceCodePath = `${applicationPath}/source`,
        DestinationPath = `${applicationPath}/distribution`


module.exports = {
    directory: {
        projectPath, 
        appDeploymentLifecyclePath,
        SourceCodePath,
        DestinationPath,
        gulpPath: `${appDeploymentLifecyclePath}/entrypoint/build`,
        babelPath: `${appDeploymentLifecyclePath}/babel_javascriptTranspilation.js`,
        serverSidePath: `${SourceCodePath}/serverSide`,
        clientSidePath: `${SourceCodePath}/clientSide`,
    },
    databaseVersion: 1,
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
    },
    build: {
        clientSide: {
            native: {
                prefix: 'nativeClientSide'
            },
            polyfill: {
                prefix: 'polyfillClientSide'
            }
        }
    }
}