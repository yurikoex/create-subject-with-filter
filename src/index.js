'use strict'
export const createSubject = () => {
	const subscriptionsNext = []
	const subscriptionsError = []

	const next = msg => subscriptionsNext.forEach(cb => cb(msg))
	const error = msg => subscriptionsError.forEach(cb => cb(msg))

	const filter = truthy => ({
		subscribe: (next, error) => {
			const truthyNext = msg => (truthy(msg) ? next(msg) : void 0)
			const truthyError = msg => (truthy(msg) ? error(msg) : void 0)
			next ? subscriptionsNext.push(truthyNext) : void 0
			error ? subscriptionsError.push(truthyError) : void 0
			return {
				unsubscribe: () => {
					next ? subscriptionsNext.splice(subscriptionsNext.indexOf(truthyNext), 1) : void 0
					error ? subscriptionsError.splice(subscriptionsError.indexOf(truthyError), 1) : void 0
				}
			}
		}
	})

	const subscribe = (next, error) => {
		next ? subscriptionsNext.push(next) : void 0
		error ? subscriptionsError.push(error) : void 0
		return {
			unsubscribe: () => {
				next ? subscriptionsNext.splice(subscriptionsNext.indexOf(next), 1) : void 0
				error ? subscriptionsError.splice(subscriptionsError.indexOf(error), 1) : void 0
			}
		}
	}

	return {
		next,
		error,
		subscribe,
		filter
	}
}
