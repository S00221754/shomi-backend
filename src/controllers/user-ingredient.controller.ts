import { Request, Response } from "express";
import userIngredientService from "../services/userIngredient.service";
import asyncHandler from "../utils/asyncHandler";
import { UpdateUserIngredientDTO, UserIngredientInput } from "types/userIngredient";

export const createUserIngredient = asyncHandler(async (req: Request, res: Response) => {
    const userIngredientInput: UserIngredientInput = req.body; //need to fix frontend for sending an object and not flat data.
    const result = await userIngredientService.addUserIngredient(userIngredientInput);
    res.status(201).json({ id: result.id });
});

export const getUserIngredients = asyncHandler(async (req: Request, res: Response) => {
    const userid = req.params.id;
    const result = await userIngredientService.getUserIngredients(userid);
    res.status(200).json(result);
});

export const getUserIngredientById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userIngredientService.getUserIngredientById(id);
    res.status(200).json(result);
});

export const updateUserIngredient = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedIngredient: UpdateUserIngredientDTO = req.body;

    const result = await userIngredientService.updateUserIngredient(id, updatedIngredient);
    res.status(200).json(result);
});

export const quickRestockUserIngredient = asyncHandler(async (req: Request, res: Response) => {
    const userIngredientId = req.params.id;
    const result = await userIngredientService.quickRestockUserIngredient(userIngredientId);
    res.status(200).json(result);
});

export const deleteUserIngredient = asyncHandler(async (req: Request, res: Response) => {
    console.log(req);
    
    const ids: string[] = req.body.userIngredientIds;
    await userIngredientService.deleteUserIngredient(ids);
    res.status(204).send();
});

export const getUserIngredientByIngredientId = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const ingredientId = req.params.ingredientId;
    const result = await userIngredientService.getUserIngredientByIngredientId(userId, ingredientId);
    res.status(200).json(result);
});