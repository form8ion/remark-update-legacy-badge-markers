import {Given, Then} from 'cucumber';
import {assert} from 'chai';

Given('legacy badge markers exist', async function () {
  this.readmeContent = `# project-name

<!-- status badges -->

<!-- consumer badges -->

<!-- contribution badges -->
${this.existingContributingBadges}
${this.existingContributingContent}
`;
});

Then('modern badge zones are added', async function () {
  assert.equal(
    this.resultingContent,
    `# project-name

<!--status-badges start -->

<!--status-badges end -->

<!--consumer-badges start -->

<!--consumer-badges end -->

<!--contribution-badges start -->
${this.existingContributingBadges}
<!--contribution-badges end -->
${this.existingContributingContent}`
  );
});
