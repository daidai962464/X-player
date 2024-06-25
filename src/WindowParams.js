class WindowParams {
    constructor(width, height, loadFile, options = {}, request = {}) {
        this.width = width;
        this.height = height;
        this.loadFile = loadFile;
        this.options = options;
        this.request = request;
    }
}

module.exports = WindowParams;