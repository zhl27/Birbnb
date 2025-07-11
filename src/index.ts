import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.get("/healthcheck", (req: Request, res: Response) => {
	// res.send("Hello world !")
	res.json({
		status: "ok",
		timestamp: new Date().toISOString()
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
