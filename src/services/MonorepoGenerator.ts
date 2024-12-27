import { cpSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { MonorepoSpec, ProjectSpec } from "./MonorepoSpec";


export class MonorepoGenerator {

    static readonly EMPTY_MONOREPO_TEMPLATE_PATH = path.join(__dirname, '../../templates', 'empty-monorepo');

    private constructor() { }

    async createFromSpec(spec: ProjectSpec): Promise<string> {
        if (!existsSync(spec.monorepoPath)) {
            mkdirSync(spec.monorepoPath, { recursive: true });
        }

        cpSync(MonorepoGenerator.EMPTY_MONOREPO_TEMPLATE_PATH, spec.monorepoPath, { recursive: true });
        return spec.monorepoPath;
    };

    static async create(monorepoPath: string): Promise<string> {
        const specGenerator = new MonorepoSpec(monorepoPath);
        const spec = await specGenerator.generate();

        const monorepoGenerator = new MonorepoGenerator();
        return monorepoGenerator.createFromSpec(spec);
    }
};