export const config = {
    runner: 'local',
    
    specs: [
        './test/specs/**/*.test.js'
    ],
    
    exclude: [],
    
    maxInstances: 1,
    
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-gpu',
                '--window-size=1920,1080',
                '--no-sandbox',
                '--disable-dev-shm-usage'
            ]
        }
    }],
    
    logLevel: 'info',
    
    bail: 0,
    
    baseUrl: 'https://app.thecasework.com',
    
    waitforTimeout: 15000,
    
    connectionRetryTimeout: 120000,
    
    connectionRetryCount: 3,
    
    services: [],
    
    framework: 'mocha',
    
    reporters: ['spec'],
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 90000
    }
}