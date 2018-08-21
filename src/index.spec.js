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

	it('should not remove a subscription no matter how many times another subscriber unsubscribes', done => {
		const subject = createSubject()
		let sub1Count = 0,
			sub2Count = 0
		const check1 = 'should go only to sub 1',
			check2 = 'should go only to sub 2'
		const { unsubscribe: unsub1 } = subject.subscribe(check => {
			expect(check).toBe(check1)
			sub1Count++
		})

		subject.next(check1)

		const { unsubscribe: unsub2 } = subject.subscribe(check => {
			expect(check).toBe(check2)
			sub2Count++
		})

		unsub1()
		unsub1()

		subject.next(check2)

		setImmediate(() => {
			expect(sub1Count).toBe(1)
			expect(sub2Count).toBe(1)
			done()
		})
	})
})
