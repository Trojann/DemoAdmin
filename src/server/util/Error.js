class Error {
    constructor(code = 0, message = '', data) {
        this.code = code;
        this.message = message;
        if (data) {
            this.data = data;
        }
    }

    extendsWithData(data) {
        var code = this.code;
        var message = this.message;

        return new Error(code, message, data);
    }
}

export default Error;