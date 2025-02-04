import { Request, Response } from "express";
import userIngredientService from "../services/userIngredient.service";
import asyncHandler from "../utils/asyncHandler";
import { UserIngredientInput } from "types/userIngredient";

export const createUserIngredient = asyncHandler(async (req: Request, res: Response) => {
    const userIngredientInput: UserIngredientInput = req.body;
    const result = await userIngredientService.addUserIngredient(userIngredientInput);
    res.status(201).json({ id: result.id });
});

export const getUserIngredients = asyncHandler(async (req: Request, res: Response) => {
    const userid = req.params.id;
    const result = await userIngredientService.getUserIngredients(userid);
    res.status(200).json(result);
});