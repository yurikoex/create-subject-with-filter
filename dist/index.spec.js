'use strict';

var _require = require('./index'),
    createSubject = _require.createSubject;

describe('subject', function () {
	it('should sub', function () {
		var subject = createSubject();
		subject.subscribe(function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return expect(args).toMatchSnapshot();
		}, function () {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			return expect(args).toMatchSnapshot();
		});
		subject.next('test 1');
		subject.next('test 2');
		subject.next('test 3');
	});
	it('should unsub', function () {
		var subject = createSubject();

		var _subject$subscribe = subject.subscribe(function () {
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			return expect(args).toMatchSnapshot();
		}, function () {
			for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				args[_key4] = arguments[_key4];
			}

			return expect(args).toMatchSnapshot();
		}),
		    unsubscribe = _subject$subscribe.unsubscribe;

		subject.next('test 1');
		unsubscribe();
		subject.next('test 2');
		subject.next('test 3');
	});

	it('should ignore double unsub', function () {
		var subject = createSubject();

		var _subject$subscribe2 = subject.subscribe(function () {
			for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				args[_key5] = arguments[_key5];
			}

			return expect(args).toMatchSnapshot();
		}, function () {
			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}

			return expect(args).toMatchSnapshot();
		}),
		    unsubscribe = _subject$subscribe2.unsubscribe;

		subject.next('test 1');
		unsubscribe();
		unsubscribe();
		subject.next('test 2');
		subject.next('test 3');
	});

	it('should error', function () {
		var subject = createSubject();

		var _subject$subscribe3 = subject.subscribe(function () {
			for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
				args[_key7] = arguments[_key7];
			}

			return expect(args).toMatchSnapshot();
		}, function () {
			for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
				args[_key8] = arguments[_key8];
			}

			return expect(args).toMatchSnapshot();
		}),
		    unsubscribe = _subject$subscribe3.unsubscribe;

		subject.next('test 1');
		subject.error(new Error('error 1'));
		subject.next('test 3');
	});
});