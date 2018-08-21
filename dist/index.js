'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var createSubject = exports.createSubject = function createSubject() {
	var subscriptionsNext = [];
	var subscriptionsError = [];

	var next = function next(msg) {
		return subscriptionsNext.forEach(function (cb) {
			return cb(msg);
		});
	};
	var error = function error(msg) {
		return subscriptionsError.forEach(function (cb) {
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
						var indexOfNext = subscriptionsNext.indexOf(truthyNext);
						var indexOfError = subscriptionsError.indexOf(truthyError);
						next && indexOfNext > -1 ? subscriptionsNext.splice(indexOfNext, 1) : void 0;
						next && indexOfError > -1 ? subscriptionsError.splice(indexOfError, 1) : void 0;
					}
				};
			}
		};
	};

	var subscribe = function subscribe(next, error) {
		next ? subscriptionsNext.push(next) : void 0;
		error ? subscriptionsError.push(error) : void 0;
		return {
			unsubscribe: function unsubscribe() {
				var indexOfNext = subscriptionsNext.indexOf(next);
				var indexOfError = subscriptionsError.indexOf(error);
				next && indexOfNext > -1 ? subscriptionsNext.splice(indexOfNext, 1) : void 0;
				next && indexOfError > -1 ? subscriptionsError.splice(indexOfError, 1) : void 0;
			}
		};
	};

	return {
		next: next,
		error: error,
		subscribe: subscribe,
		filter: filter
	};
};