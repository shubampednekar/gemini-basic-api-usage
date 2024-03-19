import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';
import fs from 'fs';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const fromTextOnlyInput = async (req,res) => {
    try {
        const { prompt } = req.body;
        const generationConfig = {
            
            temperature: 0.1
          };
        const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});
        

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return res.send(text);
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
    
}

export const fromTextAndImageInput = async (req,res) => {
    try {
        const { prompt, imagepath, mimetype } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const imageParts = [
            fileToGenerativePart( imagepath, mimetype),
        ];

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();
        return res.send(text);
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
    
}
function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
  }

  export const multiTurnChat = async (req,res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const chat = model.startChat({
            history: [
            {
                role: "user",
                parts: [{ text: "Hello, I have 5 cars in my house. My favourite one is Suzuki 800 and I hate the toyota fortuner the most which is very bad for fuel efficiency but i like it for its luxury" }],
            },
            {
                role: "model",
                parts: [{ text: "Great to know that. What would you like to know about cars?" }],
            },
            ],
            generationConfig: {
            maxOutputTokens: 100,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        return res.send(text);
        
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
    
}

export const streamingMsg = async (req,res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContentStream(prompt);
        let text = '';
        for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
        }
        return res.send(text);
        
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
    
}

export const generateEmbeddings = async (req,res) => {
    try {
        const { prompt } = req.body;
        
        const model = genAI.getGenerativeModel({ model: "embedding-001"});
        const result = await model.embedContent(prompt);
        const embedding = result.embedding;
        return res.send(embedding.values);
        
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
    
}