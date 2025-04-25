import { Request, Response } from "express";
import unitTypeService from "../services/unitType.service";
import asyncHandler from "../utils/asyncHandler";

// most of these endpoints are not used in the frontend yet, but they are here for future use and to keep the code organized

export const getUnitTypes = asyncHandler(async (req: Request, res: Response) => {
  const result = await unitTypeService.getUnitTypes();
  res.json(result);
});

export const getUnitTypeById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await unitTypeService.getUnitTypeById(id);
    res.json(result);
    }
);

export const getUnitTypeByName = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.params;
    const result = await unitTypeService.getUnitTypeByName(name);
    res.json(result);
    }
);  

export const deleteUnitType = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await unitTypeService.deleteUnitType(id);
    res.status(204).send();
    }
);

export const updateUnitTypes = asyncHandler(async (req: Request, res: Response) => {
    await unitTypeService.updateUnitTypes();
    res.status(204).send();
    }
);