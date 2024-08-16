// asyncHandler ek (wrapper func) jaisa hai jise har jagah use kar sakte hai taaki bar bar ek hi codes na likhna pare  

// PROMISES WALA

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export { asyncHandler }



// TRY - CATCH WALA

// const asyncHandler = () => { }
// const asyncHandler = (func) => () => { } //higher order function
// const asyncHandler = (func) => { () => { } }
// const asyncHandler = (func) => async () => { }

// const asyncHandler = (func) => async (req, res, next) => {
//     try {
//         await func(req, res, next)
//
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }  