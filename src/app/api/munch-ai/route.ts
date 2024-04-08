import { prisma } from "@/utils/connect";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export const POST=async(req:NextRequest)=>{
    try {
        const { meal_type,cusiene_preference,dietary_preference,allergy,budget,health_goals,food_avoid} = await req.json();
        console.log(meal_type,cusiene_preference,dietary_preference,allergy,budget,health_goals,food_avoid)
        const foods = await prisma.product.findMany({});
        const foodTitles = foods.map((food) => {
            let title = food.title;
            if (food.options && food.options.length > 0) {
                const options = food.options.map((option:any) => option?.title).join(", ");
                title += ` (${options})`;
            }
            return title
        });
        const foodSentence = foodTitles.join(", ");
        const prompt=`I am seeking meal suggestions for ${meal_type}, and I enjoy ${cusiene_preference ? cusiene_preference : "all"} cuisine. I have ${dietary_preference ? dietary_preference : "no"} dietary restrictions, and I am allergic to ${allergy ? allergy : "nothing"}. My budget is ${budget ? 'Rs ' + budget : 'unlimited amount'}, and my health goals include ${health_goals ? health_goals : "nothing"}. I avoid eating ${food_avoid ? food_avoid : "nothing"}. Please provide suggestions only from ${foodSentence}, listed in order of preference. Ensure that the response is in HTML format, containing only a list of food names without HTML tags (i.e., using <ol> and <li> tags).
        `
        const geminiRes = await model.generateContent(prompt);
        const response = geminiRes?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log(response)
        return NextResponse.json({
            error:false,
            status:200,
            message:"Food suggestions generated successfully",
            data:response
        }, { status: 200 });
    } catch (error) {   
        console.log(error)
        return NextResponse.json({
            error:true,
            status:500,
            message:"Something went wrong"
        }, { status: 500 })
    }
}