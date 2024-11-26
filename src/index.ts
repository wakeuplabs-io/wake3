#!/usr/bin/env node
import { Command } from "commander";
import { MonorepoGenerator } from "./services/MonorepoGenerator";
//import { PackageGenerator } from './services/PackageGenerator';

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
        const monorepoGenerator = new MonorepoGenerator(monorepoName);
        await monorepoGenerator.create();

        console.log("✅ Monorepo successfully created!");
    });

// Command: add-package
program
    .command("add-package <monorepo>")
    .description("Adds a package to an existing monorepo")
    .action(async (monorepo) => {
        console.log(`📦 Adding a package to the monorepo ${monorepo}`);
    });

// Process commands
program.parse();
