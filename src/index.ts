import { initApp } from "./app";
import { runDB } from "./utils/db";

const app = initApp();

const startApp = () => {
    const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3003;
    runDB();

    app.listen(PORT, () => {
        console.log('...server started in port ' + PORT)
    })

}

startApp();

