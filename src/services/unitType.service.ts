import unitTypeRepository from "../repositories/unitTypeRepository";
import ingredientRepository from "../repositories/ingredientRepository";
import { UnitType } from "../entities/UnitType";

export const getUnitTypes = async (): Promise<UnitType[]> => {
    return await unitTypeRepository.getUnitTypes();
}

export const getUnitTypeById= async (id: string): Promise<UnitType | null> => {
    return await unitTypeRepository.getUnitTypeById(id);
};

export const getUnitTypeByName = async (name: string): Promise<UnitType | null> => {
    return await unitTypeRepository.getUnitTypeByName(name);
};

export const deleteUnitType = async (id: string): Promise<void> => {
    await unitTypeRepository.removeUnitType(id);
};

// depreated, but kept for future use
export const updateUnitTypes = async (): Promise<void> => {
    // Get all unique unit types used in the Ingredient table
    const usedUnitTypes = await ingredientRepository.getDistinctUnitTypes();

    // Get existing unit types
    const existingUnitTypes = await unitTypeRepository.getUnitTypes();
    const existingUnitTypeNames = existingUnitTypes.map((unitType) => unitType.name);

    const missingUnitTypes = usedUnitTypes.filter((name) => !existingUnitTypeNames.includes(name));

    for (const missingUnitType of missingUnitTypes) {
        const newUnitType = new UnitType();
        newUnitType.name = missingUnitType;
        await unitTypeRepository.saveUnitType(newUnitType);
    }
};

export default { getUnitTypeById, getUnitTypeByName, deleteUnitType, updateUnitTypes, getUnitTypes };