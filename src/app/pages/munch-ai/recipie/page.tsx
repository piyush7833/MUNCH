"use client";
import React, { use, useState } from "react";
import { baseUrl } from "@/baseUrl";
import ImgContainer from "@/components/common/ImgContainer";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import FormContainer from "@/components/common/FormContainer";
import {
  predictFoodFormData,
  predictFoodRecipieFormData,
} from "@/utils/formData";
import { foodPrecictionType, recipiePrecictionType } from "@/types/types";
import { httpservice } from "@/utils/httpService";
import HtmlDataDialog from "@/components/common/HtmlDataDialog";
// import HtmlDataDialog from "@/components/common/htmlDataDialog";

const MUNCHAI = () => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<recipiePrecictionType>();
  const [res, setRes] = useState<any>();
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setLoading(true);
      const response = await httpservice.post(`${baseUrl}/munch-ai`, {
        meal_type: formData?.meal_type,
        cusiene_preference: formData?.cusiene_preference,
        dietary_preference: formData?.dietary_preference,
        allergies: formData?.allergies,
        budget: formData?.budget,
        health_goals: formData?.health_goals,
        food_avoid: formData?.food_avoid,
        taste_preference:formData?.taste_preference,
        ingredients_availability:formData?.ingredients_availability,
        time:formData?.time,
        cooking_skills:formData?.cooking_skills,
        extra_requirements:formData?.extra_requirements,
        type:"recipe_suggestion"
      });
      // console.log(response,"response")
      // console.log(response.data.data,"res.data.data")
      setRes(response.data.data);
      // console.log(res,"res")
      // console.log(visible,"visible1")
      setVisible(true);
      // console.log(visible,"visible2")
      setLoading(false);
    } catch (error: any) {
      console.log(error,"error from try catch");
      setLoading(false);

      toast.error(error.response.data.message);
    }
  };
  const handleSave = async (formDetails: recipiePrecictionType) => {
    try {
      setFormData(formDetails);
      setConfirmOpen(true);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={`main flex flex-col md:flex-row gap-14 md:gap-4 items-center justify-center hideScrollBar w-full`}>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmit}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
      />
      <div className=" w-full h-1/2 md:h-1/2 md:w-1/2 flex items-center justify-center">
        <ImgContainer
          type="singleProduct"
          alt="add image"
          imgUrl="/images/better.png"
        />
      </div>
      <FormContainer
        onSave={handleSave}
        data={predictFoodRecipieFormData}
        title="Get Food Recipies"
        loading={loading}
        btnText="Get Food Recipies"
      />

{(res && visible )&& <HtmlDataDialog title="Suggested Recipie" onClose={()=>{setVisible(false);}} content={res}/>}
    </div>
  );
};

export default MUNCHAI;
