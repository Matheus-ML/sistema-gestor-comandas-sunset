
import { GoogleGenAI, Type } from "@google/genai";

// Initializing with direct process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseSmartAdd = async (input: string, products: any[]) => {
  const productListStr = products.map(p => `${p.name} ($${p.price})`).join(', ');
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      User wants to add items to a POS tab using this text: "${input}".
      Available products: [${productListStr}].
      
      Match the user's intent to the available products. 
      If a product isn't found, try to find the closest match or ignore it.
      Return a JSON array of objects with { "productName": string, "quantity": number }.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            quantity: { type: Type.NUMBER }
          },
          required: ["productName", "quantity"]
        }
      }
    }
  });

  try {
    // response.text is a property; using trim() for safety
    return JSON.parse(response.text?.trim() || '[]');
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return [];
  }
};
