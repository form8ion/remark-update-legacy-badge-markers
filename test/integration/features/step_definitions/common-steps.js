import {When} from 'cucumber';
import remark from 'remark';
import updateLegacyBadgeMarkers from '../../../../lib/index.cjs';

When('a node is processed', async function () {
  remark()
    .use(updateLegacyBadgeMarkers)
    .process(this.readmeContent, (err, file) => {
      if (err) throw err;

      this.resultingContent = file.contents;
    });
});
