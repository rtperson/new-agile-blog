import { Response } from "express";

export const title = "Gathering Agility";

export function setLayout(res: Response): any {
    res.render("index", { title: title });
}
