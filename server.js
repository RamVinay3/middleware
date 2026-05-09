const app=require('./index');
const connectDB=require('./configs/db');

const PORT = process.env.PORT || 5000;
console.log(PORT,"PORT");
(async()=>{
    try{
        await connectDB();
        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        });
    }
    catch(err){

        console.log("server startup failed",err);
        process.exit(1);

    }
})();



