import {Given} from 'cucumber';
import any from '@travi/any';

Given('there are existing badges', async function () {
  this.existingContributingBadges = `
[![${any.word()}][${any.word()}-badge]][${any.word()}-link]
[![${any.word()}][${any.word()}-badge]][${any.word()}-link]
`;
});

Given('there are no existing badges', async function () {
  this.existingContributingBadges = '';
});
