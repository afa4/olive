function getConfig() {
    return {
        sqsUrl: isLocal() ? "http://localhost:9324/000000000000/ga-form-submition" : process.env.GA_FORM_SUBMITION_QUEUE_URL,
        sqsConfig: isLocal() ? { endpoint: "http://localhost:9324", region: "us-east-1" } : {},
        savePdfFunctionPath: isLocal() ? __dirname + '/save-pdf/local.js' : __dirname + 'save-pdf/drive.js'
    }
}

function isLocal() {
    return process.env.ENVIRONMENT === "local";
}

module.exports = { getConfig };