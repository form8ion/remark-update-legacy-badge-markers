// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import fs from 'fs';
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
