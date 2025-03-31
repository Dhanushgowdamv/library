class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode
    }
}

export  const errorMiddleware = ( err,req,res ,next)=>{
    err.message = err.message || "intrnal server error";
    err.statusCode = err.statusCode || 500

        if(err.code === 11000){
            const statusCode = 400;
            const message = 'duplicate filed value entere ';
            err =  new ErrorHandler(message, statusCode)
        }

        if(err.name === "jsonwebtokenError"){
            const statusCode = 400;
            const message = 'jwt is invalid ';
            err =  new ErrorHandler(message, statusCode)

        }

        if(err.name === "tokenExpiredError"){
            const statusCode = 400;
            const message = 'jwt is expired ';
            err =  new ErrorHandler(message, statusCode)

        }
        if(err.name === "castError"){
            const statusCode = 400;
            const message = `resoures not found invalid: ${err.path} `;
            err =  new ErrorHandler(message, statusCode)

        }


        const errorMessage = err.errors 
        ? Object.values(err.errors)
        .map((error)=>error.message)
        .join(" ")
        :err.message;



        return res.status(err.statusCode).json({
            success:false,
            message:errorMessage,
        })

}


export default ErrorHandler