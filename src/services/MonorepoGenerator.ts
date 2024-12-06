import { cpSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { MonorepoSpecGenerator, ProjectSpec } from "./spec/MonorepoSpecGenerator";


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
            mkdirSync(spec.monorepoPath, { recursive: true });
        }

        const emptyMonorepoPath = path.join(__dirname, '../../templates', 'empty-monorepo')
        cpSync(emptyMonorepoPath, spec.monorepoPath, { recursive: true });

        return spec.monorepoPath;
    };
};