import { checkbox, confirm } from "@inquirer/prompts";
import path from "path";
import { PACKAGES } from "../../shared/constants";
import { Web3Generator } from "../Web3Generator";


export interface ProjectSpec {
    selectedPackages: string[];
    monorepoPath: string;
}

export class MonorepoSpecGenerator {
    private monorepoPath: string;

    constructor(monorepoPath: string) {
        this.monorepoPath = monorepoPath;
    }

    async generate(): Promise<ProjectSpec> {

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
        // Confirmation to proceed with the provided path
        const confirmPath = await confirm({
            message: `The monorepo will be created at the path "${this.monorepoPath}". Do you want to proceed?`,
            default: true,
        });

        if (!confirmPath) {
            console.log("Confirmation declined. Please run the generator again.");
            process.exit(1);
        }

        return {
            selectedPackages: answer,
            monorepoPath: this.monorepoPath,
        };
    }
}
