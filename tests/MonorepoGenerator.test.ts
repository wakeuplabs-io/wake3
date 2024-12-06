import { checkbox, confirm } from "@inquirer/prompts";
import fs from "fs";
import tmp from "tmp";
import { MonorepoGenerator } from "../src/services/MonorepoGenerator";
import path from "path";
import { PACKAGES } from "../src/shared/constants";

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

  it("creates an empty project when no packages are selected", async () => {
    // Mock the package selection prompt to simulate no packages being selected.
    const noPackageSelection: string[] = [];
    (checkbox as unknown as jest.Mock<Promise<string[]>>).mockResolvedValue(noPackageSelection);
    // Confirm the monorepo creation
    (confirm as unknown as jest.Mock<Promise<boolean>>).mockResolvedValue(true);

    const repoRootPath = `${tempDir.name}/${REPO_NAME}`
    const monorepoGenerator = new MonorepoGenerator(repoRootPath);
    const generatedPath = await monorepoGenerator.create();

    expect(generatedPath).toEqual(repoRootPath);
    const directoryExists = fs.existsSync(`${repoRootPath}/packages`);
    expect(directoryExists).toBe(true);
  });
});
