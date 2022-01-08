import {Given} from '@cucumber/cucumber';
import any from '@travi/any';

Given('there are existing badges', async function () {
  const badge1ImageRef = `${any.word()}-badge`;
  const badge1LinkRef = `${any.word()}-link`;
  const badge2ImageRef = `${any.word()}-badge`;
  this.existingContributingBadges = `
[![${(any.word())}][${badge1ImageRef}]][${badge1LinkRef}]
![${(any.word())}][${badge2ImageRef}]
[![${any.word()}](${any.url()})](${any.url()})
![${any.word()}](${any.url()})
`;
  this.existingDefinitions = `[${badge1ImageRef}]: ${any.url()}

[${badge2ImageRef}]: ${any.url()}

[${badge1LinkRef}]: ${any.url()}`;
});

Given('there are no existing badges', async function () {
  this.existingContributingBadges = '';
  this.existingDefinitions = '';
});
