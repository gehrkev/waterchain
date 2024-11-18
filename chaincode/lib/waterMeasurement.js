'use strict';

const { Contract } = require('fabric-contract-api');

class WaterMeasurementContract extends Contract {

  async initLedger(ctx) {
    console.info('============= START : Initialize Ledger ===========');
    console.info('============= END : Initialize Ledger ===========');
  }

  async createMeasurement(ctx, measurementId, data) {
    console.info('============= START : Create Measurement ===========');

    const measurement = {
      id: measurementId,
      data: JSON.parse(data),
      type: 'measurement',
      status: 'PENDING',
      validations: [],
      timestamp: new Date().toISOString(),
      docType: 'measurement'
    };

    await ctx.stub.putState(measurementId, Buffer.from(JSON.stringify(measurement)));
    console.info('============= END : Create Measurement ===========');
    return JSON.stringify(measurement);
  }

  async validateMeasurement(ctx, measurementId, organizationType, validationData) {
    console.info('============= START : Validate Measurement ===========');

    const measurementAsBytes = await ctx.stub.getState(measurementId);
    if (!measurementAsBytes || measurementAsBytes.length === 0) {
      throw new Error(`Measurement ${measurementId} does not exist`);
    }

    const measurement = JSON.parse(measurementAsBytes.toString());

    // Check if organization already validated
    const existingValidation = measurement.validations.find(v => v.organization === organizationType);
    if (existingValidation) {
      throw new Error(`Organization ${organizationType} already validated this measurement`);
    }

    // Add new validation
    const validation = {
      organization: organizationType,
      timestamp: new Date().toISOString(),
      data: JSON.parse(validationData)
    };

    measurement.validations.push(validation);

    // Update status based on validations
    if (measurement.validations.length >= 3) { // All orgs validated
      measurement.status = 'APPROVED';
    }

    await ctx.stub.putState(measurementId, Buffer.from(JSON.stringify(measurement)));
    console.info('============= END : Validate Measurement ===========');
    return JSON.stringify(measurement);
  }

  async queryMeasurement(ctx, measurementId) {
    const measurementAsBytes = await ctx.stub.getState(measurementId);
    if (!measurementAsBytes || measurementAsBytes.length === 0) {
      throw new Error(`Measurement ${measurementId} does not exist`);
    }
    return measurementAsBytes.toString();
  }

  async queryMeasurementsByRange(ctx, startKey, endKey) {
    const iterator = await ctx.stub.getStateByRange(startKey, endKey);
    const results = [];

    while (true) {
      const res = await iterator.next();
      if (res.value && res.value.value.toString()) {
        const measurement = JSON.parse(res.value.value.toString());
        if (measurement.docType === 'measurement') {
          results.push(measurement);
        }
      }
      if (res.done) {
        await iterator.close();
        return JSON.stringify(results);
      }
    }
  }
}

module.exports = WaterMeasurementContract;