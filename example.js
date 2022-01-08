// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import fs from 'fs';
import remark from 'remark';
import updateLegacyBadgeMarkers from './lib/index.cjs';

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
      fs.writeFileSync(`${process.cwd()}/README.md`, file.contents);
    }
  );

// remark-usage-ignore-next
stubbedFs.restore();
