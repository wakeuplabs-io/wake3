import { MonorepoSpec } from "../src/services/MonorepoSpec";
import { checkbox, confirm } from "@inquirer/prompts";

jest.mock("@inquirer/prompts");

const REPO_NAME = "my-magic-monorepo";
const REPO_PATH = `/${REPO_NAME}`;

describe("MonorepoSpec", () => {
    let specGenerator: MonorepoSpec;

    beforeEach(() => {
        specGenerator = new MonorepoSpec(REPO_PATH);
    });

    it("configures the monorepo path correctly", async () => {
        (confirm as unknown as jest.Mock<Promise<boolean>>)
            .mockResolvedValueOnce(false) // User skips React monorepo
            .mockResolvedValueOnce(true); // User confirms monorepo creation

        const spec = await specGenerator.generate();

        expect(spec.monorepoPath).toBe(REPO_PATH);
    });

    it("does not specify react monorepo if not selected by the user", async () => {
        (confirm as unknown as jest.Mock<Promise<boolean>>)
            .mockResolvedValueOnce(false) // User skips React monorepo
            .mockResolvedValueOnce(true); // User confirms monorepo creation

        const spec = await specGenerator.generate();

        expect(spec.isReactMonorepo).toBe(false);
    });

    it("specifies React monorepo when selected by the user", async () => {
        (confirm as unknown as jest.Mock<Promise<boolean>>)
            .mockResolvedValueOnce(true) // User confirms React monorepo
            .mockResolvedValueOnce(true); // User confirms monorepo creation

        const spec = await specGenerator.generate();

        expect(spec.isReactMonorepo).toBe(true);
    });
});
