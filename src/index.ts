import { app } from "./app";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3003;

app.listen(PORT, () => {
    console.log('...server started in port ' + PORT)
})


