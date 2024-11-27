import { checkbox } from "@inquirer/prompts";
import { MonorepoGenerator } from "../src/services/MonorepoGenerator";

jest.mock("@inquirer/prompts");

const REPO_ROOT_PATH = "data/my-magic-monorepo";

describe("MonorepoGenerator", () => {
  it("creates an empty project when no packages are selected", async () => {
    // Mock the package selection prompt to simulate no packages being selected.
    const noPackageSelection: string[] = [];
    (checkbox as unknown as jest.Mock<Promise<string[]>>).mockResolvedValue(noPackageSelection);

    const monorepoGenerator = new MonorepoGenerator(REPO_ROOT_PATH);
    const generatedPath = await monorepoGenerator.create();

    expect(generatedPath).toEqual(REPO_ROOT_PATH);
  });
});
