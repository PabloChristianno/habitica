import { model as PushDevice } from '../../../../website/server/models/pushDevice';

describe('PushDevice Model', () => {
  context('cleanupCorruptData', () => {
    it('converts an array of push devices to a safe version', () => {
      const pushDevices = [
        null, // invalid, not an object
        { regId: '123' }, // invalid, no type
        { type: 'android' }, // invalid, no regId
        new PushDevice({ type: 'android', regId: '1234' }), // valid
      ];

      const safePushDevices = PushDevice.cleanupCorruptData(pushDevices);
      expect(safePushDevices.length).to.equal(1);
      expect(safePushDevices[0].type).to.equal('android');
      expect(safePushDevices[0].regId).to.equal('1234');

      const pushDevices1 = [
        { }, // empty object
        new PushDevice({ type: 'iphone', regId: '4321' }), // valid
      ];

      const safePushDevices1 = PushDevice.cleanupCorruptData(pushDevices1);
      expect(safePushDevices1.length).to.equal(1);
      expect(safePushDevices1[0].type).to.equal('iphone');
      expect(safePushDevices1[0].regId).to.equal('4321');

      // Just valid Objects
      const pushDevices2 = [
        new PushDevice({ type: 'android', regId: '3241' }), // valid
        new PushDevice({ type: 'android', regId: '1234' }), // valid
        new PushDevice({ type: 'iphone', regId: '4321' }), // valid
      ];

      const safePushDevices2 = PushDevice.cleanupCorruptData(pushDevices2);
      expect(safePushDevices2.length).to.equal(3);
      expect(safePushDevices2[0].type).to.equal('android');
      expect(safePushDevices2[0].regId).to.equal('3241');
      expect(safePushDevices2[1].type).to.equal('android');
      expect(safePushDevices2[1].regId).to.equal('1234');
      expect(safePushDevices2[2].type).to.equal('iphone');
      expect(safePushDevices2[2].regId).to.equal('4321');
    });

    it('removes duplicates', () => {
      const pushDevices = [
        new PushDevice({ type: 'android', regId: '1234' }),
        new PushDevice({ type: 'android', regId: '1234' }),
        new PushDevice({ type: 'iphone', regId: '1234' }), // not duplicate
        new PushDevice({ type: 'android', regId: '12345' }), // not duplicate
      ];

      const safePushDevices = PushDevice.cleanupCorruptData(pushDevices);
      expect(safePushDevices.length).to.equal(3);
      expect(safePushDevices[0].type).to.equal('android');
      expect(safePushDevices[0].regId).to.equal('1234');
      expect(safePushDevices[1].type).to.equal('iphone');
      expect(safePushDevices[1].regId).to.equal('1234');
      expect(safePushDevices[2].type).to.equal('android');
      expect(safePushDevices[2].regId).to.equal('12345');
    });
  });
});
