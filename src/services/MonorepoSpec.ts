import { confirm, input } from "@inquirer/prompts";


export interface ProjectSpec {
    monorepoPath: string;
    isReactMonorepo?: boolean
}

export class MonorepoSpec {

    constructor(private monorepoPath?: string) {
    }

    async generate(): Promise<ProjectSpec> {

        // Prompt for the path if it is not defined or is empty
        if (!this.monorepoPath?.trim()) {
            this.monorepoPath = await input({
                message: "Please specify the path where the monorepo will be created:",
            });

            if (!this.monorepoPath?.trim()) {
                console.log("A valid path is required to proceed.");
                process.exit(1);
            }
        }

        const isReactMonorepo = await confirm({
            message: "Would you like to create a React monorepo?",
            default: false,
        });

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
            monorepoPath: this.monorepoPath,
            isReactMonorepo: isReactMonorepo
        };
    }
}
