class ApiError extends Error { 
    code: number
    path: string
    data?: object
    constructor(message: string, code: number, path: string, data? : object){
        super(message)
        this.message = message
        this.code = code
        this.path = path
        this.data = data
    }
}


export default ApiError