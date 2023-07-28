// #### Import
// remark-usage-ignore-next 2
import stubbedFs from 'mock-fs';
// eslint-disable-next-line import/order
import fs from 'node:fs';
import {remark} from 'remark';
import updateLegacyBadgeMarkers from './lib/index.js';

// remark-usage-ignore-next
stubbedFs();

// #### Execute

remark()
  .use(updateLegacyBadgeMarkers)
  .process(
    `# project-name

<!-- status badges -->

<!-- consumer badges  -->

<!-- contribution badges -->
`,
    (err, file) => {
      fs.writeFileSync(`${process.cwd()}/README.md`, `${file}`);
    }
  );

// remark-usage-ignore-next
stubbedFs.restore();
