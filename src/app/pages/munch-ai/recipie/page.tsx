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
      setRes(response.data.data);
      setVisible(true);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
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

      {res && visible && (
        <div className="min-h-screen w-full backdrop-blur-md absolute flex items-center justify-center">
          <div className="w-full h-fit md:w-1/2 flex items-center justify-center ">
            <div className="w-auto h-1/2 bg-white dark:bg-darkGradient2 rounded-md p-4 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <h1 className="font-bold text-main text-xl">Suggested Food</h1>
                <p
                  className="cursor-pointer font-bold"
                  onClick={() => setVisible(false)}
                >
                  X
                </p>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: res }}
                className="text-start space-y-2 overflow-y-auto"
              ></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MUNCHAI;
