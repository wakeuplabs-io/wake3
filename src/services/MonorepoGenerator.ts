import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { checkbox, Separator } from "@inquirer/prompts";
import { PACKAGES } from "../shared/constants";
import { Web3Generator } from "./Web3Generator";

export class MonorepoGenerator {
    private monorepoPath: string;

    constructor(monorepoPath: string) {
        this.monorepoPath = monorepoPath;
    }

    async create(): Promise<string> {
        const answer = await checkbox({
            message: "Select packages",
            choices: [
                { name: "web3", value: PACKAGES.WEB3 },
                { name: "api", value: PACKAGES.API },
                { name: "ui", value: PACKAGES.UI },
            ],
        });
        console.log(answer);
        for (const packageType of answer) {
            const pkgPath = path.join(
                this.monorepoPath,
                "packages",
                packageType
            );
            switch (packageType) {
                case PACKAGES.WEB3:
                    const Web3Service = new Web3Generator(pkgPath);
                    await Web3Service.create();
                    break;
                case PACKAGES.API:
                    break;
                case PACKAGES.UI:
                    break;
                default:
                    break;
            }
        }
        return this.monorepoPath;
    }
}
