import { prisma } from "@/utils/connect";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export const POST=async(req:NextRequest)=>{
    try {
        const { meal_type,cusiene_preference,dietary_preference,allergy,budget,health_goals,food_avoid,taste_preference,type,ingredients_availability,time,cooking_skills,extra_requirements} = await req.json();
        let prompt="";
        if(type==="food_suggestion"){
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
            prompt=`I am seeking meal suggestions for ${meal_type}, and I enjoy ${cusiene_preference ? cusiene_preference : "all"} cuisine. I prefer ${dietary_preference ? dietary_preference : "all"} dietary , and I am allergic to ${allergy ? allergy : "nothing"}.My taste preferenece is ${taste_preference?taste_preference:"nothing specific"}. My budget is ${budget ? 'Rs ' + budget : 'unlimited amount'}, and my health goals include ${health_goals ? health_goals : "nothing"}. I avoid eating ${food_avoid ? food_avoid : "nothing"}. Please provide suggestions only from ${foodSentence}, listed in order of preference.  Ensure that the response is in HTML format, without html tag, containing only a list of food names. Do proper styling using inline css use proper tags like h1, h2, ol, li, do not change color of any text. Ensure that response is always a valid HTML document only.
            `
        }
        else if(type==="recipe_suggestion"){
            prompt=`I am seeking food recipie suggestions for ${meal_type}, and I enjoy ${cusiene_preference ? cusiene_preference : "all"} cuisine. I prefer ${dietary_preference ? dietary_preference : "all"} dietary , and I am allergic to ${allergy ? allergy : "nothing"}.My taste preferenece is ${taste_preference?taste_preference:"nothing specific"}. My budget is ${budget ? 'Rs ' + budget : 'unlimited amount'}, and my health goals include ${health_goals ? health_goals : "nothing"}. I avoid eating ${food_avoid ? food_avoid : "nothing"}. I have availability of ${ingredients_availability?ingredients_availability:"all"} ingredients and I have ${time?time:"enough"} cooking  time.I am ${cooking_skills?cooking_skills:"beginner"} in cooking. ${extra_requirements}. Ensure that the response is in HTML format, without html tag and give me recipie for only one food item include images in html content only if a image link is accessible publicly do proper styling using inline css use proper tags like h1, h2, ol, li, do not change color of any text. Ensure that response is always a valid HTML document only.`
        }
        const geminiRes = await model.generateContent(prompt);
        const response = geminiRes?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
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