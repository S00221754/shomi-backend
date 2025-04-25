import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { UnitType } from "../entities/UnitType";

const unitTypeRepo: Repository<UnitType> = AppDataSource.getRepository(UnitType);

// Get a unit type by ID
export const getUnitTypeById = async (id: string): Promise<UnitType | null> => {
    return await unitTypeRepo.findOne({ where: { id } });
};

// Get a unit type by name
export const getUnitTypeByName = async (name: string): Promise<UnitType | null> => {
    return await unitTypeRepo.findOne({ where: { name } });
};

// Remove a unit type by ID (in the future only allowed by admin, or approved)
export const removeUnitType = async (id: string): Promise<void> => {
    await unitTypeRepo.delete(id);
};

// save a unit type
export const saveUnitType = async (unitType: UnitType): Promise<UnitType> => {
    return await unitTypeRepo.save(unitType);
};

// Get all unit types
export const getUnitTypes = async (): Promise<UnitType[]> => {
    return await unitTypeRepo.find({ order: { name: "ASC" } });
};

export default { getUnitTypeById, getUnitTypeByName, removeUnitType, saveUnitType, getUnitTypes };