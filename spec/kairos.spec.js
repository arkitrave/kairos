/* global KairosTimeFrame: false, KairosContainer: false, KairosScheduler: false, describe: false, xdescribe: false, it: false, xit: false, expect: false, waitsFor: false, runs: false */
describe('Kairos', function () {
  // NOTE:
  //   Several of these tests are to ensure that things happen at the correct
  //   time. Unfortunately, setTimeout is intrinsically inaccurate, so a certain
  //   amount of imprecision is unavoidable.  We've taken steps to minimize
  //   the imprecision, but, YMMV.
  var TIMING_PRECISION = 15;

  describe('TimeFrame', function () {
    describe('Constructor', function () {
      it('should construct with no arguments', function () {
        var timeFrame;
        expect(function () {
          timeFrame = new KairosTimeFrame();
        }).not.toThrow();
        expect(timeFrame).toEqual(jasmine.any(KairosTimeFrame));
      });
      
      it('should construct with only a name argument', function () {
        var timeFrame;
        expect(function () {
          timeFrame = new KairosTimeFrame('test');
        }).not.toThrow();
        expect(timeFrame).toEqual(jasmine.any(KairosTimeFrame));
      });
      
      it('should construct with an options argument', function () {
        var timeFrame;
        expect(function () {
          timeFrame = new KairosTimeFrame({});
        }).not.toThrow();
        expect(timeFrame).toEqual(jasmine.any(KairosTimeFrame));
      });
      
      it('should construct with both a name and an options argument', function () {
        var timeFrame;
        expect(function () {
          timeFrame = new KairosTimeFrame('test', {});
        }).not.toThrow();
        expect(timeFrame).toEqual(jasmine.any(KairosTimeFrame));
      });

      it('should construct with a name in the options argument', function () {
        var timeFrame;
        expect(function () {
          timeFrame = new KairosTimeFrame({ name: 'test' });
        }).not.toThrow();
        expect(timeFrame).toEqual(jasmine.any(KairosTimeFrame));
      });
    });

    describe('API', function () {
      var timeFrame = new KairosTimeFrame();

      it('should have a start method', function () {
        expect(timeFrame.start).toEqual(jasmine.any(Function));
      });

      it('should have a stop method', function () {
        expect(timeFrame.stop).toEqual(jasmine.any(Function));
      });

      it('should have a mute method', function () {
        expect(timeFrame.mute).toEqual(jasmine.any(Function));
      });

      it('should have a unmute method', function () {
        expect(timeFrame.unmute).toEqual(jasmine.any(Function));
      });

      it('should have a subscribe method', function () {
        expect(timeFrame.subscribe).toEqual(jasmine.any(Function));
      });

      it('should have a publish method', function () {
        expect(timeFrame.publish).toEqual(jasmine.any(Function));
      });

      it('should have an unsubscribe method', function () {
        expect(timeFrame.unsubscribe).toEqual(jasmine.any(Function));
      });

      it('should have a toJSON method', function () {
        expect(timeFrame.toJSON).toEqual(jasmine.any(Function));
        expect(timeFrame.toJson).toEqual(jasmine.any(Function));
      });

      it('should have a toString method', function () {
        expect(timeFrame.toString).toEqual(jasmine.any(Function));
      });

      it('should have a logger', function () {
        expect(timeFrame.logger).toEqual(jasmine.any(Object));
        expect(timeFrame.logger.log).toEqual(jasmine.any(Function));
        expect(timeFrame.logger.info).toEqual(jasmine.any(Function));
        expect(timeFrame.logger.debug).toEqual(jasmine.any(Function));
        expect(timeFrame.logger.warn).toEqual(jasmine.any(Function));
        expect(timeFrame.logger.error).toEqual(jasmine.any(Function));
      });
    });

    describe('Chaining', function () {
      var timeFrame = new KairosTimeFrame();

      it('should make the start method chainable', function () {
        expect(timeFrame.start()).toBe(timeFrame);
      });

      it('should make the stop method chainable', function () {
        expect(timeFrame.stop()).toBe(timeFrame);
      });

      it('should make the mute method chainable', function () {
        expect(timeFrame.mute()).toBe(timeFrame);
      });

      it('should make the unmute method chainable', function () {
        expect(timeFrame.unmute()).toBe(timeFrame);
      });

      it('should make the subscribe method chainable', function () {
        expect(timeFrame.subscribe()).toBe(timeFrame);
      });

      it('should make the publish method chainable', function () {
        expect(timeFrame.publish()).toBe(timeFrame);
      });

      it('should make the unsubscribe method chainable', function () {
        expect(timeFrame.unsubscribe()).toBe(timeFrame);
      });
    });

    describe('Accessors', function () {
      var timeFrame = new KairosTimeFrame('test', {
        beginsAt: '1000',// simplest possible non-normal values
        endsAt: '2000',
        ticksEvery: '3000',
        relativeTo: '4000',
        syncTo: '5000',
        namedTimes: {
          foo: '6000'
        },
        data: {
          foo: 'bar'
        }
      });

      it('should expose a getter for the (normalized) beginsAt parameter', function () {
        expect(timeFrame.getBeginsAt).toEqual(jasmine.any(Function));
        expect(timeFrame.getBeginsAt()).toBe(1000);
      });

      it('should expose a getter for the original beginsAt parameter', function () {
        expect(timeFrame.getBeginsAt({ originalValue: true })).toBe('1000');
      });

      it('should expose a setter for the beginsAt parameter', function () {
        expect(timeFrame.setBeginsAt).toEqual(jasmine.any(Function));
      });

      it('should throw an error if you call the beginsAt setter with no value', function () {
        expect(timeFrame.setBeginsAt).toThrow();
      });

      it('should make the beginsAt setter chainable', function () {
        expect(timeFrame.setBeginsAt(1500)).toBe(timeFrame);
      });

      it('should expose a getter for the (normalized) endsAt parameter', function () {
        expect(timeFrame.getEndsAt).toEqual(jasmine.any(Function));
        expect(timeFrame.getEndsAt()).toBe(2000);
      });

      it('should expose a getter for the original endsAt parameter', function () {
        expect(timeFrame.getEndsAt({ originalValue: true })).toBe('2000');
      });

      it('should expose a setter for the endsAt parameter', function () {
        expect(timeFrame.setEndsAt).toEqual(jasmine.any(Function));
      });

      it('should throw an error if you call the endsAt setter with no value', function () {
        expect(timeFrame.setEndsAt).toThrow();
      });

      it('should make the endsAt setter chainable', function () {
        expect(timeFrame.setEndsAt(2500)).toBe(timeFrame);
      });

      it('should expose a getter for the (normalized) ticksEvery parameter', function () {
        expect(timeFrame.getTicksEvery).toEqual(jasmine.any(Function));
        expect(timeFrame.getTicksEvery()).toBe(3000);
      });

      it('should expose a getter for the original ticksEvery parameter', function () {
        expect(timeFrame.getTicksEvery({ originalValue: true })).toBe('3000');
      });

      it('should expose a setter for the ticksEvery parameter', function () {
        expect(timeFrame.setTicksEvery).toEqual(jasmine.any(Function));
      });

      it('should throw an error if you call the ticksEvery setter with no value', function () {
        expect(timeFrame.setTicksEvery).toThrow();
      });

      it('should make the ticksEvery setter chainable', function () {
        expect(timeFrame.setTicksEvery(3500)).toBe(timeFrame);
      });

      it('should expose a getter for the (normalized) relativeTo parameter', function () {
        expect(timeFrame.getRelativeTo).toEqual(jasmine.any(Function));
        expect(timeFrame.getRelativeTo()).toBe(4000);
      });

      it('should expose a getter for the original relativeTo parameter', function () {
        expect(timeFrame.getRelativeTo({ originalValue: true })).toBe('4000');
      });

      it('should expose a setter for the relativeTo parameter', function () {
        expect(timeFrame.setRelativeTo).toEqual(jasmine.any(Function));
      });

      it('should throw an error if you call the relativeTo setter with no value', function () {
        expect(timeFrame.setRelativeTo).toThrow();
      });

      it('should make the relativeTo setter chainable', function () {
        expect(timeFrame.setRelativeTo(4500)).toBe(timeFrame);
      });

      it('should expose a getter for the (normalized) syncTo parameter', function () {
        expect(timeFrame.getSyncTo).toEqual(jasmine.any(Function));
        expect(timeFrame.getSyncTo()).toBe(5000);
      });

      it('should expose a getter for the original syncTo parameter', function () {
        expect(timeFrame.getSyncTo({ originalValue: true })).toBe('5000');
      });

      it('should expose a setter for the syncTo parameter', function () {
        expect(timeFrame.setSyncTo).toEqual(jasmine.any(Function));
      });

      it('should throw an error if you call the syncTo setter with no value', function () {
        expect(timeFrame.setSyncTo).toThrow();
      });

      it('should make the syncTo setter chainable', function () {
        expect(timeFrame.setSyncTo(5500)).toBe(timeFrame);
      });

      it('should expose a getter for the (normalized) named times', function () {
        expect(timeFrame.getNamedTimes).toEqual(jasmine.any(Function));
        expect(timeFrame.getNamedTimes()).toEqual({ foo: 6000 });
      });

      it('should expose a getter for the original named times', function () {
        expect(timeFrame.getNamedTimes({ originalValue: true })).toEqual({ foo: '6000' });
      });

      it('should expose a setter for the named times', function () {
        expect(timeFrame.extendNamedTimes).toEqual(jasmine.any(Function));
      });

      it('should throw an error if you call the named times setter with no value', function () {
        expect(timeFrame.extendNamedTimes).toThrow();
      });

      it('should make the named times setter chainable', function () {
        expect(timeFrame.extendNamedTimes({})).toBe(timeFrame);
      });

      it('should expose a getter for the name parameter', function () {
        expect(timeFrame.getName).toEqual(jasmine.any(Function));
        expect(timeFrame.getName()).toBe('test');
      });

      it('should expose a getter for the data parameter', function () {
        expect(timeFrame.getData).toEqual(jasmine.any(Function));
        expect(timeFrame.getData()).toEqual({ foo: 'bar' });
      });

      it('should expose a setter for the data parameter', function () {
        expect(timeFrame.setData).toEqual(jasmine.any(Function));
      });

      it('should throw an error if you call the data setter with no value', function () {
        expect(timeFrame.setData).toThrow();
      });

      it('should make the data setter chainable', function () {
        expect(timeFrame.setData({})).toBe(timeFrame);
      });

      it('should expose a getter for isBegun', function () {
        expect(timeFrame.isBegun).toEqual(jasmine.any(Function));
        expect(timeFrame.isBegun()).toEqual(jasmine.any(Boolean));
      });

      it('should expose a getter for isEnded', function () {
        expect(timeFrame.isEnded).toEqual(jasmine.any(Function));
        expect(timeFrame.isEnded()).toEqual(jasmine.any(Boolean));
      });

      it('should expose a getter for isMuted', function () {
        expect(timeFrame.isMuted).toEqual(jasmine.any(Function));
        expect(timeFrame.isMuted()).toEqual(jasmine.any(Boolean));
      });

      it('should expose a getter for isStarted', function () {
        expect(timeFrame.isStarted).toEqual(jasmine.any(Function));
        expect(timeFrame.isStarted()).toEqual(jasmine.any(Boolean));
      });

      it('should expose a getter for isStopped', function () {
        expect(timeFrame.isStopped).toEqual(jasmine.any(Function));
        expect(timeFrame.isStopped()).toEqual(jasmine.any(Boolean));
      });

      it('should expose a getter for the duration relative to the relativeTo time', function () {
        expect(timeFrame.getRelativeDuration).toEqual(jasmine.any(Function));
        expect(timeFrame.getRelativeDuration()).toEqual(jasmine.any(Number));
      });

      it('should throw an error if you attempt to call a setter after start has been called', function () {
        timeFrame.start();

        expect(function () { timeFrame.setBeginsAt(2000); }).toThrow();
        expect(function () { timeFrame.setEndsAt(3000); }).toThrow();
        expect(function () { timeFrame.setTicksEvery(4000); }).toThrow();
        expect(function () { timeFrame.setRelativeTo(5000); }).toThrow();
        expect(function () { timeFrame.setSyncTo(6000); }).toThrow();
        expect(function () { timeFrame.extendNamedTimes({ foo: 7000 }); }).toThrow();
        expect(function () { timeFrame.setData({ foo: 'baz' }); }).toThrow();
      });

      it('should make all setters immutable once start has been called', function () {
        expect(timeFrame.getBeginsAt()).not.toBe(2000);
        expect(timeFrame.getEndsAt()).not.toBe(3000);
        expect(timeFrame.getTicksEvery()).not.toBe(4000);
        expect(timeFrame.getRelativeTo()).not.toBe(5000);
        expect(timeFrame.getSyncTo()).not.toBe(6000);
        expect(timeFrame.getNamedTimes()).not.toEqual({ foo: 7000 });
        expect(timeFrame.getData()).not.toEqual({ foo: 'baz' });
      });
    });

    describe('Defaults', function () {
      var
        now = (new Date()).getTime(),
        timeFrame = new KairosTimeFrame();

      it('should default named times to epoch(0) + now(new Date()) + never(Infinity)', function () {
        expect(timeFrame.getNamedTimes().epoch).toBe(0);
        expect(timeFrame.getNamedTimes().now - now).toBeLessThan(50); // inexact
        expect(timeFrame.getNamedTimes().never).toBe(Infinity);
      });

      it('should default beginsAt to epoch', function () {
        expect(timeFrame.getBeginsAt({ originalValue: true })).toBe('epoch');
        expect(timeFrame.getBeginsAt()).toBe(0);
      });

      it('should default endsAt to never', function () {
        expect(timeFrame.getEndsAt({ originalValue: true })).toBe('never');
        expect(timeFrame.getEndsAt()).toBe(Infinity);
      });

      it('should default relativeTo to beginsAt', function () {
        expect(timeFrame.getRelativeTo({ originalValue: true })).toBe('beginsAt');
        expect(timeFrame.getRelativeTo()).toBe(0);

        timeFrame.setBeginsAt(1000);

        expect(timeFrame.getRelativeTo()).toBe(1000);
      });
    });

    describe('Normalization', function () {
      it('should normalize beginsAt', function () {
        var timeFrame = new KairosTimeFrame({
          beginsAt: '1000'
        });
        
        expect(timeFrame.getBeginsAt()).toBe(1000);
        
        timeFrame.setBeginsAt('epoch');

        expect(timeFrame.getBeginsAt()).toBe(0);
        
        timeFrame.setBeginsAt('1970-01-02');

        expect(timeFrame.getBeginsAt()).toBe(24 * 60 * 60 * 1000); // might need to be offset by timezone
        
        timeFrame.setBeginsAt('1 hour after epoch');

        expect(timeFrame.getBeginsAt()).toBe(60 * 60 * 1000);
        
        // Skipping additional tests since horo will do so exhaustively
      });

      it('should normalize endsAt', function () {
        var timeFrame = new KairosTimeFrame({
          endsAt: '1000'
        });

        expect(timeFrame.getEndsAt()).toBe(1000);

        timeFrame.setEndsAt('epoch');

        expect(timeFrame.getEndsAt()).toBe(0);

        timeFrame.setEndsAt('1970-01-02');

        expect(timeFrame.getEndsAt()).toBe(24 * 60 * 60 * 1000); // might need to be offset by timezone

        timeFrame.setEndsAt('1 hour after epoch');

        expect(timeFrame.getEndsAt()).toBe(60 * 60 * 1000);

        // Skipping additional tests since horo will do so exhaustively
      });

      it('should normalize ticksEvery', function () {
        var timeFrame = new KairosTimeFrame({
          ticksEvery: '1000'
        });

        expect(timeFrame.getTicksEvery()).toBe(1000);

        timeFrame.setTicksEvery('1 hour');
        
        expect(timeFrame.getTicksEvery()).toBe(60 * 60 * 1000);

        // Skipping additional tests since horo will do so exhaustively
      });

      it('should normalize relativeTo', function () {
        var timeFrame = new KairosTimeFrame({
          relativeTo: '1000'
        });

        expect(timeFrame.getRelativeTo()).toBe(1000);

        timeFrame.setRelativeTo('epoch');

        expect(timeFrame.getRelativeTo()).toBe(0);

        timeFrame.setRelativeTo('1970-01-02');

        expect(timeFrame.getRelativeTo()).toBe(24 * 60 * 60 * 1000); // might need to be offset by timezone

        timeFrame.setRelativeTo('1 hour after epoch');

        expect(timeFrame.getRelativeTo()).toBe(60 * 60 * 1000);

        // Skipping additional tests since horo will do so exhaustively
      });

      it('should normalize syncTo', function () {
        var timeFrame = new KairosTimeFrame({
          syncTo: '1000'
        });

        expect(timeFrame.getSyncTo()).toBe(1000);

        timeFrame.setSyncTo('1 hour');

        expect(timeFrame.getSyncTo()).toBe(60 * 60 * 1000);

        // Skipping additional tests since horo will do so exhaustively
      });

      it('should normalize named times', function () {
        var timeFrame = new KairosTimeFrame({
          namedTimes: {
            'foo': '1000'
          }
        });

        expect(timeFrame.getNamedTimes().foo).toBe(1000);

        timeFrame.extendNamedTimes({ 'bar': '1970-01-02' });

        expect(timeFrame.getNamedTimes().bar).toBe(24 * 60 * 60 * 1000); // might need to be offset by timezone

        // Skipping additional tests since horo will do so exhaustively
      });

      it('should replace extant named times', function () {
        var timeFrame = new KairosTimeFrame({
          namedTimes: {
            'foo': '1000'
          }
        });

        timeFrame.extendNamedTimes({
          'foo': '2000'
        });

        expect(timeFrame.getNamedTimes().foo).toBe(2000);
      });

      it('should throw an error if you call a getter that can not be evaluated due to a missing named time', function () {
        var timeFrame = new KairosTimeFrame({
          beginsAt: 'foo',
          endsAt: 'bar',
          relativeTo: 'baz'
        });

        expect(timeFrame.getBeginsAt).toThrow();
        expect(timeFrame.getEndsAt).toThrow();
        expect(timeFrame.getRelativeTo).toThrow();
      });

      it('should throw an error if you call start and any named time references can be evaluated', function () {
        var timeFrame = new KairosTimeFrame({
          beginsAt: 'foo',
          endsAt: 'bar',
          relativeTo: 'baz'
        });

        expect(timeFrame.start).toThrow();
      });
    });

    describe('Notifications', function () {
      it('should publish when the frame starts', function () {
        var begun = false;

        new KairosTimeFrame({
          beginsAt: '50ms after now'
        }).subscribe('begun', function () { begun = true; })
          .start();

        waitsFor(function () {
          return begun;
        });

        runs(function () {
          expect(begun).toBe(true);
        });
      });

      it('should publish when the frame ends', function () {
        var ended = false;

        new KairosTimeFrame({
          endsAt: '50ms after now'
        }).subscribe('ended', function () { ended = true; })
          .start();

        waitsFor(function () {
          return ended;
        });

        runs(function () {
          expect(ended).toBe(true);
        });
      });

      it('should publish when the frame ticks', function () {
        var ticked = false;

        new KairosTimeFrame({
          ticksEvery: '50ms'
        }).subscribe('ticked', function () { ticked = true; })
          .start();

        waitsFor(function () {
          return ticked;
        });

        runs(function () {
          expect(ticked).toBe(true);
        });
      });

      it('should publish when the frame mutes', function () {
        var muted = false;

        new KairosTimeFrame()
          .subscribe('muted', function () { muted = true; })
          .start()
          .mute();

        runs(function () {
          expect(muted).toBe(true);
        });
      });

      it('should publish when the frame unmutes', function () {
        var unmuted = false;

        new KairosTimeFrame()
          .subscribe('unmuted', function () { unmuted = true; })
          .start()
          .mute()
          .unmute;

        runs(function () {
          expect(unmuted).toBe(true);
        });
      });

      it('should provide the KairosTimeFrame instance to subscribers', function () {
        var
          ended = false,
          framesReceived = [],
          timeFrame = new KairosTimeFrame({
            beginsAt: '50ms after now',
            endsAt: '150ms after beginsAt',
            ticksEvery: '100ms' // hopefully, this will tick exactly once
          }).subscribe('ended', function () { ended = true; })
            .subscribe('begun', function (frame) { framesReceived.push(frame); })
            .subscribe('ended', function (frame) { framesReceived.push(frame); })
            .subscribe('ticked', function (frame) { framesReceived.push(frame); })
            .subscribe('muted', function (frame) { framesReceived.push(frame); })
            .subscribe('unmuted', function (frame) { framesReceived.push(frame); })
            .start()
            .mute()
            .unmute;

        waitsFor(function () {
          return ended;
        });

        runs(function () {
          expect(framesReceived.length).toBe(5);
          expect(framesReceived[0]).toBe(timeFrame);
          expect(framesReceived[1]).toBe(timeFrame);
          expect(framesReceived[2]).toBe(timeFrame);
          expect(framesReceived[3]).toBe(timeFrame);
          expect(framesReceived[4]).toBe(timeFrame);
        });
      });
    });

    describe('Execution', function () {
      it('should start on time (BRITTLE)', function () {
        var
          begun = false,
          startTime;
        
        new KairosTimeFrame({
          beginsAt: '100ms after now',
          relativeTo: 'now'
        }).subscribe('begun', function (frame) {
          begun = true;
          startTime = frame.getRelativeDuration();
        }).start();

        waitsFor(function () {
          return begun;
        });
        
        runs(function () {
          expect(startTime).toBeLessThan(100 + TIMING_PRECISION);
        });
      });

      it('should end on time (BRITTLE)', function () {
        var
          ended = false,
          endTime;

        new KairosTimeFrame({
          endsAt: '100ms after now',
          relativeTo: 'now'
        }).subscribe('ended', function (frame) {
          ended = true;
          endTime = frame.getRelativeDuration();
        }).start();

        waitsFor(function () {
          return ended;
        });

        runs(function () {
          expect(endTime).toBeLessThan(100 + TIMING_PRECISION);
        });
      });

      it('should stop ticking when the frame ends', function () {
        var
          tickedBeforeEnd = false,
          tickedAfterEnd = false,
          sufficientTimeHasElapsed = false;

        function tickBeforeEnd () { tickedBeforeEnd = true; }

        new KairosTimeFrame({
          endsAt: '100ms after now',
          ticksEvery: 50
        }).subscribe('ticked', tickBeforeEnd)
          .subscribe('ended', function (frame) {
            frame.unsubscribe(['ticked', tickBeforeEnd]);
            frame.subscribe('ticked', function () {
              tickedAfterEnd = true;
            });
          })
          .start();

        waitsFor(function () {
          return sufficientTimeHasElapsed;
        });

        setTimeout(function () {
          sufficientTimeHasElapsed = true;
        }, 200);

        runs(function () {
          expect(tickedBeforeEnd).toBe(true);
          expect(tickedAfterEnd).toBe(false);
        });
      });

      it('should be able to sync ticks to an arbitrary interval (BRITTLE)', function () {
        var
          ticked = false,
          tickTime;

        new KairosTimeFrame({
          ticksEvery: 1000,
          syncTo: 500
        }).start()
          .subscribe('ticked', function () {
            tickTime = (new Date()).getTime();
            ticked = true;
          });

        waitsFor(function () {
          return ticked;
        });

        runs(function () {
          expect(tickTime % 500).toBeLessThan(TIMING_PRECISION);
        });
      });

      it('should, by default, sync to the millisecond portion of the start time, adjusted by the millisecond portion of the ticksEvery duration (EXTRA BRITTLE)', function () {
        var
          ticked = false,
          tickTime,
          now = (new Date()).getTime();

        new KairosTimeFrame({
          ticksEvery: 1000
        }).subscribe('ticked', function () {
            tickTime = (new Date()).getTime();
            ticked = true;
          })
          .start();

        waitsFor(function () {
          return ticked;
        });

        runs(function () {
          expect((tickTime - now + TIMING_PRECISION) % 1000).toBeLessThan(TIMING_PRECISION * 2);
        });
      });
    });

    describe('Control', function () {
      it('should not fire any events until start has been called', function () {
        var
          begun = false,
          ended = false,
          ticked = false,
          timeHasPassed = false,
          timeFrame = new KairosTimeFrame({
            beginsAt: '100ms after now',
            endsAt: '300ms after now',
            ticksEvery: '100ms'
          }).subscribe('begun', function () {
            begun = true;
          }).subscribe('ended', function () {
            ended = true;
          }).subscribe('ticked', function () {
            ticked = true;
          });

        setTimeout(function () {
          timeHasPassed = true;
        }, 200);

        waitsFor(function () {
          return timeHasPassed;
        });

        runs(function () {
          expect(begun).toBe(false);
          expect(ticked).toBe(false);
          timeFrame.start();
        });

        waitsFor(function () {
          return ended;
        });

        runs(function () {
          expect(ticked).toBe(true);
        });
      });

      it('should not fire any events if stop has been called', function () {
        var
          begun = false,
          ended = false,
          ticked = false,
          timeHasPassed = false;

        new KairosTimeFrame({
          beginsAt: '100ms after now',
          endsAt: '200ms after now',
          ticksEvery: 50
        }).subscribe('begun', function () {
          begun = true;
        }).subscribe('ended', function () {
          ended = true;
        }).subscribe('ticked', function () {
          ticked = true;
        }).start()
          .stop();

        setTimeout(function () {
          timeHasPassed = true;
        }, 300);

        waitsFor(function () {
          return timeHasPassed;
        });

        runs(function () {
          expect(begun).toBe(false);
          expect(ticked).toBe(false);
          expect(ended).toBe(false);
        });
      });

      it('should not start if we have already begun', function () {
        var
          starts = 0;

        new KairosTimeFrame({
          beginsAt: '100ms after now'
        }).subscribe('begun', function () {
          starts += 1;
        }).start()
          .start();

        waitsFor(function () {
          return 0 < starts;
        });

        runs(function () {
          expect(starts).toBe(1);
        });
      });

      it('should not fire any "ticked" events if muted', function () {
        var
          ticked = false,
          timeElapsed = false;

        new KairosTimeFrame({
          ticksEvery: '100ms'
        }).subscribe('ticked', function () {
            ticked = true;
          })
          .start()
          .mute();

        waitsFor(function () {
          return timeElapsed;
        });

        setTimeout(function () {
          timeElapsed = true;
        }, 200);

        runs(function () {
          expect(ticked).toBe(false);
        });
      });

      it('should still fire "begun" events when muted', function () {
        var
          begun = false,
          timeElapsed = false;

        new KairosTimeFrame({
          beginsAt: '100ms from now'
        }).subscribe('begun', function () {
            begun = true;
          })
          .start()
          .mute();

        waitsFor(function () {
          return timeElapsed;
        });

        setTimeout(function () {
          timeElapsed = true;
        }, 200);

        runs(function () {
          expect(begun).toBe(true);
        });
      });

      it('should still fire "ended" events when muted', function () {
        var
          ended = false,
          timeElapsed = false;

        new KairosTimeFrame({
          endsAt: '100ms from now'
        }).subscribe('ended', function () {
            ended = true;
          })
          .start()
          .mute();

        waitsFor(function () {
          return timeElapsed;
        });

        setTimeout(function () {
          timeElapsed = true;
        }, 200);

        runs(function () {
          expect(ended).toBe(true);
        });
      });

      it('should not fire missed "ticked" events when unmuted', function () {
        var
          ticksReceived = 0,
          timeElapsed = false,

          timeFrame = new KairosTimeFrame({
            ticksEvery: '100ms'
          }).subscribe('ticked', function () {
              ticksReceived += 1;
            })
            .start()
            .mute();

        waitsFor(function () {
          return timeElapsed;
        });

        setTimeout(function () {
          timeElapsed = true;
        }, 200);

        runs(function () {
          timeFrame.unmute();
          expect(ticksReceived).toBe(0); // instead of 1 or 2
        });
      });

      it('should start firing new "ticked" events when unmuted', function () {
        var
          ticked = false,
          timeFrame = new KairosTimeFrame({
            ticksEvery: '100ms'
          }).subscribe('ticked', function () {
              ticked = true;
            })
            .start()
            .mute()
            .unmute();

        waitsFor(function () {
          return ticked;
        });

        runs(function () {
          expect(ticked).toBe(true);
        });
      });

      it('should not unmute if not muted', function () {
        var
          unmuted = false;

        new KairosTimeFrame()
          .subscribe('unmuted', function () {
            unmuted = true;
          })
          .unmute();

        expect(unmuted).toBe(false);
      });

      it('should not mute if already muted', function () {
        var
          muted = false;

        new KairosTimeFrame()
          .mute()
          .subscribe('muted', function () {
            muted = true;
          })
          .mute();

        expect(muted).toBe(false);
      });
    });
  });
  
  describe('Container', function () {
    describe('Constructor', function () {
      it('should construct with no arguments', function () {
        var container;
        expect(function () {
          container = new KairosContainer();
        }).not.toThrow();
        expect(container).toEqual(jasmine.any(KairosContainer));
      });

      it('should construct with an empty array', function () {
        var container;
        expect(function () {
          container = new KairosContainer([]);
        }).not.toThrow();
        expect(container).toEqual(jasmine.any(KairosContainer));
      });

      it('should construct with a array of KairosTimeFrames', function () {
        var container;
        expect(function () {
          container = new KairosContainer([
            new KairosTimeFrame(),
            new KairosTimeFrame()
          ]);
        }).not.toThrow();
        expect(container).toEqual(jasmine.any(KairosContainer));
      });

      it('should construct with an array of (KairosTimeFrame options) hashes', function () {
        var container;
        expect(function () {
          container = new KairosContainer([
            {},
            {}
          ]);
        }).not.toThrow();
        expect(container).toEqual(jasmine.any(KairosContainer));
      });

      it('should construct with a mixed array of KairosTimeFrames and hashes', function () {
        var container;
        expect(function () {
          container = new KairosContainer([
            new KairosTimeFrame(),
            {}
          ]);
        }).not.toThrow();
        expect(container).toEqual(jasmine.any(KairosContainer));
      });

      it('should enforce uniqueness of KairosTimeFrames names (if name is present)', function () {
        expect(function () {
          new KairosContainer([
            new KairosTimeFrame('foo'),
            {
              name: 'foo'
            }
          ]);
        }).toThrow();

        var container = new KairosContainer([
          new KairosTimeFrame('foo')
        ]);

        expect(function () {
          container.addFrame(new KairosTimeFrame('foo'));
        }).toThrow();
      });
    });

    describe('API', function () {
      var container = new KairosContainer();
      
      it('should have a start method', function () {
        expect(container.start).toEqual(jasmine.any(Function));
      });

      it('should have a stop method', function () {
        expect(container.stop).toEqual(jasmine.any(Function));
      });

      it('should have a mute method', function () {
        expect(container.mute).toEqual(jasmine.any(Function));
      });

      it('should have a unmute method', function () {
        expect(container.unmute).toEqual(jasmine.any(Function));
      });

      it('should have a subscribe method', function () {
        expect(container.subscribe).toEqual(jasmine.any(Function));
      });

      it('should have a publish method', function () {
        expect(container.publish).toEqual(jasmine.any(Function));
      });

      it('should have an unsubscribe method', function () {
        expect(container.unsubscribe).toEqual(jasmine.any(Function));
      });

      it('should have a toJSON method', function () {
        expect(container.toJSON).toEqual(jasmine.any(Function));
        expect(container.toJson).toEqual(jasmine.any(Function));
      });

      it('should have a toString method', function () {
        expect(container.toString).toEqual(jasmine.any(Function));
      });

      it('should have a logger', function () {
        expect(container.logger).toEqual(jasmine.any(Object));
        expect(container.logger.log).toEqual(jasmine.any(Function));
        expect(container.logger.info).toEqual(jasmine.any(Function));
        expect(container.logger.debug).toEqual(jasmine.any(Function));
        expect(container.logger.warn).toEqual(jasmine.any(Function));
        expect(container.logger.error).toEqual(jasmine.any(Function));
      });

      it('should have an pushTimeFrame method', function () {
        expect(container.pushTimeFrame).toEqual(jasmine.any(Function));
      });
    });

    describe('Chaining', function () {
      var container = new KairosContainer();

      it('should make the start method chainable', function () {
        expect(container.start()).toBe(container);
      });

      it('should make the stop method chainable', function () {
        expect(container.stop()).toBe(container);
      });

      it('should make the mute method chainable', function () {
        expect(container.mute()).toBe(container);
      });

      it('should make the unmute method chainable', function () {
        expect(container.unmute()).toBe(container);
      });

      it('should make the subscribe method chainable', function () {
        expect(container.subscribe()).toBe(container);
      });

      it('should make the publish method chainable', function () {
        expect(container.publish()).toBe(container);
      });

      it('should make the unsubscribe method chainable', function () {
        expect(container.unsubscribe()).toBe(container);
      });

      it('should make the pushTimeFrame method chainable', function () {
        expect(container.pushTimeFrame({})).toBe(container);
      });
    });

    describe('Accessors', function () {
      var
        timeFrame = new KairosTimeFrame('test', {
          namedTimes: {
            'foo': '1000'
          }
        }),
        arr = [timeFrame],
        container = new KairosContainer(arr);

      it('should expose a getter for the original named times', function () {
        expect(container.getNamedTimes).toEqual(jasmine.any(Function));
        expect(container.getNamedTimes()).toBe({ 'foo': 1000 });
      });

      it('should expose a getter for the normalized named times', function () {
        expect(container.getNamedTimes({ originalValue: true })).toBe({ 'foo': '1000' });
      });

      it('should get the unique aggregate of all named times in all KairosTimeFrames', function () {
        var container2 = new KairosContainer([
          new KairosTimeFrame({
            namedTimes: {
              'foo': '1000'
            }
          }),
          new KairosTimeFrame({
            namedTimes: {
              'foo': '1000',
              'bar': '2000'
            }
          }),
          new KairosTimeFrame({
            namedTimes: {
              'baz': '3000'
            }
          })
        ]);

        expect(container2.getNamedTimes()).toEqual({
          foo: 1000,
          bar: 2000,
          baz: 3000
        });
      });

      // TODO: What if we have 2 named times w/ DIFFERENT values?

      it('should expose a setter for the named times', function () {
        expect(container.extendNamedTimes).toEqual(jasmine.any(Function));
      });

      it('should throw an error if you call the named times setter with no value', function () {
        expect(container.extendNamedTimes).toThrow();
      });

      it('should make the named times setter chainable', function () {
        expect(container.extendNamedTimes({})).toBe(container);
      });

      it('should expose a getter for all frames', function () {
        expect(container.getTimeFrames).toEqual(jasmine.any(Function));
        expect(container.getTimeFrames()).toEqual([timeFrame]);
        expect(container.getTimeFrames()).not.toBe(arr);
      });

      it('should expose a getter for a named frame', function () {
        expect(container.getNamedTimeFrame).toEqual(jasmine.any(Function));
        expect(container.getNamedTimeFrame('test')).toEqual(timeFrame);
      });
    });

    describe('Notifications', function () {
      it('should publish when any KairosTimeFrames begins', function () {
        var began = false;

        new KairosContainer([
          new KairosTimeFrame({
            beginsAt: '100ms after now'
          })
        ]).subscribe('timeFrameBegan', function () {
          began = true;
        })
          .start();

        waitsFor(function () {
          return began;
        });

        runs(function () {
          expect(began).toBe(true);
        });
      });

      it('should publish when any KairosTimeFrames ends', function () {
        var ended = false;

        new KairosContainer([
          new KairosTimeFrame({
            endsAt: '100ms after now'
          })
        ]).subscribe('timeFrameEnded', function () {
            ended = true;
          })
          .start();

        waitsFor(function () {
          return ended;
        });

        runs(function () {
          expect(ended).toBe(true);
        });
      });

      it('should publish when any KairosTimeFrames ticks', function () {
        var ticked = false;

        new KairosContainer([
          new KairosTimeFrame({
            ticksEvery: '100ms'
          })
        ]).subscribe('timeFrameTicked', function () {
            ticked = true;
          })
          .start();

        waitsFor(function () {
          return ticked;
        });

        runs(function () {
          expect(ticked).toBe(true);
        });
      });

      it('should publish when any KairosTimeFrames mutes', function () {
        var muted = false;

        new KairosContainer([
          new KairosTimeFrame()
        ]).subscribe('timeFrameMuted', function () {
            muted = true;
          })
          .start()
          .mute();

        runs(function () {
          expect(muted).toBe(true);
        });
      });

      it('should publish when any KairosTimeFrames unmutes', function () {
        var unmuted = false;

        new KairosContainer([
          new KairosTimeFrame()
        ]).subscribe('timeFrameUnmuted', function () {
            unmuted = true;
          })
          .start()
          .mute()
          .unmute();

        runs(function () {
          expect(unmuted).toBe(true);
        });
      });

      it('should republish KairosTimeFrames specific publishes', function () {
        var
          began = false,
          ended = false,
          ticked = false,
          muted = false,
          unmuted = false;

        new KairosContainer([
          new KairosTimeFrame('test', {
            beginsAt: '100ms after now',
            endsAt: '200ms after now',
            ticksEvery: '50ms'
          })
        ]).subscribe('test/began', function () {
            began = true;
          })
          .subscribe('test/ended', function () {
            ended = true;
          })
          .subscribe('test/ticked', function () {
            ticked = true;
          })
          .subscribe('test/muted', function () {
            muted = true;
          })
          .subscribe('test/unmuted', function () {
            unmuted = true;
          })
          .start()
          .mute()
          .unmute();

        waitsFor(function () {
          return ended;
        });

        runs(function () {
          expect(began).toBe(true);
          expect(ended).toBe(true);
          expect(ticked).toBe(true);
          expect(muted).toBe(true);
          expect(unmuted).toBe(true);
        });
      });
    });

    describe('Control', function () {
      it('should invoke start on all KairosTimeFrames on start', function () {
        var
          started = false,
          timeFrame = new KairosTimeFrame();

        timeFrame.start = function () {
          started = true;
        };

        new KairosContainer([timeFrame]).start();

        expect(started).toBe(true);
      });

      it('should invoke stop on all KairosTimeFrames on stop', function () {
        var
          stopped = false,
          timeFrame = new KairosTimeFrame();

        timeFrame.stop = function () {
          stopped = true;
        };

        new KairosContainer([timeFrame]).start().stop();

        expect(stopped).toBe(true);
      });

      it('should invoke mute on all KairosTimeFrames on mute', function () {
        var
          muted = false,
          timeFrame = new KairosTimeFrame();

        timeFrame.mute = function () {
          muted = true;
        };

        new KairosContainer([timeFrame]).start().mute();

        expect(muted).toBe(true);
      });

      it('should invoke unmute on all KairosTimeFrames on unmute', function () {
        var
          unmuted = false,
          timeFrame = new KairosTimeFrame();

        timeFrame.unmute = function () {
          unmuted = true;
        };

        new KairosContainer([timeFrame]).start().mute().unmute();

        expect(unmuted).toBe(true);
      });
    });
  });
});