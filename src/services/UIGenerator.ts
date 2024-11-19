

import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { checkbox, Separator } from '@inquirer/prompts';
import { PACKAGES } from '../shared/constants';

export class UIGenerator {
    private path: string
    constructor(path: string) {
        this.path = path
    }

    async create(): Promise<void> {
     const answer = await checkbox({
      message: 'Select ?',
      choices: [
        { name: 'a', value: PACKAGES.WEB3 },
        { name: 'b', value: PACKAGES.API },
        { name: 'c', value: PACKAGES.UI }
      ],
    });
     console.log(answer);
        /* const pkgPath = path.join(this.monorepoPath, 'packages', this.packageType);
        mkdirSync(pkgPath, { recursive: true });

        if (this.packageType === 'ui') {
            await this.configureUI(pkgPath);
        } else if (this.packageType === 'api') {
            await this.configureAPI(pkgPath);
        } else if (this.packageType === 'web3') {
            await this.configureWeb3(pkgPath);
        }

        console.log(`✅ Paquete ${this.packageType} configurado en ${pkgPath}`); */
    }

    
}
