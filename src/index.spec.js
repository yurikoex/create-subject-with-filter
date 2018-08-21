const { createSubject } = require('./index')

describe('subject', () => {
	it('should sub', () => {
		const subject = createSubject()
		subject.subscribe((...args) => expect(args).toMatchSnapshot(), (...args) => expect(args).toMatchSnapshot())
		subject.next('test 1')
		subject.next('test 2')
		subject.next('test 3')
	})
	it('should unsub', () => {
		const subject = createSubject()
		const { unsubscribe } = subject.subscribe((...args) => expect(args).toMatchSnapshot(), (...args) => expect(args).toMatchSnapshot())
		subject.next('test 1')
		unsubscribe()
		subject.next('test 2')
		subject.next('test 3')
	})

	it('should ignore double unsub', () => {
		const subject = createSubject()
		const { unsubscribe } = subject.subscribe((...args) => expect(args).toMatchSnapshot(), (...args) => expect(args).toMatchSnapshot())
		subject.next('test 1')
		unsubscribe()
		unsubscribe()
		subject.next('test 2')
		subject.next('test 3')
	})

	it('should error', () => {
		const subject = createSubject()
		const { unsubscribe } = subject.subscribe((...args) => expect(args).toMatchSnapshot(), (...args) => expect(args).toMatchSnapshot())
		subject.next('test 1')
		subject.error(new Error('error 1'))
		subject.next('test 3')
	})
})
