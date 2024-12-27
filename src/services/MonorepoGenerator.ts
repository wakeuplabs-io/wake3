import { cpSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { MonorepoSpec, ProjectSpec } from "./MonorepoSpec";


export class MonorepoGenerator {

    static readonly EMPTY_MONOREPO_TEMPLATE_PATH = path.join(__dirname, '../../templates', 'empty-monorepo');
    static readonly REACT_MONOREPO_TEMPLATE_PATH = path.join(__dirname, '../../templates', 'react-monorepo');

    private constructor() { }

    async createFromSpec(spec: ProjectSpec): Promise<string> {

        // Ensure the monorepo path directory exists
        if (!existsSync(spec.monorepoPath)) {
            mkdirSync(spec.monorepoPath, { recursive: true });
        }

        // Determine the template
        const templatePath = spec.isReactMonorepo
            ? MonorepoGenerator.REACT_MONOREPO_TEMPLATE_PATH
            : MonorepoGenerator.EMPTY_MONOREPO_TEMPLATE_PATH;

        // Create the template
        cpSync(templatePath, spec.monorepoPath, { recursive: true });

        return spec.monorepoPath;
    };

    static async create(monorepoPath: string): Promise<string> {
        const specGenerator = new MonorepoSpec(monorepoPath);
        const spec = await specGenerator.generate();

        const monorepoGenerator = new MonorepoGenerator();
        return monorepoGenerator.createFromSpec(spec);
    }

    static async createFromSpec(spec: ProjectSpec): Promise<string> {
        const monorepoGenerator = new MonorepoGenerator();
        return monorepoGenerator.createFromSpec(spec);
    }
};