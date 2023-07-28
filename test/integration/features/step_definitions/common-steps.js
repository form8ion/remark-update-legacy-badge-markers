import {When} from '@cucumber/cucumber';
import {remark} from 'remark';

// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import updateLegacyBadgeMarkers from '@form8ion/remark-update-legacy-badge-markers';

When('a node is processed', async function () {
  remark()
    .use(updateLegacyBadgeMarkers)
    .process(this.readmeContent, (err, file) => {
      if (err) throw err;

      this.resultingContent = `${file}`;
    });
});
