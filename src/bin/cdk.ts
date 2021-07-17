#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { App } from '../lib/stacks/App';
import { Identity } from '../lib/stacks/Identity';

const app = new cdk.App();

new Identity(app, 'Identity');

new App(app, 'Infrastructure', {
   env: {
      region: 'us-east-1',
   },
});
