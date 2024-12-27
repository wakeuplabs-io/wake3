#!/usr/bin/env node
import { Command } from "commander";
import { MonorepoGenerator } from "./services/MonorepoGenerator";

const program = new Command();

program
    .name("monorepo-cli")
    .description("CLI to create and manage a monorepo with multiple packages")
    .version("1.0.0");

// Command: create
program
    .command("create")
    .description("Creates a new monorepo")
    .option("-n, --name <name>", "Name of the monorepo", "my-monorepo")
    .action(async (options) => {
        const monorepoName = options.name;

        console.log(`🚀 Creating the monorepo: ${monorepoName}`);
        await MonorepoGenerator.create(monorepoName);

        console.log("✅ Monorepo successfully created!");
    });

// Process commands
program.parse();
