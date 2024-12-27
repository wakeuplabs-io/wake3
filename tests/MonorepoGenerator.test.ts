import { checkbox, confirm } from "@inquirer/prompts";
import { compareSync } from "dir-compare";
import tmp from "tmp";
import { MonorepoGenerator } from "../src/services/MonorepoGenerator";
import { ProjectSpec } from "../src/services/MonorepoSpec";

jest.mock("@inquirer/prompts");

const REPO_NAME = "my-magic-monorepo";

describe("MonorepoGenerator", () => {
  let tempDir: tmp.DirResult;

  beforeEach(() => {
    tempDir = tmp.dirSync({ unsafeCleanup: true });
  });

  afterEach(() => {
    tempDir.removeCallback();
  });

  it("generates an empty monorepo when react monorepo is not selected", async () => {
    (confirm as unknown as jest.Mock<Promise<boolean>>)
      .mockResolvedValueOnce(false) // User skips React monorepo
      .mockResolvedValueOnce(true); // User confirms monorepo creation

    const repoRootPath = `${tempDir.name}/${REPO_NAME}`
    const generatedPath = await MonorepoGenerator.create(repoRootPath);

    expect(generatedPath).toEqual(repoRootPath);

    const emptyMonorepoPath = "./templates/empty-monorepo"
    const comparisonResult = compareSync(emptyMonorepoPath, repoRootPath, {
      compareContent: true,
    });

    expect(comparisonResult.same).toBe(true);

  });

  it("generates a react monorepo when specified in the project spec", async () => {
    const repoRootPath = `${tempDir.name}/${REPO_NAME}`
    const spec: ProjectSpec = {
      monorepoPath: repoRootPath,
      isReactMonorepo: true
    }
    const generatedPath = await MonorepoGenerator.createFromSpec(spec);

    expect(generatedPath).toEqual(repoRootPath);

    const reactMonorepoPath = "./templates/react-monorepo"
    const comparisonResult = compareSync(reactMonorepoPath, repoRootPath, {
      compareContent: true,
    });

    expect(comparisonResult.same).toBe(true);

  });
});
