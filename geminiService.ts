
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateWeddingQuote(groom: string, bride: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Hãy viết một câu danh ngôn tình yêu lãng mạn cho đám cưới của ${groom} và ${bride} bằng tiếng Việt. Ngắn gọn, súc tích, ý nghĩa. Chỉ trả về đúng câu nói.`,
    });
    return response.text || "Tình yêu là chìa khóa mở cánh cửa hạnh phúc.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hạnh phúc không phải là đích đến, mà là hành trình chúng ta đi cùng nhau.";
  }
}
