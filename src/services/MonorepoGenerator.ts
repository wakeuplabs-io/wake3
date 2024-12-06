import { existsSync, mkdirSync } from "fs";
import { MonorepoSpecGenerator, ProjectSpec } from "./spec/MonorepoSpecGenerator";
import path from "path";


export class MonorepoGenerator {
    private monorepoPath: string;

    constructor(monorepoPath: string) {
        this.monorepoPath = monorepoPath;
    }

    async create(): Promise<string> {
        const specGenerator = new MonorepoSpecGenerator(this.monorepoPath);
        const spec = await specGenerator.generate();
        return this.createFromSpec(spec);
    }

    async createFromSpec(spec: ProjectSpec): Promise<string> {
        if (!existsSync(spec.monorepoPath)) {
            //packages directory
            mkdirSync(path.join(spec.monorepoPath,"packages"), { recursive: true });
        }
        return spec.monorepoPath;
    };
};