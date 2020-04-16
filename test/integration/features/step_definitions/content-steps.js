import {Given} from 'cucumber';
import any from '@travi/any';

Given('there is no section content', async function () {
  this.existingContributingContent = '';
});

Given('there is existing section content', async function () {
  this.existingContributingContent = `
${any.sentence()}
`;
});
