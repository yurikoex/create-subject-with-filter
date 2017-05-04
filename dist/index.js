'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var createSubject = exports.createSubject = function createSubject() {
	var subscriptionsNext = [];
	var subscriptionsError = [];
	var subscribe = function subscribe(next, error) {
		next ? subscriptionsNext.push(next) : void 0;
		error ? subscriptionsError.push(error) : void 0;
		return {
			unsubscribe: function unsubscribe() {
				next ? subscriptionsNext.splice(subscriptionsNext.indexOf(next), 1) : void 0;
				error ? subscriptionsError.splice(subscriptionsError.indexOf(error), 1) : void 0;
			}
		};
	};

	var next = function next(msg) {
		return subscriptionsNext.forEach(function (cb) {
			return cb(msg);
		});
	};

	var filter = function filter(truthy) {
		return {
			subscribe: function subscribe(next, error) {
				var truthyNext = function truthyNext(msg) {
					return truthy(msg) ? next(msg) : void 0;
				};
				var truthyError = function truthyError(msg) {
					return truthy(msg) ? error(msg) : void 0;
				};
				next ? subscriptionsNext.push(truthyNext) : void 0;
				error ? subscriptionsError.push(truthyError) : void 0;
				return {
					unsubscribe: function unsubscribe() {
						next ? subscriptionsNext.splice(subscriptionsNext.indexOf(truthyNext), 1) : void 0;
						error ? subscriptionsError.splice(subscriptionsError.indexOf(truthyError), 1) : void 0;
					}
				};
			}
		};
	};

	return {
		next: next,
		subscribe: subscribe,
		filter: filter
	};
};