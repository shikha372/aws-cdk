///! show
import * as path from 'path';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as core from 'aws-cdk-lib';
import * as flink from '../lib';

const app = new core.App();
const stack = new core.Stack(app, 'FlinkAppTest');

const flinkApp = new flink.Application(stack, 'App', {
  code: flink.ApplicationCode.fromAsset(path.join(__dirname, 'code-asset')),
  runtime: flink.Runtime.FLINK_1_19,
});

new cloudwatch.Alarm(stack, 'Alarm', {
  metric: flinkApp.metricFullRestarts(),
  evaluationPeriods: 1,
  threshold: 3,
});
///! hide

app.synth();
