import app from "./app.js";

const main=()=>{
    app.listen(app.get('port'), () => {
        console.log(`Server en puerto ${app.get('port')}`);
    });
}

main();

