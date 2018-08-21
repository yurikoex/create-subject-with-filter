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
					const indexOfNext = subscriptionsNext.indexOf(truthyNext)
					const indexOfError = subscriptionsError.indexOf(truthyError)
					next && indexOfNext > -1 ? subscriptionsNext.splice(indexOfNext, 1) : void 0
					next && indexOfError > -1 ? subscriptionsError.splice(indexOfError, 1) : void 0
				}
			}
		}
	})

	const subscribe = (next, error) => {
		next ? subscriptionsNext.push(next) : void 0
		error ? subscriptionsError.push(error) : void 0
		return {
			unsubscribe: () => {
				const indexOfNext = subscriptionsNext.indexOf(next)
				const indexOfError = subscriptionsError.indexOf(error)
				next && indexOfNext > -1 ? subscriptionsNext.splice(indexOfNext, 1) : void 0
				next && indexOfError > -1 ? subscriptionsError.splice(indexOfError, 1) : void 0
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
