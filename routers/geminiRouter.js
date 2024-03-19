import express from "express";
import { fromTextOnlyInput , fromTextAndImageInput, multiTurnChat, streamingMsg, generateEmbeddings} from "../controllers/geminiControllers.js";
const geminiRouter = express.Router();

geminiRouter.post("/prompt",fromTextOnlyInput);
geminiRouter.post("/imageprompt",fromTextAndImageInput);
geminiRouter.post("/chat",multiTurnChat);
geminiRouter.post("/stream",streamingMsg);
geminiRouter.post("/embeddings",generateEmbeddings);
// geminiRouter.post("/search",searchFile);
// geminiRouter.post("/structure",pdfGenerate);





export default geminiRouter;
