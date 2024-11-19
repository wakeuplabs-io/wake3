#!/usr/bin/env node

import { Command } from 'commander';
import { MonorepoGenerator } from './services/MonorepoGenerator';
//import { PackageGenerator } from './services/PackageGenerator';

const program = new Command();

program
  .name('monorepo-cli')
  .description('CLI para generar y gestionar un monorepo con múltiples paquetes')
  .version('1.0.0');

// Comando: create
program
  .command('create')
  .description('Crea un nuevo monorepo')
  .option('-n, --name <name>', 'Nombre del monorepo', 'my-monorepo')
  .action(async (options) => {
    const monorepoName = options.name;

    console.log(`🚀 Creando el monorepo: ${monorepoName}`);
    const monorepoGenerator = new MonorepoGenerator(monorepoName);
    await monorepoGenerator.create();

   /*  for (const pkg of selectedPackages) {
      const packageGenerator = new PackageGenerator(monorepoName, pkg);
      await packageGenerator.generate();
    } */

    console.log("✅ ¡Monorepo creado con éxito!");
  });

// Comando: add-package
program
  .command('add-package <monorepo>')
  .description('Agrega un paquete a un monorepo existente')
  .action(async (monorepo) => {
   

    console.log(`📦 Agregando el paquete al monorepo ${monorepo}`);
   /*  const packageGenerator = new PackageGenerator(monorepo, packageType);
    await packageGenerator.generate();
 */
//    console.log(`✅ Paquete ${packageType} agregado exitosamente.`);
  });

// Procesar comandos
program.parse();
