import { Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { UnitType } from "../entities/UnitType";

const unitTypeRepo: Repository<UnitType> = AppDataSource.getRepository(UnitType);

export const getUnitTypeById = async (id: string): Promise<UnitType | null> => {
    return await unitTypeRepo.findOne({ where: { id } });
};

export const getUnitTypeByName = async (name: string): Promise<UnitType | null> => {
    return await unitTypeRepo.findOne({ where: { name } });
};

export const removeUnitType = async (id: string): Promise<void> => {
    await unitTypeRepo.delete(id);
};

export const saveUnitType = async (unitType: UnitType): Promise<UnitType> => {
    return await unitTypeRepo.save(unitType);
};

export const getUnitTypes = async (): Promise<UnitType[]> => {
    return await unitTypeRepo.find({ order: { name: "ASC" } });
};

export default { getUnitTypeById, getUnitTypeByName, removeUnitType, saveUnitType, getUnitTypes };